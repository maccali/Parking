import { INurseRepository } from 'domain/repositories/INurseRepository'
import { IPatientAssociationsRepository } from 'domain/repositories/IPatientAssociationsRepository'
import { IPatientsRepository } from 'domain/repositories/IPatientsRepository'
import { PatientAssociationsRepositoryInMemory } from 'shared/infra/repositories/inMemory/PatientAssociationsRepositoryInMemory'
import { AbstractRepositoryFactory } from '../../../../domain/factory/AbstractRepositoryFactory'
import { IAdminRepository } from '../../../../domain/repositories/IAdminRepository'
import { IDoctorRepository } from '../../../../domain/repositories/IDoctorRepository'
import { AdminRepositoryInMemory } from '../../repositories/inMemory/AdminRepositoryInMemory'
import { DoctorRepositoryInMemory } from '../../repositories/inMemory/DoctorRepositoryInMemory'

export class InMemoryRepositoryFactory extends AbstractRepositoryFactory {
  static getInstance(): InMemoryRepositoryFactory {
    return new InMemoryRepositoryFactory()
  }

  getAdminRepository(): IAdminRepository {
    return new AdminRepositoryInMemory()
  }

  getDoctorRepository(): IDoctorRepository {
    return new DoctorRepositoryInMemory()
  }

  getPatientRepository(): IPatientsRepository {
    throw new Error('Method not implemented.')
  }

  getNurseRepository(): INurseRepository {
    throw new Error('Method not implemented.')
  }

  getPatientAssociationsRepository(): IPatientAssociationsRepository {
    return new PatientAssociationsRepositoryInMemory()
  }
}
