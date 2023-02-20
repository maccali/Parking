import { IError } from '../../../shared/IError'

export class CognitoLeftSolver extends IError {
  static leftUsernameExistsException(): IError {
    return new CognitoLeftSolver({
      statusCode: 400,
      describe: {
        code: 'CE-001',
        project: 'ACCOUNT',
        message: 'Username Exists Exception',
        shortMessage: 'usernameExistsException'
      }
    })
  }
}
