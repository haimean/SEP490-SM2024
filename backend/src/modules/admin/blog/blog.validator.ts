import Joi from 'joi';

const blogAdminValidator = {
  blog: Joi.object({
    status: Joi.string().valid(
      'DRAFT',
      'PUBLISHED',
      'ARCHIVED',
      'BAN'
    ),
  }),
};

export default blogAdminValidator;
