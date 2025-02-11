import mongoose, { Schema } from "mongoose";

const MediaSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    mediaUrl: {
      type: String,
      required: true,
    },
    reportId: {
      type: mongoose.Schema.ObjectId,
      ref: "Report",
      required: true,
    },
    commentId: {
      type: mongoose.Schema.ObjectId,
      ref: "Comment",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const MediaModel = mongoose.model("Media", MediaSchema);

export default MediaModel;
