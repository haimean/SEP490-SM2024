import Joi from 'joi';

const invitationUserValidator = {
  requestsToTheMatch: Joi.object({
    postId: Joi.number().required().label('ID bài tìm gia lưu'),
  }),
};

export default invitationUserValidator;
