import { AbstractRepositoryFactory } from "../factory/AbstractRepositoryFactory";
import { Parking } from "../entities/Parking";
export class RegisterEntryDomain {
  repositoryFactory: AbstractRepositoryFactory;

  constructor(repositoryFactory: AbstractRepositoryFactory) {
    this.repositoryFactory = repositoryFactory;
  }

  async create(payload: Parking) {
    const parkingRepository = this.repositoryFactory.getParkingRepository();

    const parking = await parkingRepository.register(payload);

    return parking;
  }
}
