export const getTimeSinceCreation = (createdAt) => {
  const now = new Date();
  const creationDate = new Date(createdAt);
  creationDate.setHours(creationDate.getHours() - 7);

  const diffInSeconds = Math.max(0, Math.floor((now - creationDate) / 1000));

  if (diffInSeconds < 60) return `${diffInSeconds} giây trước`;
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} phút trước`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
  if (diffInSeconds < 31536000)
    return `${Math.floor(diffInSeconds / 2592000)} tháng trước`;
  return `${Math.floor(diffInSeconds / 31536000)} năm trước`;
};
