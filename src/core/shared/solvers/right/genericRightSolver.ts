import { ISuccess } from '../../ISuccess'

export class GenericRightSolver extends ISuccess {
  static successValidation(): ISuccess {
    const successValidation = new GenericRightSolver({
      statusCode: 200,
      describe: {
        code: 'VS-001',
        project: 'ACCOUNT',
        message: 'Validation Succesfully',
        shortMessage: 'validationSuccesfully'
      }
    })
    return successValidation
  }
}
