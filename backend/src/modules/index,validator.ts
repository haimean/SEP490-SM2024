import Joi from 'joi';

const validator = {
  pagination: Joi.object({
    isActive: Joi.boolean(),
    role: Joi.boolean(),
    isAccept: Joi.boolean(),
  }),
};

export default validator;
