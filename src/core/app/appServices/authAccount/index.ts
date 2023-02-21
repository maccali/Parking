import { AbstractRepositoryFactory } from "../../../domain/factory/AbstractRepositoryFactory";
import { GetAccountByNickname } from "../../../domain/domainServices/GetAccountByNickname";

import { LoginRightSolver } from "shared/solvers/right/loginRightSolver";
import { LoginLeftSolver } from "shared/solvers/left/loginLeftSolver";

import { Either, left, right } from "shared/either";
import { IError } from "shared/IError";
import { ISuccess } from "shared/ISuccess";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { EnvHelper } from "shared/utils/envHelper";

interface IExecInput {
  nickname: string;
  password: string;
}
export class AuthAccount {
  repositoryFactory: AbstractRepositoryFactory;

  constructor(repositoryFactory: AbstractRepositoryFactory) {
    this.repositoryFactory = repositoryFactory;
  }

  async execute({
    nickname,
    password,
  }: IExecInput): Promise<Either<IError, ISuccess>> {
    const getAccountByNickname = new GetAccountByNickname(
      this.repositoryFactory
    );

    const accountNicknameDomain = await getAccountByNickname.find(nickname);

    console.log("accountNicknameDomain", accountNicknameDomain);

    if (!accountNicknameDomain) {
      return left(LoginLeftSolver.leftAuth());
    }

    if (!bcrypt.compareSync(password, accountNicknameDomain.password)) {
      return left(LoginLeftSolver.leftAuth());
    }

    const token = jwt.sign(
      { id: accountNicknameDomain.id },
      String(EnvHelper.jwtKey),
      { expiresIn: "1h" }
    );

    return right(LoginRightSolver.loginRight({ token }));
  }
}
