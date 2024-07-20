import Joi from 'joi';

const bookingHostValidator = {
  cancel: Joi.object({
    bookingId: Joi.number().required().label('Ca đặt sân'),
    reasonCancell: Joi.string().required().label('Lý do'),
  }),
};

export default bookingHostValidator;
