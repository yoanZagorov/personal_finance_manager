import { where } from "firebase/firestore";
import { redirect } from "react-router";

import { getTransactions } from "@/services/firebase/db/transaction";
import { getWallet } from "@/services/firebase/db/wallet";
import { getAuthUserId, getUser } from "@/services/firebase/db/user";

import { getStoredData, storeRedirectData } from "@/utils/storage";
import { getCashFlowByCategoryChartData } from "@/utils/category";
import { getExpensesVsIncomeChartData } from "@/utils/wallet";

import { getPeriodInfo } from "../utils";
import { createErrorResponse, createSuccessResponse } from "../responses";
import { getWalletBalanceChartData } from "../utils/wallet";

export default async function walletLoader({ params, request }) {
  const userId = await getAuthUserId();

  if (!userId) {
    const redirectData = getStoredData("redirectData");

    if (redirectData) {
      storeRedirectData(...redirectData);
    } else {
      const pathname = new URL(request.url).pathname;
      storeRedirectData("You must log in first", "alert", pathname);
    }

    return redirect("/login");
  }

  const period = "lastThirtyDays"; // To do: get this from the params

  try {
    const walletId = params.walletId;
    const wallet = await getWallet(userId, walletId);

    const walletTransactions = await getTransactions({ userId, wallets: [wallet] })
    walletTransactions.sort((a, b) => b.date - a.date);

    const { start, end } = getPeriodInfo(period);
    const transactionsQuery = [
      where("date", ">=", start),
      where("date", "<=", end)
    ];
    const periodTransactions = await getTransactions({ userId, wallets: [wallet], query: transactionsQuery }); // used for both functions below

    const { openingBalance, balanceChartData } = await getWalletBalanceChartData({ userId, wallet, period, periodTransactions });

    const expensesByCategoryChartData = await getCashFlowByCategoryChartData({ prefetchedData: { periodTransactions } });
    const expensesVsIncomeChartData = await getExpensesVsIncomeChartData({ transactions: periodTransactions });

    return createSuccessResponse({
      wallet,
      transactions: walletTransactions,
      openingBalance,
      chartData: {
        balance: balanceChartData,
        expensesByCategory: expensesByCategoryChartData,
        expensesVsIncome: expensesVsIncomeChartData
      }
    });
  } catch (error) {
    console.error(error);

    return createErrorResponse(500, "Sorry, we couldn't load your wallet data. Please try again");
  }
}