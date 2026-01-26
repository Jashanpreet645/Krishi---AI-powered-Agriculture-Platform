import axios from "axios";
import FormData from "form-data";

/**
 * Controller for plant disease detection
 * Accepts an image file and forwards it to the ML service
 *
 * Example curl command:
 * curl -F 'image=@leaf.jpg' http://localhost:3000/api/disease/detect
 */
export const detectDisease = async (req, res, next) => {
  try {
    // Validate that file was uploaded
    if (!req.file) {
      return res.status(400).json({
        message:
          'No image file provided. Please upload an image file with the field name "image"',
      });
    }

    const ML_GATEWAY_URL = process.env.ML_GATEWAY_URL;

    if (!ML_GATEWAY_URL) {
      return res.status(500).json({
        message: "ML service gateway URL not configured",
      });
    }

    // Create form data for the ML service
    const formData = new FormData();
    formData.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    // Forward request to ML service
    const authHeader = req.headers.authorization || "";
    const response = await axios.post(`${ML_GATEWAY_URL}/infer`, formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: authHeader,
      },
      timeout: 15000, // 15 second timeout
    });

    // Forward the successful response from ML service
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error forwarding to ML service:", error.message);

    if (error.code === "ECONNABORTED") {
      return res.status(502).json({
        message: "ML service request timeout",
        error: "Service took too long to respond",
      });
    }

    if (error.response) {
      // The ML service responded with an error status
      return res.status(502).json({
        message: "ML service error",
        error: error.response.data || error.response.statusText,
      });
    }

    if (error.request) {
      // The request was made but no response was received
      return res.status(502).json({
        message: "ML service unavailable",
        error: "No response received from ML service",
      });
    }

    // Other errors
    res.status(502).json({
      message: "Error processing disease detection",
      error: error.message,
    });
  }
};
