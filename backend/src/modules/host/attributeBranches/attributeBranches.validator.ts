import Joi from 'joi';

const attributeBranchesHostValidator = {
  create: Joi.object({
    attributeKeyBranchesId: Joi.number().required(),
    value: Joi.string().required(),
  }),
};

export default attributeBranchesHostValidator;
