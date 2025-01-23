import { SettingsSection } from "@/components/sections/SettingsSection";
import { useLayout, useSettings } from "@/hooks";
import { CustomProfilePicType } from "../../components/CustomProfilePicType";
import { CurrencyModal } from "@/components/modals/CurrencyModal";
import { useFetcher } from "react-router";

export default function OverallSettingsSection({ fetcher }) {
  const { isSingleColLayout } = useLayout();

  const {
    settingsData: {
      profilePic,
      fullName,
      email,
      currency,
    },
    updateSettingsData
  } = useSettings();

  const settingsDataConfig = [
    {
      formData: {
        name: "profilePic",
        value: profilePic
          ? JSON.stringify(profilePic)
          : ""
      },
      field: {
        name: "profile picture",
        props: {
          iconName: "user-circle",
          type: "custom",
          customType: {
            Component: CustomProfilePicType,
            props: {
              profilePic,
              handleChange: (e) => {
                const file = e.target.files[0];
                if (file) {
                  const { name, size, type } = file;
                  const metaData = {
                    name,
                    size,
                    type
                  }

                  updateSettingsData({ profilePic: { metaData, url: URL.createObjectURL(file) } })
                }
              },
            }
          }
        },
      }
    },
    {
      formData: {
        name: "fullName",
        value: fullName
      },
      field: {
        name: "full name",
        props: {
          iconName: "heading",
          type: "input",
          displayValue: fullName,
          inputProps: {
            value: fullName,
            onChange: (e) => updateSettingsData({ fullName: e.target.value }),
            min: 2,
            max: 50
          }
        },
      }
    },
    {
      formData: {
        name: "email",
        value: email
      },
      field: {
        name: "email",
        props: {
          iconName: "at-sign",
          type: "input",
          displayValue: email,
          inputProps: {
            size: "m",
            value: email,
            onChange: (e) => updateSettingsData({ email: e.target.value }),
            min: 2,
            max: 50
          }
        },
      }
    },
    {
      formData: {
        name: "currency",
        value: currency
      },
      field: {
        name: "main currency",
        props: {
          iconName: "coins-stacked",
          type: "select",
          displayValue: currency,
        },
        modal: {
          type: {
            layout: "fullscreen",
          },
          innerModal: {
            Component: CurrencyModal,
          },
          state: {
            value: currency,
            updateState: (newCurrency) => updateSettingsData({ currency: newCurrency })
          }
        }
      }
    },
  ]
  return (
    <SettingsSection
      formProps={{
        fetcher,
        action: "/app/settings",
        btn: {
          props: {
            value: "updateSettings"
          }
        }
      }}
      isSpaceLimited={isSingleColLayout}
      settings={settingsDataConfig}
      sectionProps={{
        title: "Overall",
        className: "relative"
      }}
    />
  )
}