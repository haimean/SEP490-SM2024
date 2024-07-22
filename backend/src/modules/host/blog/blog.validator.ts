import Joi from 'joi';

const blogHostValidator = {
  blog: Joi.object({
    caption: Joi.string().required().label('Nội dung'),
  }),
};

export default blogHostValidator;
