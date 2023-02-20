import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MinLength,
  validate
} from 'class-validator'
import { left, right } from 'shared/either'
import { GenericLeftSolver } from 'shared/solvers/left/genericLeftSolver'
import { GenericRightSolver } from 'shared/solvers/right/genericRightSolver'

enum Gender {
  'MALE',
  'FEMALE'
}

export class PatientValidator {
  @IsString()
  registrationNumber: string

  @IsString()
  fullName: string

  @IsString()
  @MinLength(8)
  password: string

  @IsOptional()
  @IsEmail()
  email: string

  @IsOptional()
  @IsEnum(Gender, { each: true })
  gender: string

  @IsOptional()
  @IsDateString()
  bornDate: string

  @IsOptional()
  @IsNumber()
  heightCm: number

  @IsOptional()
  @IsNumber()
  weightKg: number

  @IsOptional()
  @Matches(
    /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/,
    {
      message: 'Invalid CPF format'
    }
  )
  cpf: string

  @IsOptional()
  @IsString()
  address: string

  @IsOptional()
  @IsString()
  street: string

  @IsOptional()
  @IsString()
  city: string

  @IsOptional()
  @IsString()
  neighborhood: string

  @IsOptional()
  @IsString()
  state: string

  @IsOptional()
  @IsString()
  complement: string

  @IsOptional()
  @IsString()
  zipCode: string

  @IsOptional()
  @IsString()
  number: string

  constructor({
    registrationNumber,
    fullName,
    password,
    bornDate,
    heightCm,
    weightKg,
    cpf,
    email,
    gender,
    address,
    street,
    city,
    neighborhood,
    state,
    number,
    zipCode,
    complement
  }: PatientValidator) {
    this.email = email
    this.password = password
    this.heightCm = heightCm
    this.weightKg = weightKg
    this.registrationNumber = registrationNumber
    this.bornDate = bornDate
    this.cpf = cpf
    this.fullName = fullName
    this.gender = gender

    this.address = address
    this.street = street
    this.city = city
    this.neighborhood = neighborhood
    this.state = state
    this.number = number
    this.zipCode = zipCode
    this.complement = complement
  }

  async validateData(patient: PatientValidator) {
    const errors = await validate(patient)

    if (!errors.length) {
      return right(GenericRightSolver.successValidation())
    }

    const messages = []
    errors.forEach(error => {
      messages.push({
        field: error.property,
        message: Object.values(error.constraints)[0],
        validation: error.target[error.property]
      })
    })

    return left(GenericLeftSolver.invalidRequest(messages))
  }
}
