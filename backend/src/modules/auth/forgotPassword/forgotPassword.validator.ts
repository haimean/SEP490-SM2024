import Joi from 'joi';
import regex from '../../../utils/regex';

const forgotPasswordValidator = {
  findEmail: Joi.object({
    email: Joi.string().email(),
  }),
  verifyOtp: Joi.object({
    email: Joi.string().email(),
    otp: Joi.string().regex(regex.otp),
  }),
};
export default forgotPasswordValidator;
