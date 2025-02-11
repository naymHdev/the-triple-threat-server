import mongoose, { Schema } from "mongoose";

const AdminSchema = new Schema(
  {
    reason: {
      type: String,
      required: true,
    },
    adminId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    bannedUserId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AdminModel = mongoose.model("Admin", AdminSchema);

export default AdminModel;
