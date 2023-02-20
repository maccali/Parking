import { PatientAssociation } from "domain/entities/PatientAssociation";
import { IPatientAssociationsRepository } from "domain/repositories/IPatientAssociationsRepository";

export class PatientAssociationsRepositoryInMemory implements IPatientAssociationsRepository {
    patientAssociations: PatientAssociation[]

    constructor() {
        this.patientAssociations = [
            new PatientAssociation({
                "id": "123",
                "patientId": "123",
                "professionalId": "123",
                "professionalType": "doctor",
            })
        ]
    }

    async findManyByPatientId(id: string): Promise<PatientAssociation[]> {
        return this.patientAssociations.filter(pa => pa.patientId === id)
    }

    async findByProfessionalId(id: string): Promise<PatientAssociation[]> {
        return this.patientAssociations.filter(pa => pa.professionalId === id)
    }

    async save(patientAssociation: PatientAssociation): Promise<void> {
        this.patientAssociations.push(patientAssociation)
    }

    async delete(patientAssociationId: string): Promise<void> {
        const index = this.patientAssociations.findIndex(pa => pa.id === patientAssociationId)
        this.patientAssociations.slice(index, 1)
    }
}