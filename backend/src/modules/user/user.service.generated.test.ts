import database from '../../lib/db.server';
import { ProfileUpdatePayload } from './user.model';
import userService from './user.service';

jest.mock('../../lib/db.server', () => ({
  user: {
    update: jest.fn(),
  },
}));

describe('userService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('updateProfile', () => {
    it('should update the user profile and return the updated user with account included', async () => {
      const mockUpdatedUser = {
        id: 1,
        accountId: 1,
        fullName: 'Updated Name',
        gender: 'MALE',
        identifierCode: '',
        avatar: 'updatedAvatar.jpg',
        dob: new Date('1990-01-01'),
        numberPhone: '1234567890',
        account: { id: 1, email: 'test@example.com' },
      };

      const updatePayload: ProfileUpdatePayload = {
        name: 'Updated Name',
        gender: 'MALE',
        image: 'updatedAvatar.jpg',
        dob: new Date('1990-01-01'),
        numberPhone: '1234567890',
      };

      (database.user.update as jest.Mock).mockResolvedValue(
        mockUpdatedUser
      );

      const result = await userService.updateProfile(
        1,
        updatePayload
      );

      expect(database.user.update).toHaveBeenCalledWith({
        where: {
          accountId: 1,
        },
        data: {
          fullName: updatePayload.name,
          gender: updatePayload.gender,
          identifierCode: '',
          avatar: updatePayload.image,
          dob: updatePayload.dob,
          numberPhone: updatePayload.numberPhone,
        },
        include: { account: true },
      });
      expect(result).toEqual(mockUpdatedUser);
    });
  });
});
