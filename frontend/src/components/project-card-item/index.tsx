import LinesEllipsis from "react-lines-ellipsis";

import { QuantityBadge } from "../quantity-badge";
import { AttachedItemsText, Container, Id, Name } from "./styles";
import { ProjectCartItemProps } from "./types";

export const ProjectCardItem = ({
  id,
  name,
  description,
  serviceOrdersIds,
  onClick,
}: ProjectCartItemProps) => {
  return (
    <Container onClick={onClick}>
      <div className="flex justify-between flex-1">
        <Id>#{id}</Id>
        <AttachedItemsText>
          Attached service orders{" "}
          <QuantityBadge quantity={serviceOrdersIds.length} />
        </AttachedItemsText>
      </div>
      <Name>{name}</Name>

      <p className="font-semibold text-end text-sm">
        <LinesEllipsis text={description ?? ""} maxLine={2} />
      </p>
    </Container>
  );
};
