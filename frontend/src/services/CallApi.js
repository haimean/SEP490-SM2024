import axios from "axios";

const apiBaseURL = "http://localhost:4200";

const CallApi = async (endpoint, method, body, headers = {}) => {
  const config = {
    url: `${apiBaseURL}${endpoint}`,
    method,
    headers: {
      ...headers,
    },
    body,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response?.data?.error);
  }
};
export default CallApi;
