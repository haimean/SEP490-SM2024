export const getRatingDescription = (rating) => {
  console.log("🚀 ========= rating:", rating);
  switch (rating) {
    case "Y":
      return "Yếu";
    case "TB":
      return "Trung bình";
    case "K":
      return "Khá";
    case "CN":
      return "Chuyên nghiệp";
    default:
      return "Không xác định";
  }
};
