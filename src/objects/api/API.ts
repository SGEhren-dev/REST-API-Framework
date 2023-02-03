import express, {
	Express, Request, Response, RequestHandler, Router, NextFunction
} from "express";
import logger from "node-color-log";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";

import { connectToDatabase } from "API/Utils/database";
import { IIndexSignature, IServerConfiguration } from "API/Interfaces";
import { readConfig } from "API/Utils/config";
import { authenticateToken } from "API/Middleware";

type RequestMethod = "get" | "post" | "patch" | "delete";
/* eslint-disable @typescript-eslint/no-explicit-any */
type RequestType = Request<object, any, any, unknown, Record<string, any>>;
type ResponseType = Response<any, Record<string, any>>;
/* eslint-disable @typescript-eslint/no-explicit-any */

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
		path: string | string[], useAuth: boolean,
		callbacks: IIndexSignature<(req: RequestType, res: ResponseType, next: NextFunction) => void>
	) {
		const router: Router = express.Router();

		Object.keys(callbacks).forEach((method: string, index: number) => {
			if (useAuth) {
				router[ method as RequestMethod ]?.(path, authenticateToken, callbacks[ index ])
			}

			router[ method as RequestMethod ]?.(path, callbacks[ index ]);
		});

		this.registerRoute(router);
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

	/* eslint-disable @typescript-eslint/no-explicit-any */
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
	/* eslint-disable @typescript-eslint/no-explicit-any */
}
