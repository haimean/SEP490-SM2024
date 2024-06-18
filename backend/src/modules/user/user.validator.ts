import Joi from 'joi';
import regex from '../../utils/regex';

const userValidator = {
  changePassword: Joi.object({
    oldPassword: Joi.string()
      .regex(regex.password)
      .required()
      .label('Mật khẩu cũ'),
    newPassword: Joi.string()
      .regex(regex.password)
      .required()
      .label('Mật khẩu mới'),
  }),
  updateProfile: Joi.object({
    name: Joi.string().label('Tên'),
    dob: Joi.date().label('Ngày tháng năm sinh'),
    numberPhone: Joi.string()
      .regex(regex.phoneNumber)
      .label('Số điện thoại'),
  }),
};

export default userValidator;
