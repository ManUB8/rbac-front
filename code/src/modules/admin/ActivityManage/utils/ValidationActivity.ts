import { z, ZodType } from 'zod';

export const ActivityZod = z.object({
    activity_name: z.string().min(1, { message: "กรุณากรอกชื่อสินค้ากลาง" }),
});