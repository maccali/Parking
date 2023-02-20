import { ISuccess } from 'shared/ISuccess'
import { Patient } from 'domain/entities/Patient'

export class ProfessionalRightSolver extends ISuccess {
  static rightListed({ meta, patients }): ISuccess {
    const rightListedSolver = new ProfessionalRightSolver({
      statusCode: 200,
      describe: {
        code: 'LS-001',
        project: 'ACCOUNT',
        message: 'Listed Succesfully',
        shortMessage: 'listedSuccesfully'
      },
      meta,
      patients
    })
    return rightListedSolver
  }
}
