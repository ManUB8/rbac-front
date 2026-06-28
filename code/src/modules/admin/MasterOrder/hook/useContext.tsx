import { atom } from "jotai";
import type { IOrderFilterRequest } from "../interface/MasterOrder.interface";

export const searchStateOrderContext = atom<IOrderFilterRequest>({
    search: "",
    student_code: "",
    order_status: "",
    payment_status: "",
    delivery_type: "",
    page: 1,
    limit: 20,
});