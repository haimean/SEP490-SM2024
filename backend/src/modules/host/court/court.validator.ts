import Joi from 'joi';

const courtHostValidator = {
  create: Joi.object({
    name: Joi.string().required(),
    branchesId: Joi.number().required(),
    typeCourtId: Joi.number().required(),
  }),
  update: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    branchesId: Joi.number().required(),
    typeCourtId: Joi.number().required(),
  }),
};

export default courtHostValidator;
