import { userRouter, testRouter, fileRouter } from "API/Routes";
import { API } from "API/Objects";

const api = new API()
	.registerDefaultPlugins()
	.registerRoutes([ userRouter, testRouter, fileRouter ])
	.listen((error) => {
		if (error) {
			throw new Error(error);
		}
	});
