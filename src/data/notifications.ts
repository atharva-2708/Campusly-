import { Notification } from '../types';

export const sampleNotifications: Notification[] = Array.from({ length: 15 }, (_, i) => ({
  id: `notif-${i + 1}`,
  title: `Notification ${i + 1}`,
  message: 'This is an important system notification regarding your academic status.',
  type: i % 4 === 0 ? 'announcement' : i % 4 === 1 ? 'deadline' : i % 4 === 2 ? 'resource' : 'academic',
  date: `2024-10-${10 + (i % 20)}`,
  read: i > 5
}));
