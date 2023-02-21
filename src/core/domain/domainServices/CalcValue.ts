import { AbstractRepositoryFactory } from "../factory/AbstractRepositoryFactory";
import { Parking } from "../entities/Parking";
export class CalcValueDomain {
  repositoryFactory: AbstractRepositoryFactory;

  constructor(repositoryFactory: AbstractRepositoryFactory) {
    this.repositoryFactory = repositoryFactory;
  }

  async calc(payload: Parking) {
    const dateToExit = new Date().getTime();
    const dateToEntry = new Date(payload.hourEntry).getTime();

    const timeParked = dateToExit - dateToEntry;

    const freeParking = 10 * 60 * 1000;
    const tier2Parking = 60 * 60 * 1000;

    console.log("timeParked", timeParked);
    console.log("freeParking", freeParking);
    console.log("tier2Parking", tier2Parking);
    console.log("timeParked > freeParking", timeParked > freeParking);
    console.log("timeParked <= tier2Parking", timeParked <= tier2Parking);

    if (timeParked <= freeParking) {
      payload.valueToPay = 0;
    } else {
      if (timeParked <= tier2Parking) {
        payload.valueToPay = 20;
      } else {
        const timeParkedInMinutes = timeParked / 1000 / 60;
        const aditionalHours = Math.ceil((timeParkedInMinutes - 60) / 60);
        payload.valueToPay = 20 * (aditionalHours + 1);
      }
    }

    payload.hourExit = new Date(dateToExit);
    payload.timeOfParking = timeParked;

    console.log("payload  ==", payload);

    const parkingRepository = this.repositoryFactory.getParkingRepository();

    const parking = await parkingRepository.update(payload);

    return parking;
  }
}
