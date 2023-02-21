import { AbstractRepositoryFactory } from "../factory/AbstractRepositoryFactory";
import { Account } from "../entities/Account";
export class CreateAccountDomain {
  repositoryFactory: AbstractRepositoryFactory;
  constructor(repositoryFactory: AbstractRepositoryFactory) {
    this.repositoryFactory = repositoryFactory;
  }

  async create(payload: Account) {
    const accountRepository = this.repositoryFactory.getAccountRepository();

    const admin = await accountRepository.save(payload);

    return admin;
  }
}
