import { AbstractRepositoryFactory } from "../../../domain/factory/AbstractRepositoryFactory";
import { CreateRightSolver } from "shared/solvers/right/registerRightSolver";
import { Parking } from "domain/entities/Parking";

import { RegisterPaymentDomain } from "../../../domain/domainServices/RegisterPayment";
import { GetParkingByLicensePlateDomain } from "../../../domain/domainServices/GetParkingByLicensePlate";
// import { GetParkingByLicensePlateDomain } from "../../../domain/domainServices/";

import { Either, left, right } from "shared/either";
import { IError } from "shared/IError";
import { ISuccess } from "shared/ISuccess";
interface IExecInput {
  licensePlate: string;
}
export class RegisterPayment {
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

    const registerPayment = new RegisterPaymentDomain(this.repositoryFactory);

    let parking = await getParking.find(licensePlate, "TO-PAYD");

    parking = await registerPayment.update(parking)

    return right(CreateRightSolver.rightCreated(parking));
  }
}
