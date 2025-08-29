# BFHL REST API

A Node.js REST API that processes arrays and returns categorized results including even/odd numbers, alphabets, special characters, and more.

## Features

- **POST /bfhl** endpoint that processes array data
- Categorizes input into even numbers, odd numbers, alphabets, and special characters
- Generates user ID with timestamp format
- Calculates sum of numbers
- Creates concatenated string with alternating caps in reverse order
- Comprehensive error handling and validation

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Security**: Helmet.js
- **CORS**: Enabled for cross-origin requests

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd bfhl-api
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start on port 3000 (or the port specified in the PORT environment variable).

## API Endpoints

### POST /bfhl

Processes an array and returns categorized results.

**Request Body:**
```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "john_doe_17122024",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

### GET /

Health check endpoint that returns API information.

## Examples

### Example 1
**Input:** `["a", "1", "334", "4", "R", "$"]`
**Output:** Numbers are categorized, sum is 339, concatenated string is "Ra"

### Example 2
**Input:** `["2", "a", "y", "4", "&", "-", "*", "5", "92", "b"]`
**Output:** Numbers are categorized, sum is 103, concatenated string is "ByA"

### Example 3
**Input:** `["A", "ABcD", "DOE"]`
**Output:** No numbers, all alphabets, concatenated string is "EoDdCbAa"

## Response Format

- **is_success**: Boolean indicating operation status
- **user_id**: Format: `{full_name_ddmmyyyy}` (e.g., "john_doe_17122024")
- **email**: User's email address
- **roll_number**: College roll number
- **odd_numbers**: Array of odd numbers as strings
- **even_numbers**: Array of even numbers as strings
- **alphabets**: Array of alphabets converted to uppercase
- **special_characters**: Array of special characters
- **sum**: Sum of all numbers as a string
- **concat_string**: Concatenated alphabets in reverse order with alternating caps

## Error Handling

The API includes comprehensive error handling:
- Input validation
- Proper HTTP status codes
- Descriptive error messages
- Try-catch blocks for graceful error handling

## Deployment

### Railway
1. Connect your GitHub repository to Railway
2. Railway will automatically detect the Node.js app
3. Set environment variables if needed
4. Deploy

### Render
1. Connect your GitHub repository to Render
2. Choose "Web Service"
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Deploy

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts to deploy

## Environment Variables

- `PORT`: Server port (default: 3000)

## Customization

Before deploying, update the following in `server.js`:
- `fullName` variable with your actual name
- `email` variable with your actual email
- `roll_number` variable with your actual roll number

## Testing

You can test the API using tools like:
- Postman
- cURL
- Thunder Client (VS Code extension)

### cURL Example
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["a", "1", "334", "4", "R", "$"]}'
```

## License

MIT License

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
