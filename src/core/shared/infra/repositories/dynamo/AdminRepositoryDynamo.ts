import { Admin } from 'domain/entities/Admin'
import { IAdminRepository } from 'domain/repositories/IAdminRepository'
import { LoggerInterface } from 'shared/infra/logger/logger.interface'
import { DynamoProvider } from 'shared/infra/providers/dynamo/DynamoProvider'
export class AdminRepositoryDynamo implements IAdminRepository {
  dynamoProvider: DynamoProvider
  logger: LoggerInterface

  constructor(logger: LoggerInterface) {
    this.dynamoProvider = new DynamoProvider(logger)
    this.logger = logger
  }

  async save(admin: Admin): Promise<void> {
    this.logger.info({ message: 'INIT save' })
    const putItemParams = {
      TableName: 'admins',
      Item: admin
    }

    this.logger.info({ message: 'PUTING admin' })
    await this.dynamoProvider.put(putItemParams)

    this.logger.info({ message: 'FINISH save' })
  }

  async findById(id: string): Promise<Admin> {
    this.logger.info({ message: 'INIT findById' })
    const queryParams = {
      TableName: 'admins',
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': id
      }
    }

    this.logger.info({ message: 'QUERING admin' })
    const admin = await this.dynamoProvider.query(queryParams)

    this.logger.info({ message: 'FINISH findById' })
    return admin.Items[0] as Admin
  }
}
