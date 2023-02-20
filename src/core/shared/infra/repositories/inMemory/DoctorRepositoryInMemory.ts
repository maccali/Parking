import { Doctor } from '../../../../domain/entities/Doctor';
import { IDoctorRepository } from '../../../../domain/repositories/IDoctorRepository';

export class DoctorRepositoryInMemory implements IDoctorRepository {
    doctors: Doctor[]

    constructor() {
        this.doctors = [new Doctor({
            'id': '123',
            'email': 'Doctor@example.com',
            'fullName': 'joao silva',
            'crm': '123'
          })]
}

    async save(doctor: Doctor): Promise < void> {
    this.doctors.push(doctor)
}

    async findByCRM(crm: string): Promise < Doctor > {
    return this.doctors.find(d => d.crm === crm)
}

}