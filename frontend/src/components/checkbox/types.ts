export interface CheckboxProps {
  defaultValue: boolean;
  label?: string;
  align?: "left" | "right" | "center";
  onClick: (value: boolean) => void;
}
