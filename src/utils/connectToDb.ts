import mogoose from "mongoose"
import config from "config"
import logger from "./logger"

const dbUri = config.get<string>("dbUri")

async function connectToDb() {
    try {
        await mogoose.connect(dbUri)
        console.log("Connected to DB")
        logger.info("Connected to DB")
    } catch (error) {
        console.log("Error connecting to DB", error)
        process.exit(1)
    }
}

export default connectToDb