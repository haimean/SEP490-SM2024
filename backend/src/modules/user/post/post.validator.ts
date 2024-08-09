import Joi from 'joi';

const postUserValidator = {
  create: Joi.object({
    bookingId: Joi.number().required().label('Đặt sân'),
    description: Joi.string().label('Mô tả'),
    title: Joi.string().label('Title'),
    numberMember: Joi.number().required().label('Số người thiếu'),
    memberPost: Joi.array()
      .items(
        Joi.object({
          genderPost: Joi.string().valid('MALE', 'FEMALE', 'OTHER'),
          level: Joi.string().valid('Y', 'TB', 'K', 'T', 'CN'),
          price: Joi.string().label('Giá tiền'),
        })
      )
      .label('Thông tin người chơi'),
  }),
};

export default postUserValidator;
