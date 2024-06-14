import Joi from 'joi';
import regex from '../../utils/regex';

const userValidator = {
  changePassword: Joi.object({
    oldPassword: Joi.string().regex(regex.password).required(),
    newPassword: Joi.string().regex(regex.password).required(),
  }),
  updateProfile: Joi.object({
    name: Joi.string(),
    dob: Joi.date(),
    numberPhone: Joi.string().regex(regex.phoneNumber),
  }),
};

export default userValidator;
