import Joi from 'joi';
import validator from '../../index,validator';

const adminAccountValidator = {
  update: Joi.object({
    sort: validator.sort(['isActive', 'role', 'isAccept']),
    pagination: validator.pagination,
  }),
};

export default adminAccountValidator;
