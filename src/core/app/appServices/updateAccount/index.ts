import { AbstractRepositoryFactory } from "../../../domain/factory/AbstractRepositoryFactory";

import { EditAccount } from "../../../domain/domainServices/EditAccount";

import { UpdateRightSolver } from "shared/solvers/right/updateRightSolver";
import { Account } from "domain/entities/Account";

import { Either, left, right } from "shared/either";
import { IError } from "shared/IError";
import { ISuccess } from "shared/ISuccess";
interface IExecInput {
  id: string;
  nickname: string;
  password: string;
}
export class UpdateAccount {
  repositoryFactory: AbstractRepositoryFactory;

  constructor(repositoryFactory: AbstractRepositoryFactory) {
    this.repositoryFactory = repositoryFactory;
  }

  async execute({
    id,
    nickname,
    password,
  }: IExecInput): Promise<Either<IError, ISuccess>> {
    const editAccount = new EditAccount(this.repositoryFactory);

    const account = new Account({ id, nickname, password });

    const accountDomain = await editAccount.update(account);

    return right(UpdateRightSolver.rightUpdated(accountDomain));
  }
}
