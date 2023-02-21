import { IAccountRepository } from "domain/repositories/IAccountRepository";
import { IParkingRepository } from "domain/repositories/IParkingRepository";
import { AccountRepositoryPrisma } from "shared/infra/repositories/prisma/AccountRepositoryPrisma";
import { ParkingRepositoryPrisma } from "shared/infra/repositories/prisma/ParkingRepositoryPrisma";
import { AbstractRepositoryFactory } from "domain/factory/AbstractRepositoryFactory";

export class PrismaRepositoryFactory extends AbstractRepositoryFactory {
  getAccountRepository(): IAccountRepository {
    return new AccountRepositoryPrisma();
  }

  getParkingRepository(): IParkingRepository {
    return new ParkingRepositoryPrisma();
  }
}
