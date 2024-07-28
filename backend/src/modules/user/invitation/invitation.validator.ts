import Joi from 'joi';
import validator from '../../index.validator';

const invitationUserValidator = {
  create: Joi.object({
    userAvailabilityId: Joi.number()
      .required()
      .label('ID bài viết tìm trận'),
    postId: Joi.number().required().label('ID bài tìm gia lưu'),
  }),
  createInvitePlayer: Joi.object({
    postId: Joi.number().required().label('ID bài tìm gia lưu'),
  }),
  getAllUnavailable: Joi.object({
    pagination: validator.pagination,
  }),
  getUnavailableOfUser: Joi.object({
    pagination: validator.pagination,
  }),
  update: Joi.object({
    invitationId: Joi.number().required().label('ID lời mời'),
    status: Joi.string()
      .required()
      .valid('ACCEPT', 'NOACCEPT', 'CANCEL')
      .label('Trạng thái'),
    reasonCancel: Joi.string().label('Lý do'),
  }),
  getAvailableOfUser: Joi.object({
    postId: Joi.number().required().label('ID bài tìm gia lưu'),
  }),
};

export default invitationUserValidator;
