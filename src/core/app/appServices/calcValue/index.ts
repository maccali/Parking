import { AbstractRepositoryFactory } from "../../../domain/factory/AbstractRepositoryFactory";
import { CreateRightSolver } from "shared/solvers/right/registerRightSolver";
import { Parking } from "domain/entities/Parking";

import { CalcValueDomain } from "../../../domain/domainServices/CalcValue";
import { GetParkingByLicensePlateDomain } from "../../../domain/domainServices/GetParkingByLicensePlate";
// import { GetParkingByLicensePlateDomain } from "../../../domain/domainServices/";

import { Either, left, right } from "shared/either";
import { IError } from "shared/IError";
import { ISuccess } from "shared/ISuccess";
interface IExecInput {
  licensePlate: string;
}
export class CalcValue {
  repositoryFactory: AbstractRepositoryFactory;

  constructor(repositoryFactory: AbstractRepositoryFactory) {
    this.repositoryFactory = repositoryFactory;
  }

  async execute({
    licensePlate,
  }: IExecInput): Promise<Either<IError, ISuccess>> {
    const calcValue = new CalcValueDomain(this.repositoryFactory);
    const getParking = new GetParkingByLicensePlateDomain(
      this.repositoryFactory
    );

    // const parking = new Parking({ licensePlate });

    let parking = await getParking.find(licensePlate, "TO-CALC");

    console.log("parking -- ", parking);
    parking = await calcValue.calc(parking);

    console.log("parking ++", parking);

    return right(CreateRightSolver.rightCreated(parking));
  }
}
