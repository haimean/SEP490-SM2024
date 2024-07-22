import Joi from 'joi';
import validator from '../../index.validator';
import regex from '../../../utils/regex';

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
  create: Joi.object({
    courtId: Joi.number().required().label('Thông tin sân'),
    startTime: Joi.date().required().label('Giờ bắt đầu'),
    endTime: Joi.date().required().label('Giờ kết thúc'),
    price: Joi.number().required().label('Tổng tiền'),
    name: Joi.string().required().label('Người đặt sân'),
    numberPhone: Joi.string()
      .regex(regex.phoneNumber)
      .required()
      .label('Số điện thoại'),
  }),
  getAForWeek: Joi.object({
    date: Joi.date().required().label('Giờ bắt đầu'),
  }),
  update: Joi.object({
    startTime: Joi.date().label('Giờ bắt đầu'),
    endTime: Joi.date().label('Giờ kết thúc'),
    price: Joi.number().label('Tổng tiền'),
    name: Joi.string().label('Người đặt sân'),
    numberPhone: Joi.string()
      .regex(regex.phoneNumber)
      .label('Số điện thoại'),
  }),
};

export default bookingHostValidator;
