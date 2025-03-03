import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useLocation } from "react-router";
import { fetchAllServiceOrders } from "../../api/service-orders";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { PageContainer } from "../../components/page-container";
import { TableServiceOrders } from "../../components/table-service-orders";
import { useAppStore } from "../../stores/app.store";

export const ServiceOrdersScreen = () => {
  const { state } = useLocation();

  const [searchQuery, setSearchQuery] = useState(state?.serviceOrderName);

  const debouncedFilter = useDebounce(searchQuery, 500);

  const setIsLoading = useAppStore((state) => state.setIsLoading);

  const { data, isFetching, error, isError, isFetched } = useQuery({
    queryKey: ["service-orders", debouncedFilter],
    queryFn: () => fetchAllServiceOrders(debouncedFilter),
  });

  if (isError) {
  }

  if (isFetching) {
    setIsLoading(true);
    return null;
  }

  if (isFetched || isError) {
    setIsLoading(false);
    if (isError) {
      return <>Error: {error?.message}</>;
    }
  }

  return (
    <PageContainer>
      <div className="flex flex-col gap-4 overflow-y-auto p-8 flex-1">
        <h2 className="font-bold text-2xl">Service Orders</h2>
        <div className="flex items-center justify-between">
          <div className="w-1/2 max-w-prose">
            <Input
              placeholder="Search service orders..."
              value={searchQuery}
              onTextChange={setSearchQuery}
            />
          </div>

          <Button icon={<FaPlus />} fullWidth={false} onClick={() => {}}>
            Add New
          </Button>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <div className="pt-6 flex-1 overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-secondary scrollbar-w-1 scrollbar-thumb-rounded scrollbar-track-rounded">
            <TableServiceOrders data={data} showProjectInfo />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
