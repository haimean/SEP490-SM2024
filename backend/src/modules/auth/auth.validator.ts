import Joi from 'joi';

const authValidator = {
  login: Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Mật khẩu'),
  }),
  register: Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().label('Mật khẩu'),
  }),
};

export default authValidator;
