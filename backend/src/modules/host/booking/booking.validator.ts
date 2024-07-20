import Joi from 'joi';
import validator from '../../index.validator';

const bookingHostValidator = {
  cancel: Joi.object({
    bookingId: Joi.number().required().label('Ca đặt sân'),
    reasonCancell: Joi.string().required().label('Lý do'),
  }),
  history: Joi.object({
    pagination: validator.pagination,
    sort: validator.sort(['startTime']),
    branchesId: Joi.number().required().label('Cơ sở sân'),
  }),
};

export default bookingHostValidator;
