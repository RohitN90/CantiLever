import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const connect = async () => {
  try {
    const con = await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log("Mongodb is running", con.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connect;
