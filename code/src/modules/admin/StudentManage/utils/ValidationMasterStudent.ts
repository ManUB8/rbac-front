import { z, ZodType } from 'zod';

export const MasterStudentZod = z.object({
    student_code: z.string().min(1, { message: "กรุณากรอกชื่อสินค้ากลาง" }),
});