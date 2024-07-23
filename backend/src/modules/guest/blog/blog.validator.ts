import Joi from 'joi';
import validator from '../../index.validator';

const blogGuestValidator = {
  getAll: Joi.object({
    pagination: validator.pagination,
  }),
};

export default blogGuestValidator;
