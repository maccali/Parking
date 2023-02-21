import { AbstractRepositoryFactory } from "../factory/AbstractRepositoryFactory";
import { LoggerInterface } from "shared/infra/logger/logger.interface";

export class GetAccountByNickname {
  repositoryFactory: AbstractRepositoryFactory;

  constructor(repositoryFactory: AbstractRepositoryFactory) {
    this.repositoryFactory = repositoryFactory;
  }

  async find(nickname: string) {
    const accountRepository = this.repositoryFactory.getAccountRepository();

    const account = await accountRepository.findByNickname(nickname);

    return account;
  }
}
