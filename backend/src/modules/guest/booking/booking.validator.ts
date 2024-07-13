import Joi from 'joi';
import validator from '../../index.validator';

const bookingGuestValidator = {
  getAllForUser: Joi.object({
    accountId: Joi.number().required().label('Người dùng'),
    pagination: validator.pagination,
  }),
};

export default bookingGuestValidator;
