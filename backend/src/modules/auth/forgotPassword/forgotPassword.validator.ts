import Joi from 'joi';

const forgotPasswordValidator = {
  findEmail: Joi.object({
    email: Joi.string().email(),
  }),
};
export default forgotPasswordValidator;
