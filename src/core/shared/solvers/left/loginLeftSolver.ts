import { IError } from '../../../shared/IError'

export class LoginLeftSolver extends IError {
  static leftAuth(): IError {
    return new LoginLeftSolver({
      statusCode: 500,
      describe: {
        code: 'LE-001',
        project: 'ACCOUNT',
        message: 'Auth Error',
        shortMessage: 'authError'
      }
    })
  }
  static notFindUser(): IError {
    return new LoginLeftSolver({
      statusCode: 500,
      describe: {
        code: 'LE-002',
        project: 'ACCOUNT',
        message: 'Not Find User Error',
        shortMessage: 'notFindUserError'
      }
    })
  }
}
