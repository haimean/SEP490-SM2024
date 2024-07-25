import Joi from 'joi';
import validator from '../../index.validator';

const blogAdminValidator = {
  getAllReport: Joi.object({
    pagination: validator.pagination,
  }),
};

export default blogAdminValidator;
