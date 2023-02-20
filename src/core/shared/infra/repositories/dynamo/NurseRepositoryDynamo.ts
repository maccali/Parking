import { Nurse } from 'domain/entities/Nurse'
import { INurseRepository } from 'domain/repositories/INurseRepository'
import { DynamoProvider } from 'shared/infra/providers/dynamo/DynamoProvider'

import { LoggerInterface } from 'shared/infra/logger/logger.interface'
export class NurseRepositoryDynamo implements INurseRepository {
  dynamoProvider: DynamoProvider
  logger: LoggerInterface

  constructor(logger: LoggerInterface) {
    this.dynamoProvider = new DynamoProvider(logger)
    this.logger = logger
  }

  async save(nurse: Nurse): Promise<void> {
    this.logger.info({ message: 'INIT save' })
    const putItemParams = {
      TableName: 'nurses',
      Item: nurse
    }

    this.logger.info({ message: 'PUTING nurse' })
    await this.dynamoProvider.put(putItemParams)

    this.logger.info({ message: 'FINISH save' })
  }

  async getByCOREN(coren: string): Promise<Nurse> {
    this.logger.info({ message: 'INIT getByCOREN' })
    const queryParams = {
      TableName: 'nurses',
      IndexName: 'CORENIndex',
      KeyConditionExpression: 'coren = :coren',
      ExpressionAttributeValues: {
        ':coren': coren
      }
    }

    this.logger.info({ message: 'QUARING nurse' })
    const nurse = await this.dynamoProvider.query(queryParams)

    this.logger.info({ message: 'FINISH getByCOREN' })
    return nurse.Items[0] as Nurse
  }

  async getByEmail(email: string): Promise<Nurse> {
    this.logger.info({ message: 'INIT getByEmail' })
    const queryParams = {
      TableName: 'nurses',
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email
      }
    }

    this.logger.info({ message: 'QUARING nurse' })
    const nurse = await this.dynamoProvider.query(queryParams)

    this.logger.info({ message: 'FINISH getByEmail' })
    return nurse.Items[0] as Nurse
  }

  async findNurseById(nurseId: string): Promise<Nurse> {
    this.logger.info({ message: 'INIT findNurseById' })
    const queryParamsNurse = {
      TableName: 'nurses',
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': nurseId
      }
    }

    this.logger.info({ message: 'QUARING nurse' })
    const nurse = await this.dynamoProvider.query(queryParamsNurse)

    this.logger.info({ message: 'FINISH findNurseById' })
    return nurse.Items[0] as Nurse
  }
}
