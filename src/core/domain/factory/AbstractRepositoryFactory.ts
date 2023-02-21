import { IAccountRepository } from "domain/repositories/IAccountRepository";
import { IParkingRepository } from "domain/repositories/IParkingRepository";

export abstract class AbstractRepositoryFactory {
  abstract getAccountRepository(): IAccountRepository;
  abstract getParkingRepository(): IParkingRepository;
}
