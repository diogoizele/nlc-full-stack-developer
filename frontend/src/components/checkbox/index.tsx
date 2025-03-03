import { Container } from "./styles";

import { useState } from "react";
import check from "../../assets/images/check.svg";

import { CheckboxProps } from "./types";

export const Checkbox = ({
  defaultValue,
  label,
  align,
  onClick,
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(defaultValue);

  const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsChecked((isChecked) => {
      onClick(!isChecked);
      return !isChecked;
    });
  };

  const tailwindClassAlign = (align?: string) => {
    switch (align) {
      case "left":
        return "items-start";
      case "right":
        return "items-end";
      case "center":
        return "items-center";
      default:
        return "items-start";
    }
  };

  return (
    <div className={`flex flex-col ${tailwindClassAlign(align)}`}>
      {label && (
        <label className="text-text font-semibold mb-2 flex">{label}</label>
      )}
      <Container checked={isChecked} onClick={handleToggle}>
        <img src={check} />
      </Container>
    </div>
  );
};
