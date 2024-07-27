// src/notificationService.ts
import { Notification, StatusNotification } from '@prisma/client';
import { databaseFirebase } from './firebaseConfig';
import {
  equalTo,
  onValue,
  orderByChild,
  query,
  ref,
  remove,
  set,
} from 'firebase/database';
import { randomUUID } from 'crypto';

// Function to create notifications from an array
export const createNotifications = async (
  notifications: Notification[]
): Promise<void> => {
  for (let notification of notifications) {
    const { accountId, message, url, createdAt }: Notification =
      notification;
    set(ref(databaseFirebase, 'users/' + randomUUID()), {
      accountId,
      message,
      createdAt: new Date(),
      status: 'SEED',
      url,
    });
  }
};
