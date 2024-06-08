import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiBaseURL = 'http://localhost:4200';

const CallApi = async (endpoint, method, body, headers = {}, successMessage, errorMessage, navigatePath) => {
  const navigate = useNavigate();
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
    if (response) {
      toast.success(successMessage || `Successful!`);
      if (navigatePath) {
        navigate(navigatePath);
      }
    }
    return response.data;
  } catch (error) {
    toast.error(errorMessage || error.response?.data?.error || 'Error!!!');
    console.error("Error:", error.response?.data?.error);
  }
};

export default CallApi;