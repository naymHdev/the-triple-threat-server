import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";
import { userRole } from "../constants";

const UserSchema = new Schema(
  {
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
      required: true,
    },
    profilePic: String,
    refreshToken: String,
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async (next) => {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.pre("findOneAndUpdate", async (next) => {
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
  return await bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
