import Joi from 'joi';

const attributeKeyBranchesValidator = {
  update: Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    isActive: Joi.boolean().required(),
  }),
  create: Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
  }),
};

export default attributeKeyBranchesValidator;
