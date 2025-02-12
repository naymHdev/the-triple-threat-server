import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";
import { userRole } from "../constants/index.js";

const UserSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: userRole,
      defult: "Unverified",
    },
    profilePic: String,
    refreshToken: String,
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    console.log(this.password);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (!update || !update.password) return next();

  try {
    update.password = await bcrypt.hash(update.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.matchPassword = async function (password) {
  console.log(password, this.password);
  return await bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
