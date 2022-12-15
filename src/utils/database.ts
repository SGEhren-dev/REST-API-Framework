import * as mongoose from "mongoose";

export function connectToDatabase(mongoString: string) {
	return new Promise((resolve, reject) => {
		mongoose.connect(mongoString)
			.then(resolve)
			.catch(reject);
	});
}
