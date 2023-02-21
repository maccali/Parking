import { AbstractRepositoryFactory } from "../../../domain/factory/AbstractRepositoryFactory";
import { CreateRightSolver } from "shared/solvers/right/registerRightSolver";
import { Parking } from "domain/entities/Parking";

import { RegisterExitDomain } from "../../../domain/domainServices/RegisterExit";
import { GetParkingByLicensePlateDomain } from "../../../domain/domainServices/GetParkingByLicensePlate";
// import { GetParkingByLicensePlateDomain } from "../../../domain/domainServices/";

import { Either, left, right } from "shared/either";
import { IError } from "shared/IError";
import { ISuccess } from "shared/ISuccess";
interface IExecInput {
  licensePlate: string;
}
export class RegisterExit {
  repositoryFactory: AbstractRepositoryFactory;

  constructor(repositoryFactory: AbstractRepositoryFactory) {
    this.repositoryFactory = repositoryFactory;
  }

  async execute({
    licensePlate,
  }: IExecInput): Promise<Either<IError, ISuccess>> {
    const getParking = new GetParkingByLicensePlateDomain(
      this.repositoryFactory
    );

    const registerExit = new RegisterExitDomain(this.repositoryFactory);

    let parking = await getParking.find(licensePlate, "TO-FINISH");

    parking = await registerExit.update(parking);

    return right(CreateRightSolver.rightCreated(parking));
  }
}
