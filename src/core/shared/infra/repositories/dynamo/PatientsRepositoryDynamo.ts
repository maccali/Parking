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
import { IPatientsRepository } from 'domain/repositories/IPatientsRepository'
import { document } from 'shared/infra/database/dynamoDB/dynamodbClient'
import { EnvHelper } from 'shared/utils/envHelper'

import { LoggerInterface } from 'shared/infra/logger/logger.interface'

export class PatientsRepository implements IPatientsRepository {
  private dynamodb: DocumentClient
  private cognitoidentityserviceprovider: AWS.CognitoIdentityServiceProvider
  logger: LoggerInterface

  constructor(logger: LoggerInterface) {
    this.dynamodb = document
    this.cognitoidentityserviceprovider =
      new AWS.CognitoIdentityServiceProvider()
    this.logger = logger
  }

  async findById(patientId: string): Promise<Patient> {
    this.logger.info({ message: 'INIT findById' })
    const queryParams = {
      TableName: 'patients',
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': patientId
      }
    }
    const patient = await this.dynamodb.query(queryParams).promise()

    this.logger.info({ message: 'FINISH findById' })
    return patient.Items[0] as Patient
  }

  async findByRegistrationNumber(registrationNumber: string): Promise<Patient> {
    this.logger.info({ message: 'INIT findByRegistrationNumber' })
    const queryParams = {
      TableName: 'patients',
      IndexName: 'RegistrationNumberIndex',
      KeyConditionExpression: 'registrationNumber = :registrationNumber',
      ExpressionAttributeValues: {
        ':registrationNumber': registrationNumber
      }
    }
    const patient = await this.dynamodb.query(queryParams).promise()
    this.logger.info({ message: 'FINISH findByRegistrationNumber' })
    return patient.Items[0] as Patient
  }

  async save(patient: Patient): Promise<void> {
    this.logger.info({ message: 'INIT save' })
    const putItemParams = {
      TableName: 'patients',
      Item: patient
    }
    await this.dynamodb.put(putItemParams).promise()
    this.logger.info({ message: 'FINISH save' })
  }

  async findPatientOnCognito(
    patientId: string
  ): Promise<PromiseResult<ListUsersResponse, AWSError>> {
    this.logger.info({ message: 'INIT findPatientOnCognito' })
    const paramsCognito = {
      UserPoolId: EnvHelper.patientPoolId,
      Filter: `sub = "${patientId}"`
    }

    const usersCognito = await this.cognitoidentityserviceprovider
      .listUsers(paramsCognito)
      .promise()

    this.logger.info({ message: 'FINISH findPatientOnCognito' })
    return usersCognito
  }

  async createPatient(data: ICreatePatientDTO): Promise<void> {
    this.logger.info({ message: 'INIT createPatient' })
    const putItemParams = {
      TableName: 'patients',
      Item: data
    }

    await this.dynamodb.put(putItemParams).promise()
    this.logger.info({ message: 'FINISH createPatient' })
  }

  async getPatientsByDoctorId({
    doctorId,
    itemPageKey
  }: IGetPatientsByDoctorIdDTO): Promise<
    PromiseResult<DocumentClient.QueryOutput, AWSError>
  > {
    this.logger.info({ message: 'INIT getPatientsByDoctorId' })
    let queryParams = {
      TableName: 'patients',
      IndexName: 'DoctorIndex',
      ExclusiveStartKey: null,
      KeyConditionExpression: 'doctorId = :doctorId',
      FilterExpression: 'isActive = :isActive',
      ExpressionAttributeValues: {
        ':doctorId': doctorId,
        ':isActive': true
      }
    }

    if (itemPageKey) {
      queryParams = {
        ...queryParams,
        ExclusiveStartKey: { id: itemPageKey, doctorId }
      }
    }

    this.logger.info({ message: 'FINISH getPatientsByDoctorId' })
    return await this.dynamodb.query(queryParams).promise()
  }

  async editPatientTokenFCM(
    patientId,
    tokenFCM
  ): Promise<PromiseResult<DocumentClient.UpdateItemOutput, AWSError>> {
    this.logger.info({ message: 'INIT editPatientTokenFCM' })
    const updateParams = {
      TableName: 'patients',
      Key: {
        id: patientId
      },
      UpdateExpression: `set tokenFCM=:tokenFCM`,
      ExpressionAttributeValues: {
        ':tokenFCM': tokenFCM
      },
      ReturnValues: 'ALL_NEW'
    }

    this.logger.info({ message: 'FINISH editPatientTokenFCM' })
    return await this.dynamodb.update(updateParams).promise()
  }

  async updatePatient({
    patientId,
    fullName,
    cpf,
    gender,
    bornDate,
    number,
    address,
    street,
    neighborhood,
    city,
    state,
    zipCode,
    complement,
    weightKg,
    heightCm
  }): Promise<PromiseResult<DocumentClient.UpdateItemOutput, AWSError>> {
    this.logger.info({ message: 'INIT updatePatient' })
    const updateParams = {
      TableName: 'patients',
      Key: {
        id: patientId
      },
      ExpressionAttributeNames: {
        '#number': 'number'
      },
      UpdateExpression: `
      set address=:address, 
      zipCode=:zipCode, 
      complement=:complement, 
      street=:street,
      neighborhood=:neighborhood,
      city=:city,
      state=:state,
      fullName=:fullName,
      cpf=:cpf,
      gender=:gender,
      bornDate=:bornDate,
      heightCm=:heightCm,
      weightKg=:weightKg,
      #number=:number
              `,
      ExpressionAttributeValues: {
        ':address': address,
        ':zipCode': zipCode,
        ':complement': complement,
        ':street': street,
        ':neighborhood': neighborhood,
        ':city': city,
        ':state': state,
        ':fullName': fullName,
        ':cpf': cpf,
        ':gender': gender,
        ':bornDate': bornDate,
        ':heightCm': heightCm,
        ':weightKg': weightKg,
        ':number': number
      },
      ReturnValues: 'ALL_NEW'
    }
    this.logger.info({ message: 'FINISH updatePatient' })
    return await this.dynamodb.update(updateParams).promise()
  }

  async softDeletePatient({
    patientId
  }): Promise<PromiseResult<DocumentClient.UpdateItemOutput, AWSError>> {
    this.logger.info({ message: 'INIT softDeletePatient' })
    const updateParams = {
      TableName: 'patients',
      Key: {
        id: patientId
      },
      UpdateExpression: 'set isActive = :isActive',
      ExpressionAttributeValues: {
        ':isActive': false
      },
      ReturnValues: 'ALL_NEW'
    }

    this.logger.info({ message: 'FINISH softDeletePatient' })
    return await this.dynamodb.update(updateParams).promise()
  }

  async getPatientIntel(
    patientId: string
  ): Promise<IGetPatatientIntelResponseDTO> {
    this.logger.info({ message: 'INIT getPatientIntel' })
    const queryParams = {
      TableName: 'patients',
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': patientId
      }
    }
    const queryParamsContact = {
      TableName: 'patientContacts',
      IndexName: 'PatientIndex',
      KeyConditionExpression: 'patientId = :patientId',
      ExpressionAttributeValues: {
        ':patientId': patientId
      }
    }
    const queryParamsDisease = {
      TableName: 'patientDiseases',
      IndexName: 'PatientIndex',
      KeyConditionExpression: 'patientId = :patientId',
      ExpressionAttributeValues: {
        ':patientId': patientId
      }
    }

    const patient = await this.dynamodb.query(queryParams).promise()
    const contacts = await this.dynamodb.query(queryParamsContact).promise()
    const diseases = await this.dynamodb.query(queryParamsDisease).promise()

    this.logger.info({ message: 'FINISH getPatientIntel' })
    return {
      patient,
      contacts,
      diseases
    }
  }
  async getPatient(patientId: string): Promise<IGetPatatientIntelResponseDTO> {
    this.logger.info({ message: 'INIT getPatient' })
    const queryParams = {
      TableName: 'patients',
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': patientId
      }
    }

    const patient = await this.dynamodb.query(queryParams).promise()

    this.logger.info({ message: 'FINISH getPatient' })
    return { ...patient.Items[0] }
  }

  async unlinkPatient({
    doctorId,
    patientId
  }): Promise<
    PromiseResult<AWS.DynamoDB.DocumentClient.UpdateItemOutput, AWS.AWSError>
  > {
    this.logger.info({ message: 'INIT unlinkPatient' })
    // UNLINK FROM PATIENT
    const queryParams = {
      TableName: 'patients',
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': patientId
      }
    }

    this.logger.info({ message: 'QUERING patient' })
    const patient = await this.dynamodb.query(queryParams).promise()

    let doctors = []
    if (typeof patient.Items[0].doctors !== 'undefined') {
      doctors = patient.Items[0].doctors
      doctors = doctors.filter(item => {
        if (item.doctorId !== doctorId) {
          return item
        }
      })
    }

    const updateParams = {
      TableName: 'patients',
      Key: {
        id: patientId
      },
      UpdateExpression: 'set doctors = :doctors',
      ExpressionAttributeValues: {
        ':doctors': doctors
      },
      ReturnValues: 'ALL_NEW'
    }

    this.logger.info({ message: 'UPDATING patient' })
    const finalPatient = await this.dynamodb.update(updateParams).promise()

    // UNLINK FROM DOCTOR
    const queryParamsDoctor = {
      TableName: 'doctors',
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': doctorId
      }
    }
    this.logger.info({ message: 'QUARING Doctor' })
    const doctor = await this.dynamodb.query(queryParamsDoctor).promise()

    let patients = []
    if (typeof doctor.Items[0].patients === 'undefined') {
      // patients = [{ doctorId: doctorId }]
    } else {
      patients = doctor.Items[0].patients
      patients = patients.filter(item => {
        if (item.id !== patientId) {
          return item
        }
      })
    }

    const updateParamsDoctor = {
      TableName: 'doctors',
      Key: {
        id: doctorId
      },
      UpdateExpression: 'set patients = :patients',
      ExpressionAttributeValues: {
        ':patients': patients
      },
      ReturnValues: 'ALL_NEW'
    }

    this.logger.info({ message: 'UPDATING Doctor' })
    const finalDoctor = await this.dynamodb.update(updateParamsDoctor).promise()

    this.logger.info({ message: 'FINISH unlinkPatient' })
    return {
      requires: {
        doctorId,
        patientId
      },
      doctorsInPatient: finalPatient.Attributes.doctors,
      patientsInDoctor: finalDoctor.Attributes.patients
    }
  }

  async linkToDoctor({
    patientId,
    doctorId
  }): Promise<
    PromiseResult<AWS.DynamoDB.DocumentClient.UpdateItemOutput, AWS.AWSError>
  > {
    this.logger.info({ message: 'INIT linkToDoctor' })

    // ADD TO PATIENTS
    let doctors = []
    const queryParams = {
      TableName: 'patients',
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': patientId
      }
    }
    this.logger.info({ message: 'QUERING patient' })
    const patient = await this.dynamodb.query(queryParams).promise()

    if (typeof patient.Items[0].doctors === 'undefined') {
      doctors = [{ doctorId: doctorId }]
    } else {
      doctors = patient.Items[0].doctors
      doctors.map(item => {
        if (item.doctorId === doctorId) {
          throw new Error('Patient already linked')
        }
      })
      doctors.push({ doctorId: doctorId })
    }

    const updateParams = {
      TableName: 'patients',
      Key: {
        id: patientId
      },
      UpdateExpression: 'set doctors = :doctors',
      ExpressionAttributeValues: {
        ':doctors': doctors
      },
      ReturnValues: 'ALL_NEW'
    }

    this.logger.info({ message: 'UPDATING patient' })
    const finalPatient = await this.dynamodb.update(updateParams).promise()

    // ADD TO DOCTORS
    let patients = []

    const queryParamsDoctor = {
      TableName: 'doctors',
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': doctorId
      }
    }
    this.logger.info({ message: 'QUERING doctor' })
    const doctor = await this.dynamodb.query(queryParamsDoctor).promise()

    if (typeof doctor.Items[0].patients === 'undefined') {
      patients = [{ id: patient.Items[0].id }]
    } else {
      patients = doctor.Items[0].patients
      patients.map(item => {
        if (item.id === patientId) {
          throw new Error('Doctor already linked')
        }
      })
      patients.push({ id: patient.Items[0].id })
    }

    const updateParamsDoctors = {
      TableName: 'doctors',
      Key: {
        id: doctorId
      },
      UpdateExpression: 'set patients = :patients',
      ExpressionAttributeValues: {
        ':patients': patients
      },
      ReturnValues: 'ALL_NEW'
    }

    this.logger.info({ message: 'UPDATING doctor' })
    const finalDoctor = await this.dynamodb
      .update(updateParamsDoctors)
      .promise()

    this.logger.info({ message: 'FINISH linkToDoctor' })
    return {
      requires: {
        doctorId,
        patientId
      },
      doctorsInPatient: finalPatient.Attributes.doctors,
      patientsInDoctor: finalDoctor.Attributes.patients
    }
  }
}
