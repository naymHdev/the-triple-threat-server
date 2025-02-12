import axios from "axios";
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY; // Get from Hugging Face

// Function to generate image description
const generateDescription = async (imageUrl, apiKey) => {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/nlpconnect/vit-gpt2-image-captioning",
      { inputs: imageUrl },
      { headers: { Authorization: `Bearer ${HUGGINGFACE_API_KEY}` } }
    );
    return response.data[0]?.generated_text || "No description generated.";
  } catch (error) {
    console.error(error);
    return "AI description not available.";
  }
};

// Export the function
export { generateDescription };
