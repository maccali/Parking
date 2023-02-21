export class RegisterEntryInput {
  licensePlate: string;

  constructor({ licensePlate }: RegisterEntryInput) {
    this.licensePlate = licensePlate;
  }
}
