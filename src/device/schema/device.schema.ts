import { z } from 'zod';

export const DeviceSchema = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  userAgent: z.string().min(1).max(1000), // Giới hạn độ dài cho userAgent
  ip: z.string().ip(), // Kiểm tra địa chỉ IP hợp lệ
  lastActive: z.date(),
  createdAt: z.date(),
  isActive: z.boolean(),
});
