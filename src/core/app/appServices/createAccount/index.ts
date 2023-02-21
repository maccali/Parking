import { AbstractRepositoryFactory } from "../../../domain/factory/AbstractRepositoryFactory";
import { CreateAccountDomain } from "../../../domain/domainServices/CreateAccount";

import { CreateRightSolver } from "shared/solvers/right/registerRightSolver";
import { Account } from "domain/entities/Account";

import { Either, left, right } from "shared/either";
import { IError } from "shared/IError";
import { ISuccess } from "shared/ISuccess";
interface IExecInput {
  nickname: string;
  password: string;
}
export class CreateAccount {
  repositoryFactory: AbstractRepositoryFactory;

  constructor(repositoryFactory: AbstractRepositoryFactory) {
    this.repositoryFactory = repositoryFactory;
  }

  async execute({
    nickname,
    password,
  }: IExecInput): Promise<Either<IError, ISuccess>> {
    const createAccount = new CreateAccountDomain(this.repositoryFactory);

    const account = new Account({ nickname, password });

    const accountDomain = await createAccount.create(account);

    return right(CreateRightSolver.rightCreated(accountDomain));
  }
}
