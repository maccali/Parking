import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

export class Account {
  id?: string;
  nickname: string;
  password: string;
  createdAt?: number;
  updatedAt?: number;

  constructor({ id, nickname, password }: Account) {
    const createDate = new Date().toISOString();

    this.id = id;
    this.nickname = nickname;
    this.password = bcrypt.hashSync(password, 10);
    this.createdAt = new Date(createDate).getTime();

    // if (!id) {
    // this.id = uuid();
    // }
  }
}
