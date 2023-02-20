import { Patient } from 'domain/entities/Patient'
import { PatientAssociation } from '../entities/PatientAssociation'
import { AbstractRepositoryFactory } from '../factory/AbstractRepositoryFactory'
import { ProfessionalsFinder } from './ProfessionalsFinder'
import { LoggerInterface } from 'shared/infra/logger/logger.interface'
export class PatientFinder implements ProfessionalsFinder {
  repositoryFactory: AbstractRepositoryFactory
  logger: LoggerInterface

  constructor(
    repositoryFactory: AbstractRepositoryFactory,
    logger: LoggerInterface
  ) {
    this.repositoryFactory = repositoryFactory
    this.logger = logger
  }

  async find(): Promise<Patient[]> {
    this.logger.info({ message: 'INIT find' })

    this.logger.info({
      message: 'EXEC this.repositoryFactory.getPatientRepository'
    })
    const patientRepository = this.repositoryFactory.getPatientRepositoryV2()

    const patients = await patientRepository.findAll()

    this.logger.info({ message: 'RETURN OF find' })
    // console.log('patients', patients)
    return patients
  }
}
