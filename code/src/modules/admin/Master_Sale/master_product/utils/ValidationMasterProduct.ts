import { z } from 'zod';

export const MasterProductZod = z.object({
    product_name: z.string().min(1, { message: "กรุณากรอกชื่อ" }),
});