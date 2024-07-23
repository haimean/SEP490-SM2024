import Joi from 'joi';
import validator from '../../index.validator';

const blogUserValidator = {
  blog: Joi.object({
    caption: Joi.string().required().label('Nội dung'),
  }),
  getAll: Joi.object({
    pagination: validator.pagination,
  }),
};

export default blogUserValidator;
