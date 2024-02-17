import express from "express";
import usersRouter from './usersRouter'

const apiRouter = express.Router({ mergeParams: true })

apiRouter.use("/users", usersRouter)
apiRouter.use("/users/:id/transations", () => {
    console.log('aaaaaaaa')
})

apiRouter.use((err: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.statusCode || 500).send(err);
  });

 export default apiRouter
