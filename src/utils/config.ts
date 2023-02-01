import { IServerConfiguration } from "API/Interfaces";
import config from "config";

export function readConfig(): IServerConfiguration {
	const host = config.get("server.host") as string;
	const port = config.get("server.port") as number;
	const useCors = config.get("api.useCors") as boolean;
	const basePath = config.get("api.basePath") as string;
	const connectionString = config.get("api.connectionString") as string;
	const tokenSecret = config.get("environment.tokenSecret") as string;
	const passwordSalt = config.get("environment.passwordSalt") as string;

	return {
		host,
		port,
		useCors,
		basePath,
		connectionString,
		tokenSecret,
		passwordSalt
	};
}
