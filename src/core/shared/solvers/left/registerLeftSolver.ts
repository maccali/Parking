import { IError } from 'shared/IError'
export class ValidationError extends IError {
  static alreadyExistsRegistrationNumber(): IError {
    return new ValidationError({
      statusCode: 400,
      describe: {
        code: 'AERN-001',
        project: 'ACCOUNT',
        message: 'Already exists registration number',
        shortMessage: 'alreadyExistsRegistrationNumber'
      }
    })
  }
  static alreadyExistsCRM(): IError {
    return new ValidationError({
      statusCode: 400,
      describe: {
        code: 'AERN-002',
        project: 'ACCOUNT',
        message: 'Already exists CRM',
        shortMessage: 'alreadyExistsCRM'
      }
    })
  }
  static alreadyExistsCoren(): IError {
    return new ValidationError({
      statusCode: 400,
      describe: {
        code: 'AERN-003',
        project: 'ACCOUNT',
        message: 'Already exists Coren',
        shortMessage: 'alreadyExistsCoren'
      }
    })
  }
  static alreadyExistsEmail(): IError {
    return new ValidationError({
      statusCode: 400,
      describe: {
        code: 'AERN-004',
        project: 'ACCOUNT',
        message: 'Already exists Email',
        shortMessage: 'alreadyExistsEmail'
      }
    })
  }
}
