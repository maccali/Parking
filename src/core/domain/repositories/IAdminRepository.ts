import { Admin } from 'domain/entities/Admin'

export interface IAdminRepository {
  findById(id: string): Promise<Admin>
  save(admin: Admin): Promise<void>
}
