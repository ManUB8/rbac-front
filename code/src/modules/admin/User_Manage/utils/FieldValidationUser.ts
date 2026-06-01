import { z } from "zod";

export const MasterUserZod = z
    .object({
        username: z
            .string()
            .min(1, "กรุณากรอกชื่อผู้ใช้"),
        role: z.string().min(1, "กรุณาเลือกบทบาท"),
        name:z.string().min(1, "กรุณากรอกชื่อ"),
        password: z.string().min(1, "กรุณากรอกรหัสผ่าน"),
        confirm_password: z.string().min(1, "กรุณายืนยันรหัสผ่าน"),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "รหัสผ่านไม่ตรงกัน",
        path: ["confirm_password"],
    });

export type MasterUserZodType = z.infer<typeof MasterUserZod>;