import axios from "axios";

const CallApi = async (endpoint, method, body, headers = {}) => {
  const config = {
    url: `${process.env.REACT_APP_BASE_URL_API}${endpoint}`,
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