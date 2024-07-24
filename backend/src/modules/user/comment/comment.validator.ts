import Joi from 'joi';

const commentUserValidator = {
  create: Joi.object({
    blogId: Joi.number().required().label('ID bài viết '),
    content: Joi.string().required().label('nội dung'),
  }),
};

export default commentUserValidator;
