import { IsNotEmpty, IsNumber } from "class-validator"

export class UserTransationsSchema {
    @IsNotEmpty()
    @IsNumber()
    payerId!: number

    @IsNotEmpty()
    @IsNumber()
    receiverId!: number

    @IsNumber()
    value!: number
}