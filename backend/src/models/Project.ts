import type { Project as ProjectInterface } from "@prisma/client";

export class Project implements ProjectInterface {
  constructor(
    public id: number,
    public name: string,
    public description: string | null
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
