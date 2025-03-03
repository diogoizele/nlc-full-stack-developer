export interface ServiceOrder {
  id: number;
  name: string;
  category: string;
  description: string;
  createdDate: string;
  updatedDate: string;
  isApproved: boolean;
  projectId: number;
}
