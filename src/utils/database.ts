import * as mongoose from "mongoose";
require("dotenv").config();

const mongoString = process.env.DATABASE_URL;

export function connectToDatabase() {
	mongoose.connect(mongoString ?? "");
	const databsase = mongoose.connection;

	databsase.on("error", error => {
		console.log(error);
	});

	databsase.on("connected", error => {
		console.log("Database Connected");
	});
}