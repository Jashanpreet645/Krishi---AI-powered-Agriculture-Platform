import mongoose from "mongoose";

export const connection = async function () {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "KRISHI",
    });
    console.log("Connected to database!");
  } catch (error) {
    console.log("Can not connect to database due to " + error);
  }
};

