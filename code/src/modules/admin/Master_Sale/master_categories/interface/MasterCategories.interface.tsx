export interface ICategoryItem {
    category_id: string;
    category_name: string;
    is_active: boolean;
    created_at: number;
    updated_at: number;
    created_by_name: string;
    updated_by_name: string;
    actype?: string,
}

export interface ICategoryResponse {
    detail: string;
    data: ICategoryItem[];
}

export const ICategoryItemDefule:ICategoryItem={
    category_id: "0",
    category_name: "",
    is_active: true,
    created_at: 0,
    updated_at: 0,
    created_by_name: "",
    updated_by_name: ""
}



