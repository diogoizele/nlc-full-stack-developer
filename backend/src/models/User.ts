import type { User as UserInterface } from "@prisma/client";

export class User implements UserInterface {
  constructor(
    public id: number,
    public email: string,
    public password: string,
    public name: string,
    public role: string
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.role = role;
  }
}
