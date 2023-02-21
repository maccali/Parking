import { Parking } from "domain/entities/Parking";

export interface IParkingRepository {
  register(parking: Parking): Promise<Parking>;
  update(parking: Parking): Promise<Parking>;
  getByLicensePlate(
    licensePlate: string,
    type: "TO-CALC" | "TO-PAYD" | "TO-FINISH"
  ): Promise<Parking>;
}
