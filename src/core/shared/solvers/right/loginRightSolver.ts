import { ISuccess } from 'shared/ISuccess'

export class LoginRightSolver extends ISuccess {
  static loginRight(result: any): ISuccess {
    const loginCreatedSolver = new LoginRightSolver({
      statusCode: 200,
      describe: {
        code: 'LS-001',
        project: 'ACCOUNT',
        message: 'Login Succesfully',
        shortMessage: 'loginSuccesfully'
      },
      result
    })
    return loginCreatedSolver
  }
}
