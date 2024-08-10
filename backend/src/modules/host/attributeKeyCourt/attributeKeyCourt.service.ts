import { PrismaClient, AttributeKeyCourt } from '@prisma/client';

const database = new PrismaClient();

interface CreateAttributeKeyCourtInput {
  name: string;
  description?: string;
  accountId: number;
  value: string;
  typeCourtId: number;
}

const attributeCourtKeyHostService = {
  // Lấy AttributeKeyCourt cùng với các AttributeCourt của nó
  getAttributeKeyCourtWithAttributes: async (
    attributeKeyCourtId: number,
    accountId: number
  ): Promise<any> => {
    return await database.attributeKeyCourt.findFirst({
      where: {
        id: attributeKeyCourtId,
        isActive: true,
      },
      include: {
        attributeCourt: {
          where: {
            isActive: true,
            OR: [{ isPublic: true }, { accountId }],
          },
        },
      },
    });
  },

  // Lấy danh sách AttributeKeyCourts theo AccountId
  getAttributeKeyCourtsByAccountId: async (
    accountId: number
  ): Promise<AttributeKeyCourt[]> => {
    return await database.attributeKeyCourt.findMany({
      where: {
        isActive: true,
      },
      include: {
        attributeCourt: {
          where: {
            isActive: true,
            OR: [
              { isPublic: true },
              { isPublic: false, accountId: accountId },
            ],
          },
        },
      },
    });
  },

  // Tạo AttributeKeyCourt và AttributeCourt liên kết với TypeCourt
  createAttributeKeyCourtAndAttributeCourt: async ({
    name,
    description,
    accountId,
    value,
    typeCourtId,
  }: CreateAttributeKeyCourtInput): Promise<AttributeKeyCourt> => {
    // Tạo AttributeKeyCourt mới
    const newAttributeKeyCourt =
      await database.attributeKeyCourt.create({
        data: {
          name,
          description,
          isActive: true,
        },
      });

    // Tạo AttributeCourt mới và liên kết với AttributeKeyCourt và TypeCourt
    await database.attributeCourt.create({
      data: {
        value,
        isActive: true,
        account: {
          connect: { id: accountId },
        },
        court: {
          connect: { id: typeCourtId },
        },
        attributeKeyCourt: {
          connect: { id: newAttributeKeyCourt.id },
        },
      },
    });

    // Trả về AttributeKeyCourt đã được tạo cùng với các AttributeCourt liên quan
    const result = await database.attributeKeyCourt.findUnique({
      where: { id: newAttributeKeyCourt.id },
      include: { attributeCourt: true },
    });

    if (!result) {
      throw new Error(
        `AttributeKeyCourt with id ${newAttributeKeyCourt.id} not found`
      );
    }

    return result;
  },
};

export default attributeCourtKeyHostService;
