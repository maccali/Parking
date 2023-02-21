import { AbstractRepositoryFactory } from "../factory/AbstractRepositoryFactory";
import { Account } from "../entities/Account";
export class EditAccount {
  repositoryFactory: AbstractRepositoryFactory;

  constructor(repositoryFactory: AbstractRepositoryFactory) {
    this.repositoryFactory = repositoryFactory;
  }

  async update(payload: Account) {
    const accountRepository = this.repositoryFactory.getAccountRepository();

    const account = await accountRepository.update(payload);

    return account;
  }
}
