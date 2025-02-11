import mongoose, { Schema } from "mongoose";

const CrimeReportSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    division: {
      type: String,
      required: true,
      enum: [
        "Dhaka",
        "Chattogram",
        "Khulna",
        "Barisal",
        "Sylhet",
        "Rajshahi",
        "Rangpur",
        "Mymensingh",
      ],
    },
    district: {
      type: String,
      required: true,
    },
    crimeTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ReportModel = mongoose.model("Report", CrimeReportSchema);

export default ReportModel;
