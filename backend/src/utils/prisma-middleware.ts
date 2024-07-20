import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';

const timezoneOffset = 7; // UTC+7

const dateTimeMiddleware: Prisma.Middleware = async (
  params,
  next
) => {
  // Trước khi lưu dữ liệu vào database, chuyển đổi sang UTC
  if (params.action === 'create' || params.action === 'update') {
    const data = params.args.data;

    for (const key in data) {
      if (data[key] instanceof Date) {
        data[key] = dayjs(data[key])
          .subtract(timezoneOffset, 'hour')
          .toDate();
      }
    }
  }

  const result = await next(params);

  // Sau khi lấy dữ liệu từ database, chuyển đổi sang UTC+7
  if (
    params.action === 'findUnique' ||
    params.action === 'findMany' ||
    params.action === 'findFirst'
  ) {
    const convertDateToTimezone = (date: any) =>
      dayjs(date).add(timezoneOffset, 'hour').toISOString();

    const convertResult = (item: any) => {
      for (const key in item) {
        if (item[key] instanceof Date) {
          item[key] = convertDateToTimezone(item[key]);
        }
      }
    };

    if (Array.isArray(result)) {
      result.forEach(convertResult);
    } else {
      convertResult(result);
    }
  }

  return result;
};

export default dateTimeMiddleware;
