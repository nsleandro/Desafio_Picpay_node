import { plainToInstance } from "class-transformer";
import crypto from "crypto";
import { APIError } from "../../../@types/types";
import Users from "../../entities/Users.entity";
import UsersAccounts from "../../entities/UsersAccounts.entity";
import Database from "../../services/dataBase/database";
import { UsersTypeDocumentEnum } from "../../services/enum/users.enum";
import { UserSchema } from "../../services/schemas/users.schema";
import { Like } from "typeorm";

const idFileApiError = 'USR'

async function saveAccountBank(userId: number, balanceInital: number, manager = Database.getManager()) {
    return await manager.save(UsersAccounts, {
        balance: balanceInital,
        userId
    })
}

export async function saveUser(userSchema: UserSchema, manager = Database.getManager()) {
    userSchema.password = crypto.createHash('sha256').update(userSchema.password).digest('hex')
    userSchema.document = userSchema.document.replace(/[^0-9]/g, '')

    const userFind = await manager.findOne(Users, {
        where: [
            {
                email: Like(userSchema.email)
            },
            {
                document: Like(userSchema.document)
            }
        ]
    })

    if (userFind) {
        const isEmail = userFind.email === userSchema.email
        throw new APIError(
            isEmail ? 'Email already in use!' : 'Document already in use!',
            idFileApiError + (isEmail ? "001" : "002"),
            isEmail ? 'Document already in use!' : 'Document already in use!',
            409,
            userSchema
        )
    }

    const plain = plainToInstance(Users, userSchema)
    const create = Users.create(plain)
    create.typeDocument = userSchema.document.length === 14 ? UsersTypeDocumentEnum.CNPJ : UsersTypeDocumentEnum.CPF

    const user = await manager.save(Users, create)
    const accountsBank = await saveAccountBank(user.id, 2000, manager)

    user.usersAccounts = [
        accountsBank
    ]

    return user
}

export async function getUsers() {
    const users = await Users.find({
        relations: {
            usersAccounts: true
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
            usersAccounts: true
        }
    })

    return user
}

export async function deleteUser(id: number) {
    const user = await getUser(id)
    if (!user) return false

    return await Users.delete(id)
}