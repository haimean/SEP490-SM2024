import Joi from 'joi';

const blogHostValidator = {
  blog: Joi.object({
    title: Joi.string().required().label('Tiêu đề'),
    content: Joi.string().required().label('Nội dung'),
    status: Joi.string().valid(
      'DRAFT',
      'PUBLISHED',
      'ARCHIVED',
      'BAN'
    ),
  }),
};

export default blogHostValidator;
