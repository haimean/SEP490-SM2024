import axios from "axios";

const getToken = () => {
  return localStorage.getItem("accessToken");
};

const CallApi = async (endpoint, method, body, headers = {}) => {
  const token = getToken(); // Lấy token từ hàm getToken
  const config = {
    url: `${import.meta.env.VITE_API_URL}${endpoint}`,
    method,
    headers: {
      ...headers,
      ...(token && { Authorization: `Bearer ${token}` }), // Thêm token vào header nếu tồn tại
    },
    data: body,
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error; // Ném lỗi sang bên component tự xử lý
  }
};

export default CallApi;
