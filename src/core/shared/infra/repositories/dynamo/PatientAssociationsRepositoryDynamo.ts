import { PatientAssociation } from 'domain/entities/PatientAssociation'
// import {} from 'domain/repositories/IPatientAssociationsRepository'
import {
  IPatientAssociationsRepository,
  IFindByProfessional
} from 'domain/repositories/IPatientAssociationsRepository'
import { DynamoProvider } from 'shared/infra/providers/dynamo/DynamoProvider'
import { LoggerInterface } from 'shared/infra/logger/logger.interface'

export class PatientAssociationsRepositoryDynamo
  implements IPatientAssociationsRepository
{
  dynamoProvider: DynamoProvider
  logger: LoggerInterface

  constructor(logger: LoggerInterface) {
    this.dynamoProvider = new DynamoProvider(logger)
    this.logger = logger
  }

  async findManyByPatientId(id: string): Promise<PatientAssociation[]> {
    this.logger.info({ message: 'INIT findManyByPatientId' })
    const queryParams = {
      TableName: 'patientAssociations',
      IndexName: 'PatientIndex',
      KeyConditionExpression: 'patientId = :patientId',
      ExpressionAttributeValues: {
        ':patientId': id
      }
    }

    this.logger.info({ message: 'QUARING patientAssociation' })
    const patientAssociations = await this.dynamoProvider.query(queryParams)

    this.logger.info({ message: 'FINISH findManyByPatientId' })
    return patientAssociations.Items as PatientAssociation[]
  }

  async findByProfessionalId({
    professionalId
  }: IFindByProfessional): Promise<PatientAssociation[]> {
    this.logger.info({ message: 'INIT findByProfessionalId' })
    const queryParams = {
      TableName: 'patientAssociations',
      IndexName: 'professionalIndex',
      KeyConditionExpression: 'professionalId = :professionalId',
      ExpressionAttributeValues: {
        ':professionalId': professionalId
      }
    }

    this.logger.info({ message: 'QUARING patientAssociation' })
    const patientAssociations = await this.dynamoProvider.query(queryParams)

    this.logger.info({ message: 'FINISH findByProfessionalId' })
    return patientAssociations.Items as PatientAssociation[]
  }

  async save(patientAssociation: PatientAssociation): Promise<void> {
    this.logger.info({ message: 'INIT save' })
    const putItemParams = {
      TableName: 'patientAssociations',
      Item: patientAssociation
    }

    this.logger.info({ message: 'PUTING patientAssociation' })
    await this.dynamoProvider.put(putItemParams)

    this.logger.info({ message: 'FINISH save' })
  }

  async delete(patientAssociationId: string): Promise<void> {
    this.logger.info({ message: 'INIT delete' })
    const deleteParams = {
      TableName: 'patientAssociations',
      Key: {
        id: patientAssociationId
      },
      ReturnValues: 'ALL_OLD'
    }

    this.logger.info({ message: 'DELETING patientAssociation' })
    await this.dynamoProvider.delete(deleteParams)

    this.logger.info({ message: 'FINISH delete' })
  }
}
