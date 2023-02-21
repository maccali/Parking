import { Parking } from "domain/entities/Parking";
import { IParkingRepository } from "domain/repositories/IParkingRepository";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class ParkingRepositoryPrisma implements IParkingRepository {
  async register(parking: Parking): Promise<Parking> {
    const data = await prisma.parking.create({
      data: {
        licensePlate: parking.licensePlate,
        hourEntry: parking.hourEntry,
      },
    });

    return data;
  }

  async update(parking: Parking): Promise<Parking> {
    console.log("parking ??", parking);
    const data = await prisma.parking.update({
      where: { id: parking.id },
      data: {
        licensePlate: parking.licensePlate,
        discount: parking.discount,
        hourEntry: parking.hourEntry,
        hourExit: parking.hourExit,
        timeOfParking: parking.timeOfParking,
        valuePaid: parking.valuePaid,
        valueToPay: parking.valueToPay,
      },
    });

    return data;
  }

  async getByLicensePlate(
    licensePlate: string,
    type: "TO-CALC" | "TO-PAYD" | "TO-FINISH"
  ): Promise<Parking> {
    let data = undefined;

    if (type == "TO-CALC") {
      data = await prisma.parking.findFirst({
        where: { licensePlate, timeOfParking: null, valueToPay: null },
      });
    }
    if (type == "TO-PAYD") {
      data = await prisma.parking.findFirst({
        where: { licensePlate, valuePaid: null },
      });
    }
    if (type == "TO-FINISH") {
      data = await prisma.parking.findFirst({
        where: { licensePlate, discount: null },
      });
    }

    return data;
  }
}
