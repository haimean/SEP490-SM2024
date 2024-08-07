import { AttributeCourt, AttributeKeyCourt } from '@prisma/client';
import database from '../../../lib/db.server';

const removeIdInObject = (data: any) => {
  delete data.id;
  delete data.createdAt;
  delete data.updatedAt;
  return data;
};

const attributeCourtKeyHostService = {
  getAttributeKeyCourtWithAttributes: async (attributeKeyCourtId: number, accountId: number): Promise<any> => {
    console.log(accountId);
    
    return await database.attributeKeyCourt.findFirst({
      where: {
        id: attributeKeyCourtId,
        isActive: true,
      },
      include: {
        attributeCourt: {
          where: {
            isActive: true,
            OR: [
              { isPublic: true },
              { accountId },
            ],
          },
        },
      },
    });
  },

  getAttributeKeyCourtsByAccountId: async (accountId: number): Promise<AttributeKeyCourt[]> => {
    const attributeCourts = await database.attributeCourt.findMany({
      where: {
        isActive: true,
        OR: [
          { isPublic: true },
          { accountId }
        ],
      },
      select: {
        attributeKeyCourt: true
      }
    });

    console.log(attributeCourts);

    // Lọc bỏ các giá trị null trước khi lọc các attributeKeyCourt trùng nhau
    const nonNullAttributeKeyCourts = attributeCourts
      .map(attrCourt => attrCourt.attributeKeyCourt)
      .filter((attrKeyCourt): attrKeyCourt is AttributeKeyCourt => attrKeyCourt !== null);

    const uniqueAttributeKeyCourts = nonNullAttributeKeyCourts.filter((attrKeyCourt, index, self) =>
      index === self.findIndex((t) => t.id === attrKeyCourt.id)
    );

    return uniqueAttributeKeyCourts;
  },
};

export default attributeCourtKeyHostService;
