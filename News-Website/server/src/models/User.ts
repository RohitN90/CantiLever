import mongoose, { Document, Types } from "mongoose";

interface IUser extends Document {
  _id: Types.ObjectId | unknown;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const UserSchmema = new mongoose.Schema<IUser>(
  {
    firstname: {
      type: String,
      require: true,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.model<IUser>("User", UserSchmema);

export default UserModel;
export { IUser };
