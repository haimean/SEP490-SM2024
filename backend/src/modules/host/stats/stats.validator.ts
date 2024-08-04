import Joi from 'joi';

const statsValidator = {
  getMonthlyStats: Joi.object({
    branchId: Joi.number().required(),
    month: Joi.date().required(), // Expects a date within the month you want to get stats for
  }),
};

export default statsValidator;
