import { ISuccess } from 'shared/ISuccess'

export class CreateRightSolver extends ISuccess {
  static rightCreated(result: any): ISuccess {
    const rightCreatedSolver = new CreateRightSolver({
      statusCode: 200,
      describe: {
        code: 'CS-001',
        project: 'ACCOUNT',
        message: 'Created Succesfully',
        shortMessage: 'createdSuccesfully'
      },
      result
    })
    return rightCreatedSolver
  }
}
