import Joi from 'joi';

const attributeCourtValidator = {
  update: Joi.object({
    attributeKeyCourtId: Joi.number().required(),
<<<<<<< HEAD
    value: Joi.string().required(),
  }),
  create: Joi.object({
    attributeKeyCourtId: Joi.number().required(),
=======
>>>>>>> af76acbafeae61e3460621430efa575dcc8b8bfa
    value: Joi.string().required(),
  }),
  create: Joi.object({
    attributeKeyCourtId: Joi.number().required(),
    value: Joi.string().required(),
  }),
};

export default attributeCourtValidator;
