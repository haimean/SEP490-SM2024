import Joi from 'joi';
import validator from '../../index.validator';
import regex from '../../../utils/regex';

const bookingUserValidator = {
  getAllForUser: Joi.object({
    pagination: validator.pagination,
  }),
  create: Joi.object({
    data: Joi.array().items(
      Joi.object({
        courtId: Joi.number().required().label('Thông tin sân'),
        startTime: Joi.date().required().label('Giờ bắt đầu'),
        endTime: Joi.date().required().label('Giờ kết thúc'),
        price: Joi.number().required().label('Tổng tiền'),
        name: Joi.string().required().label('Người đặt sân'),
        numberPhone: Joi.string()
          .regex(regex.phoneNumber)
          .required()
          .label('Số điện thoại'),
      })
    ),
  }),
};

export default bookingUserValidator;
