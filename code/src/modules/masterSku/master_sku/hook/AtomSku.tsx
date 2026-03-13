import { atom } from "jotai";
import type { ISearchMasterSkuContext } from "../interface/MadterSku.interface";


export const searchStateSku = atom<ISearchMasterSkuContext>({
    page: '1',
    limit: '20',
    search: '',
    sort_by: '',
    status: 'all',
    sub_category_ids: []
});

