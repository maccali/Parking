export class RegisterPaymentInput {
  licensePlate: string;

  constructor({ licensePlate }: RegisterPaymentInput) {
    this.licensePlate = licensePlate;
  }
}
