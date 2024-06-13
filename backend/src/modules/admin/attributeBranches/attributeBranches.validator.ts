import Joi from 'joi';

const attributeBranchesValidator = {
  update: Joi.object({
    attributeKeyBranchesId: Joi.number().required(),
    value: Joi.string().required(),
    isActive: Joi.boolean().required(),
  }),
  create: Joi.object({
    attributeKeyBranchesId: Joi.number().required(),
    value: Joi.string().required(),
  }),
};

export default attributeBranchesValidator;
