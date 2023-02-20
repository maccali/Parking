import { ICreatePatientDTO } from 'app/dtos/ICreatePatientDTO'
import {
  IGetPatatientIntelResponseDTO,
  IGetPatientsByDoctorIdDTO
} from 'app/dtos/IGetPatientsDTOs'
import AWS, { AWSError } from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { PromiseResult } from 'aws-sdk/lib/request'
import { Patient } from 'domain/entities/Patient'

export interface IPatientsRepository {
  save(patient: Patient): Promise<void>
  findById(patientId: string): Promise<Patient>
  findByRegistrationNumber(registrationNumber: string): Promise<Patient>
  findPatientOnCognito(
    patientId: string
  ): Promise<
    PromiseResult<
      AWS.CognitoIdentityServiceProvider.ListUsersResponse,
      AWSError
    >
  >
  createPatient(data: ICreatePatientDTO): Promise<void>
  getPatientsByDoctorId({
    doctorId,
    itemPageKey
  }: IGetPatientsByDoctorIdDTO): Promise<
    PromiseResult<DocumentClient.QueryOutput, AWSError>
  >

  editPatientTokenFCM(
    patientId,
    tokenFCM
  ): Promise<PromiseResult<DocumentClient.UpdateItemOutput, AWSError>>

  updatePatient({
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
    complement
  }): Promise<PromiseResult<DocumentClient.UpdateItemOutput, AWSError>>

  getPatientIntel(patientId: string): Promise<IGetPatatientIntelResponseDTO>
  softDeletePatient({
    patientId
  }): Promise<PromiseResult<DocumentClient.UpdateItemOutput, AWSError>>
  unlinkPatient({
    patientId
  }): Promise<PromiseResult<DocumentClient.UpdateItemOutput, AWSError>>
  linkToDoctor({
    patientId,
    doctorId
  }): Promise<PromiseResult<DocumentClient.UpdateItemOutput, AWSError>>
}
