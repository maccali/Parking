import { Admin } from '../../../../domain/entities/Admin';
import { IAdminRepository } from '../../../../domain/repositories/IAdminRepository';

export class AdminRepositoryInMemory implements IAdminRepository{
    admins: Admin[]

    constructor(){
        this.admins = [new Admin({
            'id': '123',
            'email': 'admin@example.com',
            'fullName': 'joao silva'
          })]
    }

    async findById(id: string): Promise<Admin> {
        return this.admins.find( a => a.id === id)
    }
    
    async save(admin: Admin): Promise<void> {
        this.admins.push(admin)
    }
    
}