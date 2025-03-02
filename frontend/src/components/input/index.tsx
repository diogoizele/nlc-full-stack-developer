import { Label, TextField } from "./styles";
import { InputProps } from "./types";

export const Input = ({
  label,
  error,

  onTextChange,
  onChangeCapture,
  ...rest
}: InputProps) => {
  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onTextChange) {
      onTextChange(e.target.value);
    }
    if (onChangeCapture) {
      onChangeCapture(e);
    }
  };

  return (
    <div className="flex w-full flex-col gap-2">
      {label && <Label>{label}</Label>}
      <TextField error={error} {...rest} onChangeCapture={handleTyping} />
      {error && (
        <span className="text-red-500 text-sm font-medium">{error}</span>
      )}
    </div>
  );
};
