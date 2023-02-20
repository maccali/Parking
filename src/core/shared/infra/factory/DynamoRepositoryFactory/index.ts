import { IAdminRepository } from 'domain/repositories/IAdminRepository'
import { IDoctorRepository } from 'domain/repositories/IDoctorRepository'
import { AdminRepositoryDynamo } from 'shared/infra//repositories/dynamo/AdminRepositoryDynamo'
import { DoctorRepositoryDynamo } from 'shared/infra//repositories/dynamo/DoctorRepositoryDynamo'
import { AbstractRepositoryFactory } from 'domain/factory/AbstractRepositoryFactory'
import { IPatientsRepository } from 'domain/repositories/IPatientsRepository'
import { IPatientsRepositoryV2 } from 'domain/repositories/IPatientsRepositoryV2'
import { PatientsRepository } from 'shared/infra/repositories/dynamo/PatientsRepositoryDynamo'
import { PatientsRepositoryV2 } from 'shared/infra/repositories/dynamo/PatientsRepositoryDynamoV2'
import { INurseRepository } from 'domain/repositories/INurseRepository'
import { NurseRepositoryDynamo } from 'shared/infra/repositories/dynamo/NurseRepositoryDynamo'
import { IPatientAssociationsRepository } from 'domain/repositories/IPatientAssociationsRepository'
import { PatientAssociationsRepositoryDynamo } from 'shared/infra/repositories/dynamo/PatientAssociationsRepositoryDynamo'
import { LoggerInterface } from 'shared/infra/logger/logger.interface'
export class DynamoRepositoryFactory extends AbstractRepositoryFactory {
  logger: LoggerInterface

  constructor(logger: LoggerInterface) {
    super(logger)
    this.logger = logger
  }

  getAdminRepository(): IAdminRepository {
    return new AdminRepositoryDynamo(this.logger)
  }

  getDoctorRepository(): IDoctorRepository {
    return new DoctorRepositoryDynamo(this.logger)
  }

  getPatientRepository(): IPatientsRepository {
    return new PatientsRepository(this.logger)
  }

  getPatientRepositoryV2(): IPatientsRepositoryV2 {
    return new PatientsRepositoryV2(this.logger)
  }

  getNurseRepository(): INurseRepository {
    return new NurseRepositoryDynamo(this.logger)
  }

  getPatientAssociationsRepository(): IPatientAssociationsRepository {
    return new PatientAssociationsRepositoryDynamo(this.logger)
  }
}
