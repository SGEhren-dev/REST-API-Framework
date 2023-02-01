import express from "express";

export const testRouter = express.Router();

testRouter.post("/posttest", async (req, res) => {
	res.status(200).json({ message: "Post test was a success." });
});

testRouter.get("/gettest", async (req, res) => {
	res.status(200).json(req.body);
});
