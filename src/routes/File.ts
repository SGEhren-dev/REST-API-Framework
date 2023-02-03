import express from "express";
import multer, { StorageEngine } from "multer";
import path from "path";

export const fileRouter = express.Router();

const multerStorage: StorageEngine = multer.diskStorage({
	destination: (req, file, cb: (error: Error | null, destination: string) => void) => {
		cb(null, path.join(__dirname, "../../files"));
	},
	filename: (req, file, cb: (error: Error | null, fileName: string) => void) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
		cb(null, file.fieldname + "-" + uniqueSuffix);
	}
});

const upload = multer({ storage: multerStorage });

fileRouter.post("/file/test", upload.single("file"), async (req, res) => {
	res.status(200).json({ message: "File uploaded success." });
});
