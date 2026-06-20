import { atom } from "jotai";
import type { IProductSearchRequest } from "../interface/MasterProduct.interface";

export const searchStateProductContext = atom<IProductSearchRequest>({
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