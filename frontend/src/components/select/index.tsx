import { MouseEvent, useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { TiArrowSortedDown } from "react-icons/ti";

import {
  Container,
  Dropdown,
  Label,
  Option,
  Placeholder,
  SelectField,
} from "./styles";
import { OptionProps, SelectProps } from "./types";

export const Select = ({
  label,
  error,
  options,
  name,
  defaultOption,
  onChange,
  ...rest
}: SelectProps) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | number>(
    getOptionLabel(
      options.find((option) => getOptionValue(option) === defaultOption) ??
        defaultOption ??
        ""
    )
  );

  const selectRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setIsOpenDropdown((isOpenDropdown) => !isOpenDropdown);
  };

  const handleOnSelect = (
    event: MouseEvent<HTMLOptionElement>,
    option: string | OptionProps
  ) => {
    event.stopPropagation();
    setSelectedOption(getOptionLabel(option));
    setIsOpenDropdown(false);
    if (onChange) {
      onChange(getOptionValue(option));
    }
  };

  const handleUnselect = (event: MouseEvent) => {
    event.stopPropagation();
    setSelectedOption("");
    if (onChange) {
      onChange("");
    }
  };

  const handleClickOutside = (event: DocumentEventMap["mousedown"]) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpenDropdown(false);
    }
  };

  function getOptionLabel(option: string | OptionProps | number) {
    if (typeof option === "string" || typeof option === "number") {
      return option;
    }
    return option?.label;
  }

  function getOptionValue(option: string | OptionProps | number) {
    if (typeof option === "string" || typeof option === "number") {
      return option;
    }

    return option?.value;
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Container ref={selectRef} className="flex w-full flex-col gap-2">
      {label && <Label>{label}</Label>}
      <input type="hidden" name={name} {...rest} value={selectedOption} />
      <SelectField
        focused={isOpenDropdown}
        error={error!}
        {...rest}
        onClick={handleToggleDropdown}
      >
        {selectedOption || <Placeholder>Select an option...</Placeholder>}

        <div className="flex items-center gap-2">
          {selectedOption && <IoClose onClick={handleUnselect} />}
          <TiArrowSortedDown />
        </div>
        {isOpenDropdown && (
          <Dropdown>
            {options.map((option) => (
              <Option
                key={getOptionValue(option)}
                onClick={(event) => handleOnSelect(event, option)}
              >
                {getOptionLabel(option)}
              </Option>
            ))}
          </Dropdown>
        )}
      </SelectField>
      {error && (
        <span className="text-red-500 text-sm font-medium">{error}</span>
      )}
    </Container>
  );
};
