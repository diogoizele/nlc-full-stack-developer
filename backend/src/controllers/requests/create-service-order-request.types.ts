export interface CreateServiceOrderRequest {
  name: string;
  category: string;
  description: string | null;
  isApproved: boolean;
  projectId: number;
}

export interface CreateServiceOrderEntity extends CreateServiceOrderRequest {
  createdDate: Date;
  updatedDate: Date;
}
