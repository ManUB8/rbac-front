import { z, ZodType } from 'zod';

export const MasterStudentZod = z.object({
    student_code: z.string().min(1, { message: "กรุณากรอกรหัสนิสิต" }),
    first_name: z.string().min(1, { message: "กรุณากรอกชื่อจริง" }),
    last_name: z.string().min(1, { message: "กรุณากรอกนามสกุล" }),
    gender: z.string().min(1, { message: "กรุณาเลือกเพศ" }),
    prefix: z.string().min(1, { message: "กรุณาเลือกคำนำหน้า" }),
    user : z.object ({
        password: z.string().min(1, { message: "กรุณาตั้งรหัสผ่าน" }),
    })
});