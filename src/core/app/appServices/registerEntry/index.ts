import { AbstractRepositoryFactory } from "../../../domain/factory/AbstractRepositoryFactory";
import { CreateRightSolver } from "shared/solvers/right/registerRightSolver";
import { Parking } from "domain/entities/Parking";

import { RegisterEntryDomain } from "../../../domain/domainServices/RegisterEntry";

import { Either, left, right } from "shared/either";
import { IError } from "shared/IError";
import { ISuccess } from "shared/ISuccess";
interface IExecInput {
  licensePlate: string;
}
export class RegisterEntry {
  repositoryFactory: AbstractRepositoryFactory;

  constructor(repositoryFactory: AbstractRepositoryFactory) {
    this.repositoryFactory = repositoryFactory;
  }

  async execute({
    licensePlate,
  }: IExecInput): Promise<Either<IError, ISuccess>> {
    const registerEntry = new RegisterEntryDomain(this.repositoryFactory);

    const parking = new Parking({ licensePlate });

    const registerEntryDomain = await registerEntry.create(parking);

    return right(CreateRightSolver.rightCreated(registerEntryDomain));
  }
}
