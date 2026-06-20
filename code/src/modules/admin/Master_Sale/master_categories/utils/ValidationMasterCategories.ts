import { z } from 'zod';

export const MasterCategoryZod = z.object({
    category_name: z.string().min(1, { message: "กรุณากรอกชื่อหมวดหมู่" }),
});