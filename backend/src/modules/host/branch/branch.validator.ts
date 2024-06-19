import Joi from 'joi';
import validator from '../../index.validator';

const adminAccountValidator = {
  update: Joi.object({
    isActive: Joi.boolean(),
    role: Joi.boolean(),
    isAccept: Joi.boolean(),
    pagination: validator.pagination,
  }),
};

export default adminAccountValidator;
