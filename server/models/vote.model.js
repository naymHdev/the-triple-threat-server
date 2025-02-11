import mongoose, { Schema } from "mongoose";

const VoteSchema = new Schema(
  {
    type: {
      enum: ["image", "video"],
      required: true,
    },

    reportId: {
      type: mongoose.Schema.ObjectId,
      ref: "Report",
      required: true,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const VoteModel = mongoose.model("Vote", VoteSchema);

export default VoteModel;
