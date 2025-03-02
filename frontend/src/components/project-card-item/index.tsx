import LinesEllipsis from "react-lines-ellipsis";

import { GetAllProjectsResponse } from "../../api/interfaces/projects";
import { QuantityBadge } from "../quantity-badge";
import { AttachedItemsText, Container, Id, Name } from "./styles";

export const ProjectCardItem = ({
  id,
  name,
  description,
  serviceOrdersIds,
}: GetAllProjectsResponse) => {
  return (
    <Container>
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
