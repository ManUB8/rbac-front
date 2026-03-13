import { atom } from "jotai";
import { IOwnerItemDefault, type IOwnerItem, type ISearchContext } from "../interface/Owner.interface";
import type { IBranchItem } from "../../branch/interface/Branch.interface";


export const searchStateOwner = atom<ISearchContext>({
    owner_search: '',
    owner_type_id: '',
    user_type_id: '',
    food_type_id: '',
    count_active_type: '0',
    branch_type_id: '',
    branch_active_type: '',
    sort: '',
    package_main_name: '',
    addon_package_name: '',
    page: 1,
    limit: 20,
});

export const OwnerState = atom<IOwnerItem>(IOwnerItemDefault);
export const BranchState = atom<IBranchItem>();

