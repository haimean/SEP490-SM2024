import Joi from 'joi';

const reviewUserValidator = {
  create: Joi.object({
    accountRecipientId: Joi.number()
      .required()
      .label('ID người dùng'),
    rating: Joi.number().required().max(5).min(1).label('Số sao'),
    comment: Joi.string().required().label('Nội dung đánh giá'),
  }),
};

export default reviewUserValidator;
