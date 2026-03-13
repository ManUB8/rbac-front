export interface ITabSelect {
    value: number;
    label: string;
}
[];

//---------------------------------------------------------------------------

export interface ISubGroup {
    id: number;
    name: string;
    code: string;
}

export interface IMainGroup {
    id: number;
    goupName: string;
    code: string;
    subList: ISubGroup[];
}

export interface IGetAllGroupMock {
    total: string; // จำนวนรวม sub ทั้งหมด
    list: IMainGroup[]; // กลุ่มหลักทั้งหมด
}

//------------------------------------------------------------------

export interface ICategoryInitial {
    category_type: string;
    category_type_name: string;
}

export interface ISubCategory {
    sub_category_id: string;
    sub_category_code: string;
    sub_category_name: string;
}

export interface ICategory {
    category_id: string;
    category_code: string;
    category_name: string;
    sub_category: ISubCategory[];
}

export interface IGetAllInven {
    initial_data: ICategoryInitial[];
    category: ICategory[];
    total_pages: string;
    total_items: string;
}
