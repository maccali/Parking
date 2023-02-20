import { PatientAssociation } from 'domain/entities/PatientAssociation'

export interface IFindByProfessional {
  professionalId: string
}
export interface IPatientAssociationsRepository {
  findManyByPatientId(id: string): Promise<PatientAssociation[]>
  findByProfessionalId({
    professionalId
  }: IFindByProfessional): Promise<PatientAssociation[]>
  save(patientAssociation: PatientAssociation): Promise<void>
  delete(patientAssociationId: string): Promise<void>
}
