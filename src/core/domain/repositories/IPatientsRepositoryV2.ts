import { Patient } from 'domain/entities/Patient'

export interface IPatientsRepositoryV2 {
  findAll(): Promise<Array<Patient>>
}
