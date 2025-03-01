import { db } from "../config/database";

class UserRepository {
  database = db.user;

  async findByEmail(email: string) {
    return await this.database.findUnique({ where: { email: email } });
  }
}

export default new UserRepository();
