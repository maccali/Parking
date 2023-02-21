import { AbstractRepositoryFactory } from "../../../domain/factory/AbstractRepositoryFactory";

import { DeleteAccountDomain } from "../../../domain/domainServices/DeleteAccount";

import { CreateRightSolver } from "shared/solvers/right/registerRightSolver";

import { Either, left, right } from "shared/either";
import { IError } from "shared/IError";
import { ISuccess } from "shared/ISuccess";

interface IExecInput {
  id: string;
}
export class DeleteAccount {
  repositoryFactory: AbstractRepositoryFactory;

  constructor(repositoryFactory: AbstractRepositoryFactory) {
    this.repositoryFactory = repositoryFactory;
  }

  async execute({ id }: IExecInput): Promise<Either<IError, ISuccess>> {
    const deleteAccount = new DeleteAccountDomain(this.repositoryFactory);

    const accountDomain = await deleteAccount.delete(id);

    return right(CreateRightSolver.rightCreated(accountDomain));
  }
}
