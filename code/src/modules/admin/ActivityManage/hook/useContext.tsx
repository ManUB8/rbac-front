import { atom } from "jotai";
import type { IActivitySearch } from "../interface/ActivityManage.interface";

export const searchStateActivity = atom<IActivitySearch>({
    search: '',
    page: 1,
    limit: 20,
    activity_status: "",
    check_type: "",
    require_registration: "",
    hour_type_id: "",
    target_group: "",
});


