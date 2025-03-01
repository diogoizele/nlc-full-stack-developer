import type { ServiceOrder as ServiceOrderInterface } from "@prisma/client";

export class ServiceOrder implements ServiceOrderInterface {
  constructor(
    public category: string,
    public createdDate: Date,
    public description: string | null,
    public id: number,
    public name: string,
    public updatedDate: Date,
    public isApproved: boolean,
    public projectId: number
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.description = description;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.isApproved = isApproved;
    this.projectId = projectId;
  }
}
