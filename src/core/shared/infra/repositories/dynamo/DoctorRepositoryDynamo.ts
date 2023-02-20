import { Doctor } from 'domain/entities/Doctor'
import { IDoctorRepository } from 'domain/repositories/IDoctorRepository'
import { DynamoProvider } from 'shared/infra/providers/dynamo/DynamoProvider'
import { LoggerInterface } from 'shared/infra/logger/logger.interface'
export class DoctorRepositoryDynamo implements IDoctorRepository {
  dynamoProvider: DynamoProvider
  logger: LoggerInterface

  constructor(logger: LoggerInterface) {
    this.dynamoProvider = new DynamoProvider(logger)
    this.logger = logger
  }

  async save(doctor: Doctor): Promise<void> {
    this.logger.info({ message: 'INIT save' })
    const putItemParams = {
      TableName: 'doctors',
      Item: doctor
    }

    this.logger.info({ message: 'PUTING doctor' })
    await this.dynamoProvider.put(putItemParams)

    this.logger.info({ message: 'FINISH save' })
  }

  async findByCRM(crm: string): Promise<Doctor> {
    this.logger.info({ message: 'INIT findByCRM' })
    const queryParams = {
      TableName: 'doctors',
      IndexName: 'CRMIndex',
      KeyConditionExpression: 'crm = :crm',
      ExpressionAttributeValues: {
        ':crm': crm
      }
    }

    this.logger.info({ message: 'QUERYNG doctor' })
    const doctor = await this.dynamoProvider.query(queryParams)

    this.logger.info({ message: 'FINISH findByCRM' })
    return doctor.Items[0] as Doctor
  }

  async findByEmail(email: string): Promise<Doctor> {
    this.logger.info({ message: 'INIT findByEmail' })
    const queryParams = {
      TableName: 'doctors',
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email
      }
    }

    this.logger.info({ message: 'QUERYNG doctor' })
    const doctor = await this.dynamoProvider.query(queryParams)

    this.logger.info({ message: 'FINISH findByEmail' })
    return doctor.Items[0] as Doctor
  }

  async findDoctorById(doctorId: string): Promise<Doctor> {
    this.logger.info({ message: 'INIT findDoctorById' })
    const queryParamsDoctor = {
      TableName: 'doctors',
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': doctorId
      }
    }

    this.logger.info({ message: 'QUERYNG doctor' })
    const doctor = await this.dynamoProvider.query(queryParamsDoctor)

    this.logger.info({ message: 'FINISH findDoctorById' })
    return doctor.Items[0] as Doctor
  }
}
