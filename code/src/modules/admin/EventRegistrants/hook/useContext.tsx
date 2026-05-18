import { atom } from "jotai";
import type { IEventRegistrantsRequest } from "../interface/EventRegistrants.interface";


export const searchStateEventRegistrants = atom<IEventRegistrantsRequest>({
    activity_id: "",
    search: "",
    student_code: "",
    page: 1,
    limit: 20,
    year_status: "",
    faculty_id: "",
    major_id: ""
});


