# Company Country ISD API

A simple REST API service that provides three key functionalities:
1. 🏢 Get company name from email domain
2. 🌍 Get country name from phone number ISD code
3. 📞 Get ISD code from country name

## Features

- No authentication required
- Simple REST API endpoints
- JSON responses
- Support for multiple country name variations
- Comprehensive error handling
- CORS enabled

## Live Demo

Base URL: `[Your-Render-URL]`

## Quick Start

```bash
# Clone the repository
git clone https://github.com/girotrapank/company-country-isd-api.git

# Install dependencies
npm install

# Start the server
npm start

# For development with auto-reload
npm run dev
```

## API Documentation

### 1. Get Company Name
```http
GET /api/company?email=example@gmail.com
```
Returns company name for the given email domain.

### 2. Get Country Name
```http
GET /api/country?phone=+918888888888
```
Returns country name for the given phone number.

### 3. Get ISD Code
```http
GET /api/isd?country=india
```
Returns ISD code for the given country name.

## Supported Data

### Email Domains
- gmail.com → Google
- yahoo.com → Yahoo
- hotmail.com → Microsoft
- apple.com → Apple Inc.
- amazon.com → Amazon
- facebook.com → Meta
- microsoft.com → Microsoft

### Countries and ISD Codes
- United States/Canada (+1)
- United Kingdom (+44)
- India (+91)
- China (+86)
- Japan (+81)
- Germany (+49)
- France (+33)
- Australia (+61)
- Russia (+7)
- Brazil (+55)
- Spain (+34)
- Italy (+39)
- South Korea (+82)
- Pakistan (+92)
- Saudi Arabia (+966)

## Error Handling

All endpoints return appropriate HTTP status codes:
- 200: Success
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

## Development

```bash
# Run in development mode
npm run dev

# Run in production mode
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.