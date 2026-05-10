const URI = process.env.REACT_APP_API_URL || process.env.REACT_APP_API_URI;
const PORT = process.env.REACT_APP_PORT || process.env.REACT_APP_API_PORT;
const RESOURCE = process.env.REACT_APP_API_RESOURCE || "/api/watson";

export const getBaseUrl = () => {
  return `${URI}:${PORT}`;
};

export const getApiUrl = (endpoint) => {
  return `${URI}:${PORT}${RESOURCE}/${endpoint}`;
};

export const getImageUrl = (imagePath) => {
  if (imagePath && imagePath.startsWith("http")) {
    return imagePath;
  }
  return `${URI}:${PORT}${imagePath}`;
};
