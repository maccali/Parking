import { Doctor } from 'domain/entities/Doctor'

export interface IDoctorRepository {
  save(doctor: Doctor): Promise<void>
  findByCRM(crm: string): Promise<Doctor>
  findByEmail(email: string): Promise<Doctor>
}
