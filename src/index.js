const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Add basic root route for Render health check
app.get('/', (req, res) => {
  res.json({
    message: 'Company Country ISD API',
    endpoints: {
      company: '/api/company?email=example@gmail.com',
      country: '/api/country?phone=+918888888888',
      isd: '/api/isd?country=india'
    },
    status: 'active'
  });
});

// Mock database of email domains and company names
const companyDatabase = {
  // Tech Giants
  'gmail.com': 'Google',
  'google.com': 'Google',
  'googlemail.com': 'Google',
  'yahoo.com': 'Yahoo',
  'yahoo.co.uk': 'Yahoo',
  'yahoo.co.in': 'Yahoo',
  'hotmail.com': 'Microsoft',
  'outlook.com': 'Microsoft',
  'live.com': 'Microsoft',
  'microsoft.com': 'Microsoft',
  'apple.com': 'Apple Inc.',
  'icloud.com': 'Apple Inc.',
  'me.com': 'Apple Inc.',
  'amazon.com': 'Amazon',
  'amazon.co.uk': 'Amazon',
  'amazon.in': 'Amazon',
  'aws.amazon.com': 'Amazon Web Services',
  'facebook.com': 'Meta',
  'meta.com': 'Meta',
  'fb.com': 'Meta',
  'instagram.com': 'Meta',
  'whatsapp.com': 'Meta',

  // Social Media & Communication
  'twitter.com': 'Twitter/X',
  'x.com': 'Twitter/X',
  'linkedin.com': 'LinkedIn',
  'spotify.com': 'Spotify',
  'netflix.com': 'Netflix',
  'zoom.us': 'Zoom',
  'slack.com': 'Slack',
  'discord.com': 'Discord',
  'telegram.org': 'Telegram',

  // Cloud & Tech Companies
  'salesforce.com': 'Salesforce',
  'oracle.com': 'Oracle',
  'ibm.com': 'IBM',
  'intel.com': 'Intel',
  'nvidia.com': 'NVIDIA',
  'amd.com': 'AMD',
  'cisco.com': 'Cisco',
  'dell.com': 'Dell',
  'hp.com': 'HP',
  'lenovo.com': 'Lenovo',
  'samsung.com': 'Samsung',
  'sony.com': 'Sony',
  'github.com': 'GitHub',
  'gitlab.com': 'GitLab',
  'atlassian.com': 'Atlassian',
  'jira.com': 'Atlassian',

  // E-commerce & Retail
  'walmart.com': 'Walmart',
  'target.com': 'Target',
  'bestbuy.com': 'Best Buy',
  'ebay.com': 'eBay',
  'shopify.com': 'Shopify',
  'alibaba.com': 'Alibaba',
  'aliexpress.com': 'Alibaba',

  // Financial Services
  'paypal.com': 'PayPal',
  'stripe.com': 'Stripe',
  'jpmorgan.com': 'JPMorgan Chase',
  'goldmansachs.com': 'Goldman Sachs',
  'wellsfargo.com': 'Wells Fargo',
  'mastercard.com': 'Mastercard',
  'visa.com': 'Visa',

  // Telecommunications
  'att.com': 'AT&T',
  'verizon.com': 'Verizon',
  't-mobile.com': 'T-Mobile',
  'vodafone.com': 'Vodafone',
  'airtel.com': 'Airtel',
  'jio.com': 'Jio',

  // Media & Entertainment
  'disney.com': 'Disney',
  'warnerbros.com': 'Warner Bros',
  'sony.com': 'Sony',
  'nbc.com': 'NBC',
  'fox.com': 'Fox',
  'cnn.com': 'CNN',
  'bbc.co.uk': 'BBC',

  // Automotive
  'tesla.com': 'Tesla',
  'ford.com': 'Ford',
  'gm.com': 'General Motors',
  'toyota.com': 'Toyota',
  'bmw.com': 'BMW',
  'mercedes-benz.com': 'Mercedes-Benz',
  'volkswagen.com': 'Volkswagen',

  // Popular Indian Companies
  'tcs.com': 'Tata Consultancy Services',
  'infosys.com': 'Infosys',
  'wipro.com': 'Wipro',
  'hcl.com': 'HCL Technologies',
  'techmahindra.com': 'Tech Mahindra',
  'reliance.com': 'Reliance Industries',
  'tatamotors.com': 'Tata Motors',
  'mahindra.com': 'Mahindra Group',
  'flipkart.com': 'Flipkart',
  'myntra.com': 'Myntra',
  'swiggy.com': 'Swiggy',
  'zomato.com': 'Zomato',
  'paytm.com': 'Paytm',
  'phonepe.com': 'PhonePe',

  // Educational Institutions (Generic)
  'edu': 'Educational Institution',
  'ac.uk': 'UK Academic Institution',
  'ac.in': 'Indian Academic Institution',
  'edu.au': 'Australian Academic Institution',
  'edu.cn': 'Chinese Academic Institution',
  'edu.sg': 'Singapore Academic Institution',

  // Government Domains (Generic)
  'gov': 'US Government',
  'gov.uk': 'UK Government',
  'gov.in': 'Indian Government',
  'gov.au': 'Australian Government',
  'gov.ca': 'Canadian Government',
  'gov.sg': 'Singapore Government'
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