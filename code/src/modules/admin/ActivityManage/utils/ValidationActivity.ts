import { z, ZodType } from 'zod';

export const ActivityZod = z.object({
    activity_name: z.string().min(1, { message: "กรุณากรอกชื่อกิจกรรม" }),
    activity_date: z.string().min(1, { message: "กรุณาระบุวันที่" }),
    hours: z.number().min(1, { message: "กรุณากรอกชั่วโมง" }),
    start_time: z.string().min(1, { message: "กรุณาระบุเวลาเริ่มกิจกรรม" }),
    end_time: z.string().min(1, { message: "กรุณาระบุเวลาจบกิจกรรม" }),
    location: z.string().min(1, { message: "กรุณาระบุสถานที่" }),
    activity_img: z.string().min(1, { message: "กรุณาใส่รูปกิจกรรม" }),
    check_type: z.string().min(1, { message: "กรุณาใส่ประเภทการเช็ค" }),
    max_participants: z.number().min(1, { message: "กรุณากรอกจำนวนรับผู้เข้าร่วมกิจกรรม" }),
    hour_type_id: z.string().min(1, { message: "กรุณากรอกจำนวนรับผู้เข้าร่วมกิจกรรม" }),
    activity_lat: z.number().min(1, { message: "กรุณากรอกจ Latitude" }),
    activity_lng: z.number().min(1, { message: "กรุณากรอก Longitude" }),
});

