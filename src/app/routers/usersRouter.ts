import { plainToInstance } from "class-transformer";
import express from "express";
import { deleteUser, getUser, getUsers, saveUser } from "../controllers/users/users.controller";
import { UserSchema } from "../services/schemas/users.schema";
import { validateAndThrow } from "../services/schemas/validateAndThrow";

const userRouter = express.Router({ mergeParams: true });

userRouter.get('/',
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const users = await getUsers()
            res.status(200).json(users)
        }
        catch (error) {
            next(error);
        }
    }
)

userRouter.get('/:id',
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const id = +req.params.id
            const users = await getUser(id)
            res.status(200).json(users)
        }
        catch (error) {
            next(error);
        }
    }
)

userRouter.post('/',
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const schema = plainToInstance(UserSchema, req.body.user)
            await validateAndThrow(schema)
            next(schema)
        } catch (error) {
            res.status(422).json(error)
        }
    },
    async (schema: UserSchema, _req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const result = await saveUser(schema)
            res.status(200).json(result)
        }
        catch (error) {
            next(error);
        }
    }
)

userRouter.delete('/:id',
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const id = +req.params.id
        const users = await deleteUser(id)
        res.status(200).json(users)
    })

export default userRouter
