import Joi from 'joi';

const attributeKeyBranchesValidator = {
  update: Joi.object({
    name: Joi.string().required().label('Tên thuộc tính của cơ sở'),
    description: Joi.string().label('Miêu tả thuộc tính của cơ sở'),
    isActive: Joi.boolean().required().label('Tình trạng Kích hoạt'),
  }),
  create: Joi.object({
    name: Joi.string().required().label('Tên thuộc tính của cơ sở'),
    description: Joi.string().label('Miêu tả thuộc tính của cơ sở'),
  }),
};

export default attributeKeyBranchesValidator;
