import Joi from 'joi';
import regex from '../../utils/regex';

const authValidator = {
  login: Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string()
      .regex(regex.password)
      .required()
      .label('Mật khẩu'),
  }),
  register: Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().label('Mật khẩu'),
  }),
};

export default authValidator;
