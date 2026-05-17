import { z, ZodType } from 'zod';

export const ActivityZod = z.object({
    activity_name: z.string().min(1, { message: "กรุณากรอกชื่อกิจกรรม" }),
    // activity_date: z.number().min(1, { message: "กรุณาระบุวันที่" }),
    // hours: z.number().min(1, { message: "กรุณากรอกชั่วโมง" }),
    // start_time: z.number().min(1, { message: "กรุณาระบุเวลาเริ่มกิจกรรม" }),
    // end_time: z.number().min(1, { message: "กรุณาระบุเวลาจบกิจกรรม" }),
    // location: z.string().min(1, { message: "กรุณาระบุสถานที่" }),
    // activity_img: z.string().min(1, { message: "กรุณาใส่รูปกิจกรรม" }),
});

