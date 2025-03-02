import { Container } from "./styles";
import { QuantityBadgeProps } from "./types";

export const QuantityBadge = ({ quantity }: QuantityBadgeProps) => {
  return <Container>{quantity}</Container>;
};
