import { IError } from '../../../shared/IError'

export class LoginLeftSolver extends IError {
  static leftAuth(): IError {
    return new LoginLeftSolver({
      statusCode: 500,
      describe: {
        code: 'AE-001',
        project: 'ACCOUNT',
        message: 'Auth Error',
        shortMessage: 'authError'
      }
    })
  }
}
