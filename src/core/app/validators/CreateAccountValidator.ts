import { IsString, MinLength, validate } from "class-validator";
import { left, right } from "shared/either";
import { GenericLeftSolver } from "shared/solvers/left/genericLeftSolver";
import { GenericRightSolver } from "shared/solvers/right/genericRightSolver";

export class CreateAccountValidator {
  @IsString()
  nickname: string;

  @IsString()
  @MinLength(8)
  password: string;

  constructor({ nickname, password }: CreateAccountValidator) {
    this.nickname = nickname;
    this.password = password;
  }

  async validateData(admin: CreateAccountValidator) {
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
