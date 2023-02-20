import DynamoDB, { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { IDynamoProvider } from 'domain/providers/IDynamoProvider'
import { document } from 'shared/infra/database/dynamoDB/dynamodbClient'
import { PromiseResult } from 'aws-sdk/lib/request'
import { AWSError } from 'aws-sdk'
import { LoggerInterface } from 'shared/infra/logger/logger.interface'

export class DynamoProvider implements IDynamoProvider {
  dynamoClient: DynamoDB.DocumentClient
  logger: LoggerInterface

  constructor(logger: LoggerInterface) {
    this.dynamoClient = document
    this.logger = logger
  }

  async put(
    putItemsParams: DynamoDB.DocumentClient.PutItemInput
  ): Promise<PromiseResult<DynamoDB.DocumentClient.PutItemOutput, AWSError>> {
    this.logger.info({ message: 'INIT END put' })
    return await this.dynamoClient.put(putItemsParams).promise()
  }

  async query(
    queryParams: DocumentClient.QueryInput
  ): Promise<PromiseResult<DocumentClient.QueryOutput, AWSError>> {
    this.logger.info({ message: 'INIT END put' })
    return await this.dynamoClient.query(queryParams).promise()
  }

  async scan(
    scanParams: DocumentClient.ScanInput
  ): Promise<PromiseResult<DocumentClient.ScanOutput, AWSError>> {
    this.logger.info({ message: 'INIT END put' })
    return await this.dynamoClient.scan(scanParams).promise()
  }

  async delete(
    deleteItemsParams: DynamoDB.DocumentClient.DeleteItemInput
  ): Promise<
    PromiseResult<DynamoDB.DocumentClient.DeleteItemOutput, AWSError>
  > {
    this.logger.info({ message: 'INIT END delete' })
    return await this.dynamoClient.delete(deleteItemsParams).promise()
  }
}
