import { Nurse } from 'domain/entities/Nurse'

export interface INurseRepository {
  save(nurse: Nurse): Promise<void>
  getByCOREN(crm: string): Promise<Nurse>
  getByEmail(email: string): Promise<Nurse>
}
