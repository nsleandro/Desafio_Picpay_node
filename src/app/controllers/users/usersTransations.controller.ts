import { APIError } from "../../../@types/types";
import Users from "../../entities/Users.entity";
import UsersAccounts from "../../entities/UsersAccounts.entity";
import UsersTransations from "../../entities/UsersTransations.entity";
import Database from "../../services/dataBase/database";
import { UsersTypeDocumentEnum } from "../../services/enum/users.enum";
import { UserTransationsSchema } from "../../services/schemas/usersTransations.schema";

const idFileApiError = 'UST'

export async function saveUserTransations(schema: UserTransationsSchema, manager = Database.getManager()) {
    const usersFinds = await Users.find({
        where: [
            { id: schema.payerId },
            { id: schema.receiverId }
        ]
    })

    const payer = usersFinds.find(v => v.id === schema.payerId)
    const receiver = usersFinds.find(v => v.id === schema.receiverId)

    if (!payer) throw new APIError(
        'User payer not find!',
        idFileApiError + '001',
        'User payer not find!',
        404,
        { payerId: schema.payerId }
    )

    if (payer.typeDocument === UsersTypeDocumentEnum.CNPJ) throw new APIError(
        'This user cannot transfer!',
        idFileApiError + '002',
        'This user cannot transfer, as he is a CNPJ',
        422,
        { payerId: schema.payerId }
    )

    if (!receiver) throw new APIError(
        'User receiver not find!',
        idFileApiError + '003',
        'User receiver not find!',
        404,
        { receiverId: schema.receiverId }
    )

    const usersAccount = await UsersAccounts.find({
        where: [
            { userId: schema.payerId },
            { userId: schema.receiverId }
        ]
    })

    const payerAccount = usersAccount.find(v => v.userId === schema.payerId)
    const receiverAccount = usersAccount.find(v => v.userId === schema.receiverId)

    if (!payerAccount) throw new APIError(
        'Accout payer not find!',
        idFileApiError + '004',
        'User payer not find!',
        404,
        { payerId: schema.payerId }
    )

    if (!receiverAccount) throw new APIError(
        'Accout receiver not find!',
        idFileApiError + '005',
        'User receiver not find!',
        404,
        { receiverId: schema.receiverId }
    )

    if (payerAccount.balance < schema.value) throw new APIError(
        'insufficient funds!',
        idFileApiError + '006',
        'insufficient funds!',
        422,
        { balance: schema.value }
    )

    const resultTransation = await manager.transaction(async managerTransaction => {
        await managerTransaction.update(UsersAccounts, {
            userId: payer.id,
            id: payerAccount.id
        }, {
            balance: payerAccount.balance - schema.value
        })

        await managerTransaction.update(UsersAccounts, {
            userId: receiver.id,
            id: receiverAccount.id
        }, {
            balance: receiverAccount.balance + schema.value
        })

        const create = UsersTransations.create({
            payerAccountId: payerAccount.id,
            receiverAccountId: receiverAccount.id,
            balance: schema.value
        })

        const result = await managerTransaction.save(create)

        return result
    })

    return resultTransation
}