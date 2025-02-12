import mongoose, { Schema } from "mongoose";

const CrimeSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    video: { type: String },
    division: { type: String, required: true },
    district: { type: String, required: true },
    postTime: { type: Date, default: Date.now },
    crimeTime: { type: Date, required: true },
  },
  { timestamps: true }
);

const crimepostmodel = mongoose.model("Crime", CrimeSchema);
// heelo
export default crimepostmodel;
