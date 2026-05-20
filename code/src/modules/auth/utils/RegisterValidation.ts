import { z } from "zod";

export const RegisterZod = z.object({
  student_code: z.string().min(1, { message: "กรุณากรอกรหัสนิสิต" }),
  prefix: z.string().min(1, { message: "กรุณาระบุคำนำหน้า" }),
  first_name: z.string().min(1, { message: "กรุณากรอกชื่อจริง" }),
  last_name: z.string().min(1, { message: "กรุณากรอกนามสกุล" }),
  gender: z.string().min(1, { message: "กรุณาเลือกเพศ" }),
  year_status: z.string().min(1, { message: "กรุณาเลือกชั้นปีการศึกษา" }),
  faculty_name: z.string().min(1, { message: "กรุณาเลือกคณะ" }),
  major_name: z.string().min(1, { message: "กรุณาเลือกสาขา" }),

  user: z.object({
    username: z.string().min(1, { message: "กรอกรหัสนิสิต คือ Username" }),
    password: z.string().min(1, { message: "กรุณากรอก Password" }),
  }),
});