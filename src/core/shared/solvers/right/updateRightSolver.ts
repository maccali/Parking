import { ISuccess } from 'shared/ISuccess'

export class UpdateRightSolver extends ISuccess {
  static rightUpdated(result: any): ISuccess {
    const rightUpdatedSolver = new UpdateRightSolver({
      statusCode: 200,
      describe: {
        code: 'US-001',
        project: 'ACCOUNT',
        message: 'Updated Succesfully',
        shortMessage: 'updatedSuccesfully'
      },
      result
    })
    return rightUpdatedSolver
  }
}
