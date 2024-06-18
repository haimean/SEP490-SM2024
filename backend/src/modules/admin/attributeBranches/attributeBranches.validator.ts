import Joi from 'joi';

const attributeBranchesValidator = {
  update: Joi.object({
    attributeKeyBranchesId: Joi.number()
      .required()
      .label('Mã thuộc tính của cơ sở'),
    value: Joi.string()
      .required()
      .label('Giá trị thuộc tính của cơ sở'),
    isActive: Joi.boolean().required().label('Tình trạng Kích hoạt'),
  }),
  create: Joi.object({
    attributeKeyBranchesId: Joi.number()
      .required()
      .label('Mã thuộc tính của cơ sở'),
    value: Joi.string().label('Giá trị thuộc tính của cơ sở'),
  }),
};

export default attributeBranchesValidator;
