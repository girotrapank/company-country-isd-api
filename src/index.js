const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock database of email domains and company names
const companyDatabase = {
  'gmail.com': 'Google',
  'yahoo.com': 'Yahoo',
  'hotmail.com': 'Microsoft',
  'apple.com': 'Apple Inc.',
  'amazon.com': 'Amazon',
  'facebook.com': 'Meta',
  'microsoft.com': 'Microsoft',
};

// Mock database of country codes and names with normalized search keys
const countryDatabase = {
  '1': { name: 'United States/Canada', searchKeys: ['united states', 'usa', 'canada'] },
  '44': { name: 'United Kingdom', searchKeys: ['united kingdom', 'uk', 'britain', 'great britain'] },
  '91': { name: 'India', searchKeys: ['india'] },
  '86': { name: 'China', searchKeys: ['china'] },
  '81': { name: 'Japan', searchKeys: ['japan'] },
  '49': { name: 'Germany', searchKeys: ['germany', 'deutschland'] },
  '33': { name: 'France', searchKeys: ['france'] },
  '61': { name: 'Australia', searchKeys: ['australia'] },
  '7': { name: 'Russia', searchKeys: ['russia'] },
  '55': { name: 'Brazil', searchKeys: ['brazil', 'brasil'] },
  '34': { name: 'Spain', searchKeys: ['spain', 'españa'] },
  '39': { name: 'Italy', searchKeys: ['italy', 'italia'] },
  '82': { name: 'South Korea', searchKeys: ['south korea', 'korea'] },
  '92': { name: 'Pakistan', searchKeys: ['pakistan'] },
  '966': { name: 'Saudi Arabia', searchKeys: ['saudi arabia', 'saudi'] }
};

// Helper function to extract domain from email
const getDomainFromEmail = (email) => {
  return email.split('@')[1];
};

// Helper function to extract ISD code from phone number
const getISDCode = (phoneNumber) => {
  // Remove any spaces or special characters except +
  const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
  // If number starts with +, remove it
  const numberWithoutPlus = cleanNumber.startsWith('+') ? cleanNumber.slice(1) : cleanNumber;
  
  // Try to match known country codes (starting with longest codes)
  const sortedCodes = Object.keys(countryDatabase).sort((a, b) => b.length - a.length);
  for (const code of sortedCodes) {
    if (numberWithoutPlus.startsWith(code)) {
      return code;
    }
  }
  return null;
};

// Helper function to find ISD code from country name
const findISDCodeByCountry = (countryName) => {
  const searchTerm = countryName.toLowerCase().trim();
  for (const [code, data] of Object.entries(countryDatabase)) {
    if (data.searchKeys.includes(searchTerm)) {
      return code;
    }
  }
  return null;
};

// API endpoint to get company name from email
app.get('/api/company', (req, res) => {
  try {
    const { email } = req.query;

    // Validate email
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const domain = getDomainFromEmail(email);
    const company = companyDatabase[domain] || 'Unknown Company';

    return res.json({ company });
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to get country name from phone number
app.get('/api/country', (req, res) => {
  try {
    const { phone } = req.query;

    // Validate phone number
    if (!phone) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    // Basic phone number validation - allow digits, +, spaces, and hyphens
    const phoneRegex = /^\+?[\d\s-]{8,}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: 'Invalid phone number format. Phone number should start with + followed by country code and number.' });
    }

    const isdCode = getISDCode(phone);
    if (!isdCode) {
      return res.status(404).json({ error: 'Country code not found' });
    }

    const country = countryDatabase[isdCode].name;

    return res.json({ country });
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to get ISD code from country name
app.get('/api/isd', (req, res) => {
  try {
    const { country } = req.query;

    // Validate country name
    if (!country) {
      return res.status(400).json({ error: 'Country name is required' });
    }

    const isdCode = findISDCodeByCountry(country);
    if (!isdCode) {
      return res.status(404).json({ error: 'Country not found' });
    }

    return res.json({ isd_code: `+${isdCode}` });
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 