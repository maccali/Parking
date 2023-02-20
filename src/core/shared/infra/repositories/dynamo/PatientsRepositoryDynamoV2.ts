import AWS, { AWSError } from 'aws-sdk'
import { ListUsersResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { PromiseResult } from 'aws-sdk/lib/request'

import { ICreatePatientDTO } from 'app/dtos/ICreatePatientDTO'
import {
  IGetPatatientIntelResponseDTO,
  IGetPatientsByDoctorIdDTO
} from 'app/dtos/IGetPatientsDTOs'
import { Patient } from 'domain/entities/Patient'
import { IPatientsRepositoryV2 } from 'domain/repositories/IPatientsRepositoryV2'
import { document } from 'shared/infra/database/dynamoDB/dynamodbClient'
import { EnvHelper } from 'shared/utils/envHelper'

import { LoggerInterface } from 'shared/infra/logger/logger.interface'
import { DynamoProvider } from '../../providers/dynamo/DynamoProvider'

export class PatientsRepositoryV2 implements IPatientsRepositoryV2 {
  dynamoProvider: DynamoProvider
  private cognitoidentityserviceprovider: AWS.CognitoIdentityServiceProvider
  logger: LoggerInterface

  constructor(logger: LoggerInterface) {
    this.dynamoProvider = new DynamoProvider(logger)
    this.cognitoidentityserviceprovider =
      new AWS.CognitoIdentityServiceProvider()
    this.logger = logger
  }

  async findAll(): Promise<Array<Patient>> {
    this.logger.info({ message: 'INIT findById' })
    const queryParams = {
      TableName: 'patients'
    }
    const patient = await this.dynamoProvider.scan(queryParams)

    let arrayItems = patient.Items
    let lastKey = patient.LastEvaluatedKey

    while (lastKey !== undefined) {
      const query = {
        ...queryParams,
        ExclusiveStartKey: lastKey
      }

      const patients2 = await this.dynamoProvider.scan(query)

      lastKey = patients2.LastEvaluatedKey

      arrayItems = [...arrayItems, ...patients2.Items]
    }

    this.logger.info({ message: 'FINISH findById' })
    return arrayItems as Patient[]
  }
}
