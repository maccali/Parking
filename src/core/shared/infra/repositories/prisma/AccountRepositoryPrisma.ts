import { Account } from "domain/entities/Account";
import { IAccountRepository } from "domain/repositories/IAccountRepository";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class AccountRepositoryPrisma implements IAccountRepository {
  async findById(id: string): Promise<any> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  }

  async deleteById(id: string): Promise<any> {
    const user = await prisma.user.delete({ where: { id } });
    return user;
  }

  async save(account: Account): Promise<any> {
    const user = await prisma.user.create({
      data: {
        nickname: account.nickname,
        password: account.password,
      },
    });

    return user;
  }

  async update(account: Account): Promise<any> {
    const user = await prisma.user.update({
      where: { id: account.id },
      data: {
        nickname: account.nickname,
        password: account.password,
      },
    });
    return user;
  }
}
