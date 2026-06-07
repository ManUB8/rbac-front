import { z, ZodType } from 'zod';

export const MasterFacultyZod = z.object({
    faculty_name: z.string().min(1, { message: "กรุณากรอกคณะที่ต้องการเพิ่ม" }),
});
export const MasterMajorZod = z.object({
    major_name: z.string().min(1, { message: "กรุณากรอกสาขาที่ต้องการเพิ่ม" }),
});