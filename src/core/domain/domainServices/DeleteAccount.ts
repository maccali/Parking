import { AbstractRepositoryFactory } from "../factory/AbstractRepositoryFactory";

export class DeleteAccountDomain {
  repositoryFactory: AbstractRepositoryFactory;

  constructor(repositoryFactory: AbstractRepositoryFactory) {
    this.repositoryFactory = repositoryFactory;
  }

  async delete(id: string) {
    const accountRepository = this.repositoryFactory.getAccountRepository();

    const account = await accountRepository.deleteById(id);

    return account;
  }
}
