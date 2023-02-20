import { IAdminRepository } from 'domain/repositories/IAdminRepository'
import { IDoctorRepository } from 'domain/repositories/IDoctorRepository'
import { INurseRepository } from 'domain/repositories/INurseRepository'
import { IPatientAssociationsRepository } from 'domain/repositories/IPatientAssociationsRepository'
import { IPatientsRepository } from 'domain/repositories/IPatientsRepository'
import { IPatientsRepositoryV2 } from 'domain/repositories/IPatientsRepositoryV2'
import { LoggerInterface } from 'shared/infra/logger/logger.interface'
export abstract class AbstractRepositoryFactory {
  logger: LoggerInterface

  constructor(logger: LoggerInterface) {
    this.logger = logger
  }

  abstract getAdminRepository(): IAdminRepository
  abstract getDoctorRepository(): IDoctorRepository
  abstract getPatientRepository(): IPatientsRepository
  abstract getPatientRepositoryV2(): IPatientsRepositoryV2
  abstract getNurseRepository(): INurseRepository
  abstract getPatientAssociationsRepository(): IPatientAssociationsRepository
}
