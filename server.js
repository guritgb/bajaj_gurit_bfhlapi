const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Helper function to check if a string is a number
const isNumber = (str) => {
  return !isNaN(str) && !isNaN(parseFloat(str));
};

// Helper function to check if a string is an alphabet
const isAlphabet = (str) => {
  return /^[a-zA-Z]+$/.test(str);
};

// Helper function to check if a string is a special character
const isSpecialChar = (str) => {
  return /^[^a-zA-Z0-9\s]+$/.test(str);
};

// Helper function to generate user ID
const generateUserId = (fullName) => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  return `${fullName.toLowerCase()}_${day}${month}${year}`;
};

// Main endpoint
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    // Validate input
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid input. 'data' must be an array.",
      });
    }

    // Initialize arrays and variables
    const evenNumbers = [];
    const oddNumbers = [];
    const alphabets = [];
    const specialCharacters = [];
    let sum = 0;
    let allAlphabets = "";

    // Process each element in the data array
    data.forEach((item) => {
      const str = String(item);

      if (isNumber(str)) {
        const num = parseInt(str);
        if (num % 2 === 0) {
          evenNumbers.push(str);
        } else {
          oddNumbers.push(str);
        }
        sum += num;
      } else if (isAlphabet(str)) {
        alphabets.push(str.toUpperCase());
        allAlphabets += str;
      } else if (isSpecialChar(str)) {
        specialCharacters.push(str);
      }
    });

    // Generate concatenated string with alternating caps in reverse order
    let concatString = "";
    const reversedAlphabets = allAlphabets.split("").reverse();
    reversedAlphabets.forEach((char, index) => {
      if (index % 2 === 0) {
        concatString += char.toUpperCase();
      } else {
        concatString += char.toLowerCase();
      }
    });

    // Generate user ID (you can customize the full name)
    const fullName = "Gurit_Bhasin"; // Change this to your actual name
    const userId = generateUserId(fullName);

    // Prepare response
    const response = {
      is_success: true,
      user_id: userId,
      email: "bh.guritbhasin@gmail.com", // Change this to your actual email
      roll_number: "22BCE1085", // Change this to your actual roll number
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialCharacters,
      sum: String(sum),
      concat_string: concatString,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({
      is_success: false,
      error: "Internal server error",
    });
  }
});

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    message: "BFHL API is running",
    endpoint: "/bfhl",
    method: "POST",
    description: "Process array data and return categorized results",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/bfhl`);
});

module.exports = app;
