import Joi from 'joi';
const validator = {
  pagination: Joi.object({
    page: Joi.boolean(),
    perPage: Joi.boolean(),
  }),
  sort: (keys: string[]) => {
    type SortSchemaType = {
      [K in (typeof keys)[number]]: Joi.StringSchema;
    };
    return Joi.object(
      keys.reduce((schema, key) => {
        schema[key] = Joi.string().valid('asc', 'desc');
        return schema;
      }, {} as SortSchemaType)
    );
  },
};

export default validator;
