require("dotenv").config()
import express from "express"
import config from "config"
import connectToDb from "./utils/connectToDb"
import logger from "./utils/logger"
import router from "./routes/index"

const app = express()

app.use(express.json());             // middlewares antes
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

// ruta directa para probar que el server vive
app.get('/ping', (_req, res) => res.send('pong'));

const port = (config.has('port') ? config.get<number>('port') : 3000);

app.listen(port, () => {
  logger.info(`Server is running on port http://localhost:${port}`)
  connectToDb()
})