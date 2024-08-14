export const getRatingDescription = (rating) => {
  switch (rating) {
    case "Y":
      return "Yếu";
    case "TB":
      return "Trung bình";
    case "K":
      return "Khá";
    case "T":
      return "Tốt";
    case "CN":
      return "Chuyên nghiệp";
    default:
      return "Không xác định";
  }
};

export const levelOptions = [
  { value: "Y", label: "Yếu" },
  { value: "TB", label: "Trung bình" },
  { value: "K", label: "Khá" },
  { value: "T", label: "Tốt" },
  { value: "CN", label: "Chuyên nghiệp" },
];
