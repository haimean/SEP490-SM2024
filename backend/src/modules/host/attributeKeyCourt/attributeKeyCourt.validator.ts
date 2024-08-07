import Joi from 'joi';

const attributeCourtHostValidator = {
  create: Joi.object({
    attributeKeyCourtId: Joi.number().required(),
    value: Joi.string().required(),
  }),
};

export default attributeCourtHostValidator;
