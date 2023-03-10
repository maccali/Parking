import { IsString, validate } from "class-validator";
import { left, right } from "shared/either";
import { GenericLeftSolver } from "shared/solvers/left/genericLeftSolver";
import { GenericRightSolver } from "shared/solvers/right/genericRightSolver";

export class RegisterPaymentValidator {
  @IsString()
  licensePlate: string;

  constructor({ licensePlate }: RegisterPaymentValidator) {
    this.licensePlate = licensePlate;
  }

  async validateData(admin: RegisterPaymentValidator) {
    const errors = await validate(admin);

    if (!errors.length) {
      return right(GenericRightSolver.successValidation());
    }

    const messages: any = [];
    errors.forEach((error) => {
      messages.push({
        field: error.property,
        message: Object.values(error.constraints)[0],
        validation: error.target[error.property],
      });
    });

    return left(GenericLeftSolver.invalidRequest(messages));
  }
}
