import Joi from 'joi';

const userAvailableValidator = {
  getRequestListJoin: Joi.object({
    status: Joi.string()
      .required()
      .valid('ACCEPT', 'NOACCEPT', 'CANCEL', 'NEW')
      .label('Trạng thái'),
  }),
};
export default userAvailableValidator;
