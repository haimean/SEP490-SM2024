import Joi from 'joi';

const authValidator = {
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string(),
  }),
  register: Joi.object({
    email: Joi.string().required(),
    password: Joi.string(),
  }),
};

export default authValidator;
