import Joi from 'joi';
import validator from '../../index.validator';

const bookingUserValidator = {
  getAllForUser: Joi.object({
    pagination: validator.pagination,
  }),
};

export default bookingUserValidator;
