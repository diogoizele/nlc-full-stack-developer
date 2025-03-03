import { Container } from "./styles";

import { useState } from "react";
import check from "../../assets/images/check.svg";
import { CheckboxProps } from "./types";

export const Checkbox = ({ defaultValue, onClick }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(defaultValue);

  const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsChecked((isChecked) => {
      onClick(!isChecked);
      return !isChecked;
    });
  };

  return (
    <Container checked={isChecked} onClick={handleToggle}>
      <img src={check} />
    </Container>
  );
};
