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
- Extensive company domain database

## Live Demo

Base URL: `https://company-country-isd-api.onrender.com`

Test the API:
- [Get Company from Email](https://company-country-isd-api.onrender.com/api/company?email=example@gmail.com)
- [Get Country from Phone](https://company-country-isd-api.onrender.com/api/country?phone=+918888888888)
- [Get ISD Code from Country](https://company-country-isd-api.onrender.com/api/isd?country=india)

Note: First request might be slow due to cold start on free tier.

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

### Root Endpoint
```http
GET /
```
Returns API information and available endpoints.

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

The API supports a wide range of email domains across different categories:

#### Tech Giants & Their Services
- Google (gmail.com, google.com, googlemail.com)
- Microsoft (hotmail.com, outlook.com, live.com, microsoft.com)
- Apple (apple.com, icloud.com, me.com)
- Meta/Facebook (facebook.com, meta.com, fb.com, instagram.com, whatsapp.com)
- Amazon (amazon.com, amazon.co.uk, amazon.in, aws.amazon.com)

#### Social Media & Communication
- Twitter/X (twitter.com, x.com)
- LinkedIn (linkedin.com)
- Spotify (spotify.com)
- Netflix (netflix.com)
- Zoom (zoom.us)
- Slack (slack.com)
- Discord (discord.com)
- Telegram (telegram.org)

#### Cloud & Tech Companies
- Enterprise Software (salesforce.com, oracle.com, ibm.com)
- Hardware Companies (intel.com, nvidia.com, amd.com, cisco.com)
- Computer Manufacturers (dell.com, hp.com, lenovo.com)
- Development Tools (github.com, gitlab.com, atlassian.com)

#### Indian Tech Companies
- IT Services (tcs.com, infosys.com, wipro.com, hcl.com)
- E-commerce (flipkart.com, myntra.com)
- Food Delivery (swiggy.com, zomato.com)
- Digital Payments (paytm.com, phonepe.com)

#### Generic Domains
- Educational (.edu, ac.uk, ac.in, edu.au)
- Government (.gov, gov.uk, gov.in, gov.au)

For any unsupported domain, the API returns "Unknown Company".

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

Alternative names and common variations are supported for many countries. For example:
- UK, Britain, Great Britain for United Kingdom
- USA for United States
- Deutschland for Germany
- España for Spain
- Brasil for Brazil

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

## Deployment

This API is deployed on Render. To deploy your own instance:

1. Fork this repository
2. Sign up on [Render](https://render.com)
3. Create a new Web Service
4. Connect your GitHub repository
5. Use the following settings:
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node src/index.js`
   - Plan: Free

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.