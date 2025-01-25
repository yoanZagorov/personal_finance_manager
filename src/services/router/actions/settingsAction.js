import { getAuthUserId } from "@/services/firebase/db/user";
import { handleSettingsUpdate } from "../utils/settings";
import { handleCategorySubmission } from "../utils/category";

export default async function settingsAction({ request }) {
  const userId = await getAuthUserId();

  const formData = Object.fromEntries(await request.formData());
  const { intent } = formData;

  if (intent === "updateSettings") {
    return (await handleSettingsUpdate(userId, formData));
  }

  if (intent === "addCategory") {
    return (await handleCategorySubmission(userId, formData));
  }
}