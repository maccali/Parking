import { AbstractRepositoryFactory } from "../factory/AbstractRepositoryFactory";
import { Parking } from "../entities/Parking";
export class RegisterPaymentDomain {
  repositoryFactory: AbstractRepositoryFactory;

  constructor(repositoryFactory: AbstractRepositoryFactory) {
    this.repositoryFactory = repositoryFactory;
  }

  async update(payload: Parking) {
    const parkingRepository = this.repositoryFactory.getParkingRepository();

    console.log("payload", payload);

    payload.valuePaid = payload.valueToPay;

    const parking = await parkingRepository.update(payload);

    return parking;
  }
}
