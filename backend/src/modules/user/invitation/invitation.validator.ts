import Joi from 'joi';

const invitationUserValidator = {
  requestsToTheMatch: Joi.object({
    postId: Joi.number().required().label('ID bài tìm gia lưu'),
  }),
  createInvitePlayer: Joi.object({
    idCreate: Joi.number().required().label('ID người mời'),
    idInvite: Joi.number().required().label('ID tham gia'),
    postId: Joi.number().required().label('ID bài tìm gia lưu'),
  }),
};

export default invitationUserValidator;
