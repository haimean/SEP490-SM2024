import Joi from 'joi';

const typeCourtHostValidator = {
  create: Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    attributeCourtIds: Joi.array().items(Joi.number()),
  }),
};

export default typeCourtHostValidator;
