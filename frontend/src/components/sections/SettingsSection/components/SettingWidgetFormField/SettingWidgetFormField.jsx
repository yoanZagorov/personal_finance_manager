import { useRef } from "react";

import { capitalizeEveryWord } from "@/utils/str";

import { SvgIcon } from "@/components/SvgIcon";
import { Widget } from "@/components/widgets/Widget";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { useSelectInput } from "@/hooks";
import cn from "classnames";

export default function SettingWidgetFormField({ type = "select", name, iconName, displayValue, controlProps = {}, customType = {} }) {
  const isInput = type === "input";
  const inputRef = isInput ? useRef(null) : null;
  isInput && useSelectInput(inputRef);

  return (
    <Widget className="flex items-center gap-3 text-gray-dark">
      <SvgIcon iconName={iconName} className="size-6 min-w-6 max-w-6 fill-current" />
      <span className="text-xs font-bold">{capitalizeEveryWord(name)}</span>

      {isInput ? (
        <Input
          inputRef={inputRef}
          size="l"
          variant="outline"
          required
          value={displayValue}
          {...controlProps}
          className="ml-auto max-w-44 ml:max-w-48 tab:max-w-56 text-right font-semibold"
        />
      ) : type === "custom" ? (
        <customType.Component {...customType.props} />
      ) : (
        <Select
          btnProps={{
            ...controlProps,
            className: "ml-auto border-0 bg-gray-light",
          }}
          value={displayValue}
        />
      )
      }
    </Widget>
  )
}