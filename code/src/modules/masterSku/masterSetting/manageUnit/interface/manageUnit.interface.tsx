export interface IUnitItem {
    id: number;
    name: string;
    unit: string;
}

export interface IGetAllUnit {
    total: number;
    list: IUnitItem[];
}

export interface FormValueManageUnit {
    unitName: string;
    abbUnitName: string;
}

export type ICreatePopupMode = 'create' | 'view';

//------------------------------------------------------------

export interface IUnitItemRes {
    unit_id: string;
    unit_name: string;
    unit_short_name: string
}

export interface IGetAllUnitRes {
    units: IUnitItemRes[];
    total_pages: string;
    total_items: string;
}
