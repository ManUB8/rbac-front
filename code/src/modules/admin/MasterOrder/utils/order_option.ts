export const ownerTypeText = {
    club: "ชมรม",
    faculty: "คณะ",
    major: "สาขาวิชา",
    external: "หน่วยงานภายนอก",
};

export const movementTypeText = {
    increase: "เพิ่มสต๊อก",
    decrease: "ลดสต๊อก",
    sale: "ขายสินค้า",
    cancel_return: "คืนสต๊อกจากการยกเลิก",
    adjust: "ปรับปรุงสต๊อก",
};

export const orderStatusText = {
    pending_payment: "รอชำระเงิน",
    paid: "ชำระเงินแล้ว",
    preparing: "กำลังเตรียมสินค้า",
    ready_for_pickup: "พร้อมรับสินค้า",
    shipping: "กำลังจัดส่ง",
    completed: "สำเร็จ",
    cancelled: "ยกเลิกคำสั่งซื้อ",
};

export const paymentStatusText = {
    waiting_payment: "รอชำระเงิน",
    pending_verification: "รอตรวจสอบสลิป",
    paid: "ชำระเงินสำเร็จ",
    rejected: "สลิปไม่ผ่านการตรวจสอบ",
    expired: "หมดเวลาชำระเงิน",
    cancelled: "ยกเลิกการชำระเงิน",
};

export const orderStatusColor = {
    pending_payment: "warning",
    paid: "success",
    preparing: "info",
    ready_for_pickup: "secondary",
    shipping: "primary",
    completed: "success",
    cancelled: "error",
} as const;

export const paymentStatusColor = {
    waiting_payment: "warning",
    pending_verification: "info",
    paid: "success",
    rejected: "error",
    expired: "default",
    cancelled: "default",
} as const;