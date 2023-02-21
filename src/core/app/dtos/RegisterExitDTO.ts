export class RegisterExitInput {
  licensePlate: string;

  constructor({ licensePlate }: RegisterExitInput) {
    this.licensePlate = licensePlate;
  }
}
