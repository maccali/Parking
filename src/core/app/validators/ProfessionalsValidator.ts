import { IsEnum, IsOptional, validate } from 'class-validator'

enum ProfessionalType {
  'doctor',
  'nurse'
}

export class ProfessionalsValidator {
  @IsOptional()
  @IsEnum(ProfessionalType, { each: true })
  professionalType: string

  constructor(professionalType: string) {
    this.professionalType = professionalType
  }

  async validateData(professionalType: ProfessionalsValidator) {
    await validate(professionalType).then(errors => {
      if (!errors.length) {
        return
      }
      const messages = []
      errors.forEach(error => {
        messages.push(`${JSON.stringify(error.constraints)}`)
      })
      throw new Error(messages.toString())
    })
  }
}
