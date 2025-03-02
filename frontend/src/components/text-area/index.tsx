import { Label, TextAreaStyled } from "./styles";
import { TextAreaProps } from "./types";

export const TextArea = ({
  label,
  error,
  isTextArea,
  onTextChange,
  onChangeCapture,
  ...rest
}: TextAreaProps) => {
  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

      <TextAreaStyled error={error} {...rest} onChangeCapture={handleTyping} />

      {error && (
        <span className="text-red-500 text-sm font-medium">{error}</span>
      )}
    </div>
  );
};
