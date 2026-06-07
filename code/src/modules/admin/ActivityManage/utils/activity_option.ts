import type { IActivityType, ICheckType, IGroupType } from "../interface/ActivityManage.interface";


export const Check_type: ICheckType[] = [
    {
        label: "เช็คอินอย่างเดียว",
        id: "checkin_only"
    },
    {
        label: "เช็คเอาท์อย่างเดียว",
        id: "checkout_only"
    },
    {
        label: "เช็คอิน / เช็คเอาท์",
        id: "checkin_checkout"
    }
]

export const Activity_status: IActivityType[] = [
    {
        label: "เปิด",
        id: "true"
    },
    {
        label: "ปิด",
        id: "false"
    },
]
export const Require_registration: IActivityType[] = [
    {
        label: "ต้องลงทะเบียนก่อน",
        id: "true"
    },
    {
        label: "เข้าร่วมได้เลย",
        id: "false"
    },
]

export const target_group: IGroupType [] = [
        {
            label: "ทั้งหมด",
            id: "all",
        },
        {
            label: "นิสิตใหม่",
            id: "freshman",
        },
        {
            label: "รุ่นพี่",
            id: "senior",
        },
    ];

