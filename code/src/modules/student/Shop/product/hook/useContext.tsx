import { atom } from "jotai";
import type { IStudentProductSearchRequest } from "../interface/ShopStudent.interface";

export const searchStateStudentProductContext = atom<IStudentProductSearchRequest>({
    search: "",
    category_id: "",
    owner_type: "",
    faculty_id: "",
    major_id: "",
    is_limited: "",
    active_only: "",
    page: 1,
    limit: 20,
});