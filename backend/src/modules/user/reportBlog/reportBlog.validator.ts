import Joi from 'joi';

const reportBlogUserValidator = {
  create: Joi.object({
    reason: Joi.string().required().label('Nôi dung'),
  }),
};

export default reportBlogUserValidator;
