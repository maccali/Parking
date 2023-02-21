import { v4 as uuid } from "uuid";

export class Parking {
  id?: string;
  licensePlate: string;
  hourEntry?: string;
  hourExit?: string;
  timeOfParking?: number;
  valueToPay?: number;
  valuePaid?: number;
  discount?: number;
  createdAt?: number;
  updatedAt?: number;

  constructor({
    id,
    licensePlate,
    hourEntry,
    hourExit,
    timeOfParking,
    valueToPay,
    valuePaid,
    discount,
  }: Parking) {
    const createDate = new Date().toISOString();

    this.id = id;

    this.licensePlate = licensePlate;
    if (!this.hourEntry) {
      this.hourEntry = new Date(createDate);
    }

    this.hourExit = hourExit;
    this.timeOfParking = timeOfParking;
    this.valueToPay = valueToPay;
    this.valuePaid = valuePaid;
    this.discount = discount;

    this.createdAt = new Date(createDate).getTime();
    this.updatedAt = new Date(createDate).getTime();

    if (!id) {
      this.id = uuid();
    }
  }
}
