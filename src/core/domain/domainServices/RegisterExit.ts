import { AbstractRepositoryFactory } from "../factory/AbstractRepositoryFactory";
import { Parking } from "../entities/Parking";
export class RegisterExitDomain {
  repositoryFactory: AbstractRepositoryFactory;

  constructor(repositoryFactory: AbstractRepositoryFactory) {
    this.repositoryFactory = repositoryFactory;
  }

  async update(payload: Parking) {
    const parkingRepository = this.repositoryFactory.getParkingRepository();

    payload.discount = 0;

    const parking = await parkingRepository.update(payload);

    return parking;
  }
}
