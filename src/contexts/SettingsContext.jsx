import { createContext, useState } from "react"
import { useRouteLoaderData } from "react-router";

export const SettingsContext = createContext(null);

export default function SettingsProvider({ children }) {
  const { userData: { user: { profilePic, fullName, email, currency }, categories } } = useRouteLoaderData("app");

  const defaultSettingsData = {
    profilePic,
    fullName,
    email,
    currency,
    categories,
  }

  const [settingsData, setSettingsData] = useState(defaultSettingsData);

  function updateSettingsData(newSettingsData) {
    return setSettingsData(prevSettingsData => ({
      ...prevSettingsData,
      ...newSettingsData
    }))
  }

  function resetSettingsData() {
    setSettingsData(defaultSettingsData);
  }

  return (
    <SettingsContext.Provider value={{ settingsData, defaultSettingsData, updateSettingsData, resetSettingsData }}>
      {children}
    </SettingsContext.Provider>
  )
}