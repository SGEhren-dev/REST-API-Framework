import express, { Express } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import { connectToDatabase } from "./utils/database";

const app: Express = express();

app.use(bodyParser.json());
app.use(morgan("combined"));

// connectToDatabase();

const server = app.listen(6061, () => {
	console.log("API is listening on port 6061");
});