import Joi from 'joi';

const attributeCourtValidator = {
  update: Joi.object({
    attributeKeyBranchesId: Joi.number().required(),
    value: Joi.string().required(),
  }),
  create: Joi.object({
    attributeKeyBranchesId: Joi.number().required(),
    value: Joi.string().required(),
  }),
};

export default attributeCourtValidator;
