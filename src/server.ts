import express, { Express } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import logger from "node-color-log";
import { connectToDatabase } from "./utils/database";
import { readConfig } from "./utils/config";
import { IServerConfiguration } from "API/Interfaces";
import { userRouter } from "./routes";

const app: Express = express();
const config: IServerConfiguration = readConfig();

app.use(bodyParser.json());
app.use(morgan("combined"));

app.use(config.basePath, userRouter);

if (config.useCors) {
	app.use(cors());
}

const server = app.listen(config.port, config.host, () => {
	logger.info(`API is listening on ${ config.port }.`);

	connectToDatabase(config.connectionString)
		.then(() => {
			logger.success("Successfully connected to the database.");
		})
		.catch(() => {
			logger.error("An error occurred connecting to the database.");
		});
});
