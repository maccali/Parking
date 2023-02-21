export class RegisterCalcInput {
  licensePlate: string;

  constructor({ licensePlate }: RegisterCalcInput) {
    this.licensePlate = licensePlate;
  }
}
