import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useTheme } from "styled-components";

import {
  GetAllServiceOrdersResponse,
  UpdateServiceOrderStatus,
} from "../../api/interfaces/service-orders";
import { updateServiceOrderStatus } from "../../api/service-orders";
import nlcLogo from "../../assets/images/nlc-logo.png";
import { useAppStore } from "../../stores/app.store";
import { alpha } from "../../utils/alpha";
import { formatDate } from "../../utils/format-date";
import { Checkbox } from "../checkbox";
import { Table } from "../table";
import { InfoBadge } from "./styles";
import { TableServiceOrdersProps } from "./types";

export const TableServiceOrders = ({
  data,
  showProjectInfo,
}: TableServiceOrdersProps) => {
  const setIsLoading = useAppStore((state) => state.setIsLoading);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { colors } = useTheme();

  const mutationUpdateServiceOrderStatus = useMutation({
    mutationFn: ({ id, status }: UpdateServiceOrderStatus) =>
      updateServiceOrderStatus({ id, status }),
    onSuccess: ({ id }) => {
      queryClient.refetchQueries({ queryKey: ["project-details"] });
      queryClient.refetchQueries({ queryKey: ["service-orders"] });
      setIsLoading(false);
      toast.success(`Service Order with id #${id} updated successfully`);
    },
    onError: () => {
      setIsLoading(false);
      toast.error(
        "An error occurred to update service order. Please try again later"
      );
    },
  });

  return (
    <Table width={showProjectInfo ? "1800px" : "1550px"}>
      <Table.TableHead>
        <Table.TableRow>
          <Table.TableCell width="20px"></Table.TableCell>
          <Table.TableCell width="20px">ID</Table.TableCell>
          <Table.TableCell width="275px">Name</Table.TableCell>
          <Table.TableCell width="124px">Category</Table.TableCell>
          <Table.TableCell width="534px">Description</Table.TableCell>
          {showProjectInfo && (
            <Table.TableCell width="64px">Project</Table.TableCell>
          )}
          <Table.TableCell width="110px">Created</Table.TableCell>
          <Table.TableCell width="110px">Updated</Table.TableCell>
          <Table.TableCell width="140px" align="center">
            Approved Status
          </Table.TableCell>
          {showProjectInfo && (
            <Table.TableCell width="110px" align="center">
              Actions
            </Table.TableCell>
          )}
        </Table.TableRow>
      </Table.TableHead>
      <Table.TableBody>
        {data?.map((serviceOrder, index) => (
          <Table.TableRow
            key={serviceOrder.id}
            hover={!showProjectInfo}
            onClick={() =>
              navigate("/service-orders", {
                state: { serviceOrderName: serviceOrder.name },
              })
            }
          >
            <Table.TableCell width="20px" color={alpha(colors.info, 0.8)}>
              {index + 1}
            </Table.TableCell>
            <Table.TableCell width="20px" color={colors.text}>
              {serviceOrder.id}
            </Table.TableCell>
            <Table.TableCell width="275px" color={colors.text}>
              {serviceOrder.name}
            </Table.TableCell>
            <Table.TableCell width="124px" color={colors.text}>
              {serviceOrder.category}
            </Table.TableCell>
            <Table.TableCell width="534px" color={colors.text}>
              {serviceOrder.description}
            </Table.TableCell>
            {showProjectInfo && (
              <Table.TableCell width="64px" color={colors.text}>
                #{(serviceOrder as GetAllServiceOrdersResponse).project.id}{" "}
                <InfoBadge
                  name={
                    (serviceOrder as GetAllServiceOrdersResponse).project.name
                  }
                >
                  ?
                </InfoBadge>
              </Table.TableCell>
            )}
            <Table.TableCell width="110px" color={colors.text}>
              {formatDate(new Date(serviceOrder.createdDate))}
            </Table.TableCell>
            <Table.TableCell width="110px" color={colors.text}>
              {formatDate(new Date(serviceOrder.updatedDate))}
            </Table.TableCell>
            <Table.TableCell width="140px" align="center" color={colors.text}>
              <Checkbox
                defaultValue={serviceOrder.isApproved}
                onClick={(status) =>
                  mutationUpdateServiceOrderStatus.mutate({
                    id: String(serviceOrder.id),
                    status,
                  })
                }
              />
            </Table.TableCell>
            {showProjectInfo && (
              <Table.TableCell width="110px" align="center">
                Actions
              </Table.TableCell>
            )}
          </Table.TableRow>
        ))}
      </Table.TableBody>
      {data?.length === 0 && (
        <div className="flex flex-col gap-4 items-center justify-center">
          <img src={nlcLogo} alt="No data" className="opacity-10" width={64} />
          <p className="text-info">No service orders found</p>
        </div>
      )}
    </Table>
  );
};
