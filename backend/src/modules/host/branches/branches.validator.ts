import Joi from 'joi';
import validator from '../../index.validator';

const branchesHostValidator = {
  update: Joi.object({
    isActive: Joi.boolean(),
    role: Joi.boolean(),
    pagination: validator.pagination,
  }),
  create: Joi.object({
    name: Joi.string().required(),
    attributeBranches: Joi.array().items(Joi.number()),
    court: Joi.array().items(Joi.number()),
    addressLongitude: Joi.string().required(),
    addressLatitude: Joi.string().required(),
    description: Joi.string(),
    image: Joi.any(),
  }),
};

export default branchesHostValidator;
