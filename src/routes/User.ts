import express, { Express } from "express";
import { userModel } from "../models";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../middleware/authentication/authentication.middleware";
require('dotenv').config();

export const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
	if ((req.body.name as string).length > 70 || (req.body.email as string).length > 70) {
		res.status(400).json({ message: "Character limit must be 70 or less" });
	}

	const hash = await bcrypt.hash(req.body.password, process.env.PASSWORD_SALT as string);

	const data = new userModel({
		uuid: req.body.uuid ?? uuidv4(),
		name: req.body.name,
		email: req.body.email,
		password: hash
	});

	try {
		await data.save();

		const token = generateAccessToken(data.uuid);
		res.status(200).json(token);
	}
	catch(error: any) {
		res.status(400).json({ message: error.message });
	}
});

userRouter.post("/login", async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	const entry = await userModel.findOne({
		email: email
	});

	if (entry) {
		const isValid = await bcrypt.compare(password, entry.password);

		if (isValid) {
			const token = generateAccessToken(entry.username);
			res.status(200).json({
				token,
				...entry
			});
		} else {
			res.status(400).json({ error: "Invalid Password" });
		}
	}
});
