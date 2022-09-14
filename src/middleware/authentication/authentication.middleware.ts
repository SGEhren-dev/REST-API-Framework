import * as jwt from "jsonwebtoken";
require("dotenv").config();

export function generateAccessToken(username: string) {
	return jwt.sign(username, process.env.TOKEN_SECRET as string);
}

export function authenticateToken(req: any, res: any, next: any) {
	const bearerHeader = req.headers['authorization'];
	
	if (bearerHeader) {
		const bearer = bearerHeader.split(" ");
		const bearerToken = bearer[1];

		if (bearerToken === null) {
			res.status(401);
		}
	
		jwt.verify(bearerToken, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
			if (err) {
				return res.status(403);
			}
	
			req.user = user;
			next();
		});
	}
}