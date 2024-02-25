import { plainToInstance } from "class-transformer"
import express from "express"
import { saveUserTransations } from "../controllers/users/usersTransations.controller"
import { UserTransationsSchema } from "../services/schemas/usersTransations.schema"
import { validateAndThrow } from "../services/schemas/validateAndThrow"

const userTransationsRouter = express.Router({ mergeParams: true })

userTransationsRouter.post('/',
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const schema = plainToInstance(UserTransationsSchema, req.body.transation)
            await validateAndThrow(schema)
            next(schema)
        } catch (error) {
            res.status(422).json(error)
        }
    },
    async (schema: UserTransationsSchema, _req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const result = await saveUserTransations(schema)
            res.status(200).json(result)
        }
        catch (error) {
            next(error);
        }
    }
)

export default userTransationsRouter
