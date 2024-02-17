import { IsEmail, IsNotEmpty, IsString, Length, Validate, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { testaCPF, validCNPJ } from "../utils/validDocuments.util";

@ValidatorConstraint({
    name: 'CPFORCNPJ',
    async: false
})
class CpfOrCnpj implements ValidatorConstraintInterface {
    validate(value: string) {
        value = value.replace(/[^0-9]/g, '')
        const len = value.length

        if(!(len === 11 || len === 14)) return false

        return testaCPF(value) || validCNPJ(value)
    }

    defaultMessage() {
        return 'Cpf or Cnpj invalid!'
    }
}

export class UserSchema {
    @IsNotEmpty()
    @Length(2, 255)
    name!: string

    @IsNotEmpty()
    @Length(8, 24)
    @IsString()
    password!: string

    @IsEmail()
    email!: string

    @IsNotEmpty()
    @Length(10, 14)
    @IsString()
    @Validate(CpfOrCnpj)
    document!: string
}