export interface CreateServiceOrderRequest {
  name: string;
  category: string;
  description?: string | null;
  createdDate: Date;
  updatedDate: Date;
  isApproved: boolean;
  projectId: number;
}
