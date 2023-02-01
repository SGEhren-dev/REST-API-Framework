/* eslint-disable @typescript-eslint/no-var-requires */
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const token = crypto.randomBytes(128).toString("hex");
let json = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "./config/default.json")));

json.environment.tokenSecret = token;

fs.writeFileSync(path.join(__dirname, "..", "./config/default.json"), JSON.stringify(json, null, "\t"));
