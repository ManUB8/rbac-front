import type { IMovementType  } from "../interface/MasterVariants.interface";

export const movement_type : IMovementType[] = [
    {
        label:"เพิ่มสินค้าเข้าคลัง",
        id : "increase"
    },
    {
        label:"แอดมินลดยอดเอง",
        id : "decrease"
    },
    {
        label:"นิสิตซื้อสินค้า",
        id : "sale"
    },
    {
        label:"ยกเลิกออเดอร์ / คืนสินค้า",
        id : "cancel_return"
    },
    {
        label:"ตรวจนับสต๊อกแล้วแก้ยอด",
        id : "adjust"
    }

]