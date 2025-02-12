import CrimePost from "../models/crimepost.model.js"; // ✅ Corrected import
import { generateDescription } from "../utils/aiHelper.js"; // ✅ Fixed import syntax

export const reportCrime = async (req, res) => {
  try {
    const { title, division, email, district, images, crimeTime, description } =
      req.body;

    // ✅ Check if files were uploaded properly
    if (!images) {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }

    // ✅ Extract uploaded files

    const video = req.files.video ? req.files.video[0].path : null; // Save video path if exists

    // ✅ If no description is provided, generate one using AI (for images only)
    console.log(images, images[0]);
    let finalDescription = description;
    if (!video && !finalDescription) {
      finalDescription = await generateDescription(images); // AI-based description
    }

    // ✅ Create a new crime post
    const crime = new CrimePost({
      email, // ✅ Ensure `req.user` is populated
      title,
      description: finalDescription,
      images,
      video,
      division,
      district,
      crimeTime,
    });

    // ✅ Save the post to MongoDB
    await crime.save();

    res.status(201).json({ message: "Crime reported successfully", crime });
  } catch (error) {
    console.error("Error in reportCrime:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllCrimes = async (req, res) => {
  try {
    const crimes = CrimePost.find().populate("User");
    res.status(200).json(crimes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCrimeById = async (req, res) => {
  try {
    const crime = await Crime.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!crime) {
      return res.status(404).json({ message: "Crime not found" });
    }
    res.status(200).json(crime);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
