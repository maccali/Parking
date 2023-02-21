import { AbstractRepositoryFactory } from "../factory/AbstractRepositoryFactory";

export class GetParkingByLicensePlateDomain {
  repositoryFactory: AbstractRepositoryFactory;

  constructor(repositoryFactory: AbstractRepositoryFactory) {
    this.repositoryFactory = repositoryFactory;
  }

  async find(licensePlate: string, type: "TO-CALC" | "TO-PAYD" | "TO-FINISH") {
    const parkingRepository = this.repositoryFactory.getParkingRepository();

    const parking = await parkingRepository.getByLicensePlate(
      licensePlate,
      type
    );

    return parking;
  }
}
