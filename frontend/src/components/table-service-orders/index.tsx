import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";
import { RiEditFill } from "react-icons/ri";
import { useNavigate } from "react-router";
import { useTheme } from "styled-components";

import { GetAllServiceOrdersResponse } from "../../api/interfaces/service-orders";
import {
  deleteServiceOrder,
  fetchServiceOrderById,
  updateServiceOrder,
  updateServiceOrderStatus,
} from "../../api/service-orders";
import { ServiceOrderFormData } from "../../screens/service-orders/types";
import { useAppStore } from "../../stores/app.store";
import { alpha } from "../../utils/alpha";
import { formatDate } from "../../utils/format-date";
import { Checkbox } from "../checkbox";
import { EmptyList } from "../empty-list";
import { ModalConfirmDelete } from "../modal-confirm-delete";
import { ModalServiceOrderForm } from "../modal-service-order-form";
import { Table } from "../table";
import { InfoBadge } from "./styles";
import { TableServiceOrdersProps } from "./types";

export const TableServiceOrders = ({
  data,
  showProjectInfo,
}: TableServiceOrdersProps) => {
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
  const [isDeletingModalOpen, setIsDeletingModalOpen] = useState(false);
  const [serviceOrderData, setServiceOrderData] =
    useState<GetAllServiceOrdersResponse>();
  const [serviceOrderId, setServiceOrderId] = useState<number>();

  const setIsLoading = useAppStore((state) => state.setIsLoading);

  const {
    control,
    formState: { errors },
    handleSubmit,
    clearErrors,
    reset,
  } = useForm<ServiceOrderFormData>({
    defaultValues: serviceOrderData,
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { colors } = useTheme();

  const mutationFetchServiceOrderDetails = useMutation({
    mutationFn: fetchServiceOrderById,
    onSuccess: (data) => {
      setIsLoading(false);
      setServiceOrderData(data);
      setIsEditingModalOpen(true);
    },
    onError: () => {
      setIsLoading(false);
      toast.error(
        "An error occurred to fetch current service order details. Please try again later"
      );
    },
  });

  const mutationUpdateServiceOrderStatus = useMutation({
    mutationFn: updateServiceOrderStatus,
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ["service-orders"] });
      queryClient.removeQueries({ queryKey: ["service-orders"], exact: false });
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

  const mutationUpdateServiceOrder = useMutation({
    mutationFn: updateServiceOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-orders"] });
      queryClient.removeQueries({ queryKey: ["service-orders"], exact: false });
      queryClient.refetchQueries({ queryKey: ["service-orders"] });
      setIsLoading(false);
      toast.success("Service Order updated successfully");
      handleCloseModal();
    },
    onError: () => {
      setIsLoading(false);
      toast.error(
        "An error occurred to update service order. Please try again later"
      );
    },
  });

  const mutationDeleteServiceOrder = useMutation({
    mutationFn: deleteServiceOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-orders"] });
      queryClient.removeQueries({ queryKey: ["service-orders"], exact: false });
      queryClient.refetchQueries({ queryKey: ["service-orders"] });
      queryClient.refetchQueries({ queryKey: ["service-orders-count"] });
      setIsLoading(false);
      toast.success("Service Order deleted successfully");
    },
    onError: () => {
      setIsLoading(false);
      toast.error(
        "An error occurred to delete service order. Please try again later"
      );
    },
  });

  const onSubmit = (data: ServiceOrderFormData) => {
    setIsLoading(true);
    if (serviceOrderData?.id) {
      mutationUpdateServiceOrder.mutate({
        id: serviceOrderData.id,
        payload: data,
      });
    }
  };

  const handleCloseModal = () => {
    setIsEditingModalOpen(false);
    clearErrors();
    reset();
  };

  const handleConfirmDelete = (id: number) => {
    setIsDeletingModalOpen(true);
    setServiceOrderId(id);
  };

  const handleDeleteServiceOrder = () => {
    setIsLoading(true);
    mutationDeleteServiceOrder.mutate(serviceOrderId!);
    setIsDeletingModalOpen(false);
  };

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
                    id: serviceOrder.id,
                    status,
                  })
                }
              />
            </Table.TableCell>
            {showProjectInfo && (
              <Table.TableCell width="110px" align="center">
                <div className="flex items-start gap-6">
                  <button
                    type="button"
                    title="Delete"
                    className="text-danger hover:scale-105 transform transition duration-300 ease-in-out"
                    onClick={() => handleConfirmDelete(serviceOrder.id)}
                  >
                    <FaTrash size={24} />
                  </button>
                  <button
                    type="button"
                    title="Edit"
                    className="text-primary hover:scale-105 transform transition duration-300 ease-in-out"
                    onClick={() =>
                      mutationFetchServiceOrderDetails.mutate(serviceOrder.id)
                    }
                  >
                    <RiEditFill size={28} />
                  </button>
                </div>
              </Table.TableCell>
            )}
          </Table.TableRow>
        ))}
      </Table.TableBody>
      {data?.length === 0 && <EmptyList title="No service orders found" />}
      <ModalServiceOrderForm
        isOpen={isEditingModalOpen}
        control={control}
        errors={errors}
        title="Edit Service Order"
        cancelButtonText="Cancel"
        submitButtonText="Confirm update"
        onClose={handleCloseModal}
        onSubmit={handleSubmit(onSubmit)}
        defaultValues={serviceOrderData}
      />
      <ModalConfirmDelete
        isOpen={isDeletingModalOpen}
        title="Delete Service Order confirmation"
        onClose={() => setIsDeletingModalOpen(false)}
        onConfirm={handleDeleteServiceOrder}
      >
        <p className="font-medium">
          Are you sure you want to delete this{" "}
          <span className="font-semibold">service order?</span> This action{" "}
          <span className="text-danger font-bold">cannot</span> be undone.
        </p>
      </ModalConfirmDelete>
    </Table>
  );
};
