require("dotenv").config()
import express from "express"
import config from "config"
import connectToDb from "./utils/connectToDb"
import logger from "./utils/logger"
import router from "./routes/index"

const app = express()
app.use(router)
const port = config.get("port") || 3000 // esto cambiara mas adelante con la app en si


app.listen(port, () => {
  logger.info(`Server is running on port http://localhost:${port}`)
  connectToDb()
})