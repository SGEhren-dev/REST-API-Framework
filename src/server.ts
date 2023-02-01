import { userRouter, testRouter } from "API/Routes";
import { API } from "API/Objects";

const api = new API()
	.registerDefaultPlugins()
	.registerRoutes([ userRouter, testRouter ])
	.listen((error) => {
		if (error) {
			throw new Error(error);
		}
	});
