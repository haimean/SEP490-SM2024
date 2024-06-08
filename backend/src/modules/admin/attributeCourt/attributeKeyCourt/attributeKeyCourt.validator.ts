import Joi from 'joi';

const attributeKeyCourtValidator = {
  update: Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
  }),
  create: Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
  }),
};

export default attributeKeyCourtValidator;
