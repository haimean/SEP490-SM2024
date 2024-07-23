import Joi from 'joi';

const blogUserValidator = {
  blog: Joi.object({
    caption: Joi.string().required().label('Nội dung'),
  }),
};

export default blogUserValidator;
