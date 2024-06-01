const regex = {
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&*]).{8,}$/,
  phoneNumber: /(84|0[3|5|7|8|9])+(\d{8})\b/,
};
export default regex;
