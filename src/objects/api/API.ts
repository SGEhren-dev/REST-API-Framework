import express, { Express, RequestHandler, Router } from "express";
import logger from "node-color-log";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";

import { connectToDatabase } from "API/Utils/database";
import { IServerConfiguration } from "API/Interfaces";
import { readConfig } from "API/Utils/config";

type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE";

export class API {
	app: Express;
	config: IServerConfiguration;

	constructor(instance?: Express) {
		if (instance) {
			this.app = instance;
		} else {
			this.app = express();
		}

		this.config = readConfig();
	}

	createRoute(
		path: string | string[], method: RequestMethod | RequestMethod[], useAuth: boolean, model: mongoose.Model<any, any, unknown, any, unknown>
	) {
		const router: Router = express.Router();
	}

	createAsyncRoute() {

	}

	registerRoute(route: Router) {
		logger.info("Registering Route.");
		this.app.use(this.config.basePath, route);
		return this;
	}

	registerRoutes(routes: Router[]) {
		routes.forEach((route: Router) => {
			this.registerRoute(route);
		});
		return this;
	}

	registerDefaultPlugins() {
		this.app.use(bodyParser.json());
		this.app.use(morgan("combined"));

		if (this.config.useCors) {
			this.app.use(cors());
		}

		return this;
	}

	registerPlugin(plugin: RequestHandler<any, any, any, any, Record<string, any>>[]) {
		logger.log("Registering custom app plugin...");
		this.app.use(plugin);

		return this;
	}

	listen(callback?: (error?: any) => void) {
		this.app.listen(this.config.port, this.config.host, () => {
			logger.info(`API is listening on ${ this.config.port }.`);

			connectToDatabase(this.config.connectionString)
				.then(() => {
					logger.success("Successfully connected to the database.");

					if (callback) {
						callback();
					}
				})
				.catch((error) => {
					logger.error("Unable to connect to MongoDB Instance. Please check your internet connection");

					if (callback) {
						callback(error);
					}
				});
		});
	}
}