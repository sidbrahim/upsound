import mongoose from "mongoose";

const connect = async () => {
    if (mongoose.connection.readyState !== 0) return;

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error connecting to database: ", error);
    }
};

export default connect;
