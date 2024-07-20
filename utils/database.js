const { default: mongoose } = require("mongoose");

let isConnected = false;

export const connectToDB = async() => {
    mongoose.set("strictQuery", true)
    if (isConnected) {
        console.log("Already connected to the database.");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName:"share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to the database.");
        isConnected = true;
    } catch (error) {
        console.error("Failed to connect to the database:", error.message);
    }
}