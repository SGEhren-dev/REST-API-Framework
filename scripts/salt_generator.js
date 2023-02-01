/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

bcrypt.genSalt(10, (err, salt) => {
	if (err) {
		throw new Error(err);
	}

	let json = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "./config/default.json")));
	json.environment.passwordSalt = salt;
	fs.writeFileSync(path.join(__dirname, "..", "./config/default.json"), JSON.stringify(json, null, "\t"));
});
