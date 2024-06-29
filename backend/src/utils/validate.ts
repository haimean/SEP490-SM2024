import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import CustomError from '../outcomes/customError';
const customMessages = {
  'string.base': '{#label} phải là một chuỗi ký tự',
  'string.empty': '{#label} không được để trống',
  'string.min': '{#label} phải có ít nhất {#limit} ký tự',
  'string.max': '{#label} không được vượt quá {#limit} ký tự',
  'number.base': '{#label} phải là một số',
  'number.integer': '{#label} phải là một số nguyên',
  'number.min': '{#label} phải lớn hơn hoặc bằng {#limit}',
  'number.max': '{#label} phải nhỏ hơn hoặc bằng {#limit}',
  'any.required': '{#label} là bắt buộc',
  'string.email': '{#label} không hợp lệ',
  'string.pattern.base': '{#label} sai định dạng',
};

const validate = (schema: ObjectSchema) => {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const validated = await schema
        .messages(customMessages)
        .validateAsync(req.body);
      req.body = validated;
      next();
    } catch (err: any) {
      //* Pass err to next
      // If validation error occurs call next with HTTP 422. Otherwise HTTP 500
      if (typeof err === 'object' && err?.isJoi) {
        next(new CustomError(err.message, 422));
      }
      next(new CustomError(err.message, 400));
    }
  };
};

// Tạo các thông báo lỗi tùy chỉnh cho các quy tắc

export default validate;
