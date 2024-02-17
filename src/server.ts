import express from "express"
import routerIndex from './app/routers/routerIndex'
import Database from "./app/services/dataBase/database"
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger.json'

require("custom-env").env(true);


const app = express()
const port = process.env.PORT || 8081

app.use(express.json())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/v1', routerIndex)

Database.Init().then(() => {
    app.listen(port, () => { console.log('listening on ', port) })
})
