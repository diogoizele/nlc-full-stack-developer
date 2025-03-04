import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router";

import {
  createServiceOrder,
  fetchAllServiceOrders,
} from "../../api/service-orders";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { ModalServiceOrderForm } from "../../components/modal-service-order-form";
import { PageContainer } from "../../components/page-container";
import { TableServiceOrders } from "../../components/table-service-orders";
import { useAppStore } from "../../stores/app.store";
import { ServiceOrderFormData, ServiceOrdersState } from "./types";

export const ServiceOrdersScreen = () => {
  const { state } = useLocation() as ServiceOrdersState;

  const [searchQuery, setSearchQuery] = useState(state?.serviceOrderName);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(!!state?.create);
  const [project, setProject] = useState<typeof state.project | undefined>(
    state?.project
  );

  const debouncedFilter = useDebounce(searchQuery, 500);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setIsLoading = useAppStore((state) => state.setIsLoading);

  const { data, isFetching } = useQuery({
    queryKey: ["service-orders", debouncedFilter],
    queryFn: () => fetchAllServiceOrders(debouncedFilter),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    clearErrors,
    reset,
  } = useForm<ServiceOrderFormData>();

  const mutationCreateServiceOrder = useMutation({
    mutationFn: createServiceOrder,
    onSuccess: ({ id, projectId }) => {
      queryClient.invalidateQueries({ queryKey: ["service-orders"] });
      queryClient.removeQueries({ queryKey: ["service-orders"], exact: false });
      queryClient.refetchQueries({ queryKey: ["service-orders"] });
      queryClient.refetchQueries({ queryKey: ["service-orders-count"] });

      setIsCreateModalOpen(false);
      reset();
      setIsLoading(false);
      toast.success(`Service Order with id #${id} created successfully`);

      if (state?.create && project && projectId === Number(project.id)) {
        navigate(`/projects/${state.project.id}`);
      }
    },
    onError: () => {
      setIsLoading(false);
      setIsCreateModalOpen(false);
      toast.error(
        "An error occurred to create service order. Please try again later"
      );
    },
  });

  const onSubmit = (data: ServiceOrderFormData) => {
    setIsLoading(true);
    mutationCreateServiceOrder.mutate(data);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    clearErrors();
    reset();
    setProject(undefined);
  };

  const handleOpenModal = () => {
    setIsCreateModalOpen(true);
    clearErrors();
    reset();
    setProject(undefined);
  };

  useEffect(() => {
    setIsLoading(isFetching);
  }, [isFetching]);

  return (
    <PageContainer>
      <div className="flex flex-col gap-4 overflow-y-auto p-8 flex-1">
        <h2 className="font-bold text-2xl">Service Orders</h2>
        <div className="flex items-center justify-between max-sm:flex-col max-sm:gap-5 max-sm:items-stretch">
          <div className="w-1/2 max-w-prose max-sm:w-full">
            <Input
              placeholder="Search service orders..."
              value={searchQuery}
              onTextChange={setSearchQuery}
            />
          </div>

          <Button icon={<FaPlus />} fullWidth={false} onClick={handleOpenModal}>
            Add New
          </Button>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <div className="pt-6 flex-1 overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-secondary scrollbar-w-1 scrollbar-thumb-rounded scrollbar-track-rounded">
            <TableServiceOrders data={data} showProjectInfo />
          </div>
        </div>
      </div>
      <ModalServiceOrderForm
        isOpen={isCreateModalOpen}
        control={control}
        errors={errors}
        title="Create Service Order"
        cancelButtonText="Cancel"
        defaultValues={{
          project,
        }}
        submitButtonText="Create Service Order"
        onClose={handleCloseModal}
        onSubmit={handleSubmit(onSubmit)}
      />
    </PageContainer>
  );
};
