import { PatientAssociation } from '../entities/PatientAssociation'

export interface ProfessionalsFinder {
  find(): Promise<any>
}
