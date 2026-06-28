// import { z, ZodType } from 'zod';

// export const MasterStudentZod = z.object({
//     student_code: z.string().min(8, { message: "กรุณากรอกรหัสนิสิต" }),
//     first_name: z.string().min(1, { message: "กรุณากรอกชื่อจริง" }),
//     last_name: z.string().min(1, { message: "กรุณากรอกนามสกุล" }),
//     year_status: z.string().min(1, { message: "กรุณาเลือกชั้นปั" }),
//     gender: z.string().min(1, { message: "กรุณาเลือกเพศ" }),
//     prefix: z.string().min(1, { message: "กรุณาเลือกคำนำหน้า" }),
//     faculty_id: z.number().min(1, { message: "กรุณาเลือกคณะ" }),
//     major_id: z.number().min(1, { message: "กรุณาเลือกสาขา" }),
//         user: z.object({
//             username: z.string().min(1, "กรุณากรอกชื่อผู้ใช้"),
//             password: z.string().min(1, "กรุณากรอกรหัสผ่าน"),
//             confirm_password: z.string().min(1, "กรุณายืนยันรหัสผ่าน"),
//         }),
//     })
//     .refine((data) => data.user.password === data.user.confirm_password, {
//             message: "รหัสผ่านไม่ตรงกัน",
//             path: ["user", "confirm_password"],
//     });
    

import { z } from "zod";

export const MasterStudentZod = z
    .object({
        student_id: z.number().optional(),

        student_code: z.string().min(8, { message: "กรุณากรอกรหัสนิสิต" }),
        first_name: z.string().min(1, { message: "กรุณากรอกชื่อจริง" }),
        last_name: z.string().min(1, { message: "กรุณากรอกนามสกุล" }),
        year_status: z.string().min(1, { message: "กรุณาเลือกชั้นปี" }),
        gender: z.string().min(1, { message: "กรุณาเลือกเพศ" }),
        prefix: z.string().min(1, { message: "กรุณาเลือกคำนำหน้า" }),
        faculty_id: z.number().min(1, { message: "กรุณาเลือกคณะ" }),
        major_id: z.number().min(1, { message: "กรุณาเลือกสาขา" }),

        user: z.object({
            username: z.string().min(1, "กรุณากรอกชื่อผู้ใช้"),
            password: z.string().min(1, "กรุณากรอกรหัสผ่าน"),
            confirm_password: z.string().optional(),
        }),
    })
    .superRefine((data, ctx) => {
        const isCreate = !data.student_id;

        if (!isCreate) return;

        if (!data.user.confirm_password) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["user", "confirm_password"],
                message: "กรุณายืนยันรหัสผ่าน",
            });
            return;
        }

        if (data.user.password !== data.user.confirm_password) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["user", "confirm_password"],
                message: "รหัสผ่านไม่ตรงกัน",
            });
        }
    });