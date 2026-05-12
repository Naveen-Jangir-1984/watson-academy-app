const RESOURCE = process.env.REACT_APP_API_RESOURCE || "/api/watson";

// API server URLs per environment - UPDATE THESE WITH YOUR ACTUAL API URLS
const API_CONFIG = {
  // Production - matches your prod Firebase hosting domain
  "watson-academy-333031.web.app": "https://turbocode.bits-goa.ac.in:27002",
  "watson-academy-333031.firebaseapp.com": "https://turbocode.bits-goa.ac.in:27002",

  // QA - matches your QA Firebase hosting domain
  "qa-watson-333031.web.app": "https://turbocode.bits-goa.ac.in:27002",
  "qa-watson-333031.firebaseapp.com": "https://turbocode.bits-goa.ac.in:27002",

  // DEV - matches your DEV Firebase hosting domain
  "dev-watson-333031.web.app": "https://turbocode.bits-goa.ac.in:27002",
  "dev-watson-333031.firebaseapp.com": "https://turbocode.bits-goa.ac.in:27002",

  // Localhost fallback for local development
  localhost: `${process.env.REACT_APP_API_URI}:${process.env.REACT_APP_API_PORT}`,
};

const getApiBaseUrl = () => {
  const hostname = window.location.hostname;

  // Check for exact match first
  if (API_CONFIG[hostname]) {
    return API_CONFIG[hostname];
  }

  // Check for partial match (for custom domains)
  for (const [domain, url] of Object.entries(API_CONFIG)) {
    if (hostname.includes(domain) || domain.includes(hostname)) {
      return url;
    }
  }

  // Fallback to environment variables or localhost
  console.warn(`Unknown hostname: ${hostname}, falling back to localhost`);
  return API_CONFIG["localhost"];
};

export const getBaseUrl = () => {
  return getApiBaseUrl();
};

export const getApiUrl = (endpoint) => {
  return `${getApiBaseUrl()}${RESOURCE}/${endpoint}`;
};

export const getImageUrl = (imagePath) => {
  if (imagePath && imagePath.startsWith("http")) {
    return imagePath;
  }
  return `${getApiBaseUrl()}${imagePath}`;
};
