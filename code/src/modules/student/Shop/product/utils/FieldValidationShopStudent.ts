import { z, ZodType } from 'zod';

export const MasterShopStudentZod = z.object({
    quantity: z.number().min(1, { message: "กรุณากรอก" }),
})