import { IError } from '../../../shared/IError'

export class GenericLeftSolver extends IError {
  static leftGeneric(): IError {
    return new GenericLeftSolver({
      statusCode: 500,
      describe: {
        code: 'GE-001',
        project: 'ACCOUNT',
        message: 'Generic Error',
        shortMessage: 'genericError'
      }
    })
  }

  static invalidResponse(): IError {
    return new GenericLeftSolver({
      statusCode: 500,
      describe: {
        code: 'GE-002',
        project: 'ACCOUNT',
        message: 'Invalid Response Error',
        shortMessage: 'invalidResponseError'
      }
    })
  }

  static invalidRequest(cause?: any): IError {
    return new GenericLeftSolver({
      statusCode: 400,
      describe: {
        code: 'IR-001',
        project: 'ACCOUNT',
        message: 'Invalid Request',
        shortMessage: 'invalidRequest'
      },
      result: cause
    })
  }
}
