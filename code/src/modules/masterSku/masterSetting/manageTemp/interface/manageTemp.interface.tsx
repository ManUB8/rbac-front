export interface ITempItem {
    id: number;
    name: string;
    temp: string;
}

export interface IGetAllTemp {
    total: number;
    list: ITempItem[];
}

export interface FormValueManageTemp {
    name: string;
    temp: string;
}

export type ICreatePopupMode = 'create' | 'view'

//--------------------------------------------------------------

export interface IStorageTypeItemRes {
    storage_type_id: string;
    storage_type_name: string;
    temperature_type: string;
}

export interface IGetAllStorageTypeRes {
    storage_types: IStorageTypeItemRes[];
    total_items: string;
    total_pages: string;
}
