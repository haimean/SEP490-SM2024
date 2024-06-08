import axios from "axios";

const apiBaseURL = "http://localhost:4200";

const CallApi = async (endpoint, method, body, headers = {}) => {
  const config = {
    url: `${apiBaseURL}${endpoint}`,
    method,
    headers: {
      ...headers,
    },
    data: body,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error; //Ném lỗi sang bên component tự xử lý
  }
};
export default CallApi;