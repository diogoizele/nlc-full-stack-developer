export type ServiceOrderFormData = {
  name: string;
  description: string;
  category: string;
  projectId: number;
  isApproved: boolean;
};

export interface ServiceOrdersState {
  state: {
    create: boolean;
    serviceOrderName?: string;
    project: {
      id: number;
      name: string;
    };
  };
}
