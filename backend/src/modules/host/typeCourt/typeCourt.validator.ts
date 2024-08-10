import Joi from 'joi';
import regex from '../../../utils/regex';

const typeCourtHostValidator = {
  create: Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    attributeCourtIds: Joi.array().items(Joi.number()),
    priceTypeCourt: Joi.array().items(
      Joi.object({
        startTime: Joi.string()
          .regex(regex.time)
          .required()
          .label('Giờ bắt đầu'),
        endTime: Joi.string()
          .regex(regex.time)
          .required()
          .label('Giờ kết thúc'),
        times: Joi.number().required().label('Số lần lặp'),
        price: Joi.number().required().label('Giá'),
      })
    ),
  }),
  createPrice: Joi.object({
    data: Joi.array().items(
      Joi.object({
        startTime: Joi.date().required().label('Giờ bắt đầu'),
        endTime: Joi.date().required().label('Giờ kết thúc'),
        times: Joi.number().required().label('Số lần lặp'),
        price: Joi.number().required().label('Giá'),
      })
    ),
  }),
  updatePrice: Joi.object({
    data: Joi.array().items(
      Joi.object({
        startTime: Joi.date().required().label('Giờ bắt đầu'),
        endTime: Joi.date().required().label('Giờ kết thúc'),
        times: Joi.number().required().label('Số lần lặp'),
        price: Joi.number().required().label('Giá'),
        id: Joi.number().required().label('Id'),
      })
    ),
  }),
  deletePrice: Joi.object({
    data: Joi.array().items(
      Joi.object({
        id: Joi.number().required().label('Id'),
      })
    ),
  }),
};

export default typeCourtHostValidator;
