import { AbstractRepositoryFactory } from "../../../domain/factory/AbstractRepositoryFactory";
import { GetAccount } from "../../../domain/domainServices/GetAccount";

import { ShowRightSolver } from "shared/solvers/right/showRightSolver";

import { Either, left, right } from "shared/either";
import { IError } from "shared/IError";
import { ISuccess } from "shared/ISuccess";
interface IExecInput {
  id: string;
}
export class ShowAccount {
  repositoryFactory: AbstractRepositoryFactory;

  constructor(repositoryFactory: AbstractRepositoryFactory) {
    this.repositoryFactory = repositoryFactory;
  }

  async execute({ id }: IExecInput): Promise<Either<IError, ISuccess>> {
    const getAccount = new GetAccount(this.repositoryFactory);

    const accountDomain = await getAccount.find(id);

    return right(ShowRightSolver.rightShowed(accountDomain));
  }
}
