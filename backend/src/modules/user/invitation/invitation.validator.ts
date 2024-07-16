import Joi from 'joi';

const invitationUserValidator = {
  create: Joi.object({
    userAvailabilityId: Joi.number()
      .required()
      .label('ID bài viết tìm trận'),
    postId: Joi.number().required().label('ID bài tìm gia lưu'),
  }),
};

export default invitationUserValidator;
