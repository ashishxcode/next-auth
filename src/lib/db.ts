import mongoose from 'mongoose';

export const connect = async () => {
	try {
		const CONNECTION_URL = process.env.MONGODB_URI as string;
		mongoose.connect(CONNECTION_URL);

		const connection = mongoose.connection;

		connection.on('connected', () => {
			console.log('MongoDB connected successfully 🚀');
		});

		connection.on('error', (err) => {
			console.log(
				'MongoDB connection error. Please make sure MongoDB is running. ' + err
			);
			process.exit();
		});
	} catch (error) {
		console.log('Something went wrong with MongoDB connection.');
		console.log(error);
	}
};
