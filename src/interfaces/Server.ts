export interface IServerConfiguration {
	host: string;
	port: number;
	useCors: boolean;
	basePath: string;
	connectionString: string;
	tokenSecret: string;
	passwordSalt: string;
}
