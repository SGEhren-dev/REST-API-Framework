/* eslint-disable @typescript-eslint/no-explicit-any */
import * as jwt from "jsonwebtoken";
import { readConfig } from "API/Utils/config";

const config = readConfig();

export function generateAccessToken(username: string) {
	return jwt.sign({ data: username }, config.tokenSecret, {
		expiresIn: "7d"
	});
}

export function authenticateToken(req: any, res: any, next: any) {
	const bearerHeader = req.headers["authorization"];

	if (bearerHeader) {
		const bearer = bearerHeader.split(" ");
		const bearerToken = bearer[1];

		if (bearerToken === null) {
			res.status(401);
		}

		jwt.verify(bearerToken, config.tokenSecret, (err:any , user: any) => {
			if (err) {
				return res.status(403);
			}

			req.user = user;
			next();
		});
	}
}
