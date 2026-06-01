import { atom } from "jotai";
import type { IUserSearchPayload } from "../interface/User_Manage.interface";

export const searchStateUser = atom<IUserSearchPayload>({
    search: '',
    page: 1,
    limit: 20,
    role: ''
});
