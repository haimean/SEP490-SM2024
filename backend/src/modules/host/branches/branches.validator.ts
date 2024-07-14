import Joi from 'joi';
import regex from '../../../utils/regex';

const branchesHostValidator = {
  create: Joi.object({
    name: Joi.string().required().label('Tên'),
    attributeBranches: Joi.array()
      .items(Joi.number())
      .label('Thuộc tính'),
    court: Joi.array().items(Joi.number()).label('Danh sách sân'),
    description: Joi.string().label('Mô tả'),
    phone: Joi.string()
      .regex(regex.phoneNumber)
      .required()
      .label('Số điện thoại'),
    email: Joi.string().email().label('email'),
    openingHours: Joi.string()
      .regex(regex.time)
      .required()
      .label('Giờ mở cửa'),
    closingHours: Joi.string()
      .regex(regex.time)
      .required()
      .label('Giờ đóng cửa'),
    longitude: Joi.string()
      .regex(regex.coordinates)
      .required()
      .label('Kinh độ'),
    latitude: Joi.string()
      .regex(regex.coordinates)
      .required()
      .label('Vĩ độ'),
    provinces: Joi.string().required().label('Tỉnh'),
    districts: Joi.string().required().label('Huyện'),
    wards: Joi.string().required().label('Xã'),
    detail: Joi.string().required().label('Chi tiết'),
  }),

  update: Joi.object({
    name: Joi.string().label('Tên'),
    attributeBranches: Joi.array()
      .items(Joi.number())
      .label('Thuộc tính'),
    court: Joi.array().items(Joi.number()).label('Danh sách sân'),
    description: Joi.string().label('Mô tả'),
    phone: Joi.string()
      .regex(regex.phoneNumber)
      .label('Số điện thoại'),
    email: Joi.string().email().label('Số điện thoại'),
    openingHours: Joi.string().regex(regex.time).label('Giờ mở cửa'),
    closingHours: Joi.string()
      .regex(regex.time)
      .label('Giờ đóng cửa'),
  }),
};

export default branchesHostValidator;
