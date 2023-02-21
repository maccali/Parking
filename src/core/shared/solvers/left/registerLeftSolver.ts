import { IError } from "shared/IError";
export class ValidationError extends IError {
  static alreadyExistsRegistrationNumber(): IError {
    return new ValidationError({
      statusCode: 400,
      describe: {
        code: "AEN-001",
        project: "ACCOUNT",
        message: "Already exists nickname",
        shortMessage: "alreadyExistsNickname",
      },
    });
  }
}
