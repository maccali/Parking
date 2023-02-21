import { Parking } from "domain/entities/Parking";
import { IParkingRepository } from "domain/repositories/IParkingRepository";

export class ParkingRepositoryPrisma implements IParkingRepository {
  async register(parking: Parking): Promise<Parking> {}
  async update(parking: Parking): Promise<Parking> {}
  async getByLicensePlate(licensePlate: string): Promise<Parking> {}
}
