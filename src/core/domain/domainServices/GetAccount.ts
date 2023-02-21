import { AbstractRepositoryFactory } from "../factory/AbstractRepositoryFactory";
import { LoggerInterface } from "shared/infra/logger/logger.interface";

export class GetAccount {
  repositoryFactory: AbstractRepositoryFactory;

  constructor(repositoryFactory: AbstractRepositoryFactory) {
    this.repositoryFactory = repositoryFactory;
  }

  async find(id: string) {
    const accountRepository = this.repositoryFactory.getAccountRepository();

    const account = await accountRepository.findById(id);

    return account;
  }
}
