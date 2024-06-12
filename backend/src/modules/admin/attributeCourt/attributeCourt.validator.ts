import Joi from 'joi';

const attributeCourtValidator = {
  update: Joi.object({
    attributeKeyCourtId: Joi.number().required(),
    value: Joi.string().required(),
  }),
  create: Joi.object({
    attributeKeyCourtId: Joi.number().required(),
    value: Joi.string().required(),
  }),
};

export default attributeCourtValidator;
