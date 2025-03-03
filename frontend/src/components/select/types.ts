export interface SelectProps {
  value: string | number;
  name: string;
  error?: string;
  label?: string;
  options: OptionProps[] | string[];
  defaultOption?: string | number | OptionProps;
  onClick?: () => void;
  onChange?: (value: OptionProps | string | number) => void;
}

export interface OptionProps {
  value: string | number;
  label: string;
}
