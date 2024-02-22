import { plainToInstance } from "class-transformer";
import crypto from "crypto";
import { APIError } from "../../../@types/types";
import AccountBank from "../../entities/AccountBank.entity";
import Users from "../../entities/Users.entity";
import { UsersTypeDocumentEnum } from "../../services/enum/users.enum";
import { UserSchema } from "../../services/schemas/users.schema";

const idFileApiError = 'USR'

async function saveAccountBank(userId: number, balanceInital: number) {
    return await AccountBank.save({
        balance: balanceInital,
        userId
    })
}

export async function saveUser(userSchema: UserSchema) {
    const userFind = await Users.findOne({
        where: [
            {
                email: userSchema.email
            },
            {
                document: userSchema.document
            }
        ]
    })

    if (userFind) {
        const type = userFind.email === userSchema.email
        throw new APIError(
            type ? 'Email already in use!' : 'Document already in use!',
            idFileApiError + "001",
            type ? 'Document already in use!' : 'Document already in use!',
            409,
            userSchema
        )
    }

    userSchema.password = crypto.createHash('sha256').update(userSchema.password).digest('hex')
    userSchema.document = userSchema.document.replace(/[^0-9]/g, '')

    const plain = plainToInstance(Users, userSchema)
    const create = Users.create(plain)
    create.typeDocument = userSchema.document.length === 14 ? UsersTypeDocumentEnum.CNPJ : UsersTypeDocumentEnum.CPF

    const user = await Users.save(create)
    const accountsBank = await saveAccountBank(user.id, 2000)

    user.accountsBank = [
        accountsBank
    ]

    return user
}

export async function getUsers() {
    const users = await Users.find({
        relations: {
            accountsBank: true
        }
    })

    return users
}

export async function getUser(id: number) {
    const user = await Users.findOne({
        where: {
            id
        },
        relations: {
            accountsBank: true
        }
    })

    return user
}

export async function deleteUser(id: number) {
    const user = await getUser(id)
    if (!user) return false

    return await Users.delete(id)
}