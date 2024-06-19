import Joi from 'joi';
const validator = {
  pagination: Joi.object({
    page: Joi.number().required().label('Trang'),
    perPage: Joi.number().required().label('Số bản ghi'),
  }),
  sort: (keys: string[]) => {
    type SortSchemaType = {
      [K in (typeof keys)[number]]: Joi.StringSchema;
    };
    return Joi.object(
      keys.reduce((schema, key) => {
        schema[key] = Joi.string()
          .valid('asc', 'desc')
          .label('Trường');
        return schema;
      }, {} as SortSchemaType)
    );
  },
};

export default validator;
