export interface IUserSearchPayload {
    search: string;
    page: number;
    limit: number;
    role: string;
}

export interface IUserDeletePayload {
    deleted_by_name: string;
    deleted_user_id: number;
}

export interface IUser {
    user_id: number;
    username: string;
    password: string;
    confirm_password?: string;
    role: string;
    name: string;
    is_active: boolean;
    created_by_id: number | null;
    created_by_name: string;
    updated_by_id: number | null;
    updated_by_name: string;
    created_at: number;
    updated_at: number;
}

export interface IUserTotalRole {
    temporary_admin: number;
    student: number;
    admin: number;
}

export interface IRoleOption {
    value: string;
    label: string;
}

export interface IUserResponse {
    detail: string;
    page: number;
    limit: number;
    total_all: number;
    total_user_all: number;
    total_page: number;
    total_role: IUserTotalRole;
    data: IUser[];
}

export const IUserItemDefault: IUser = {
    user_id: 0,
    username: "",
    password: "",
    confirm_password: "",
    role: "",
    name: "",
    is_active: false,
    created_by_id: null,
    created_by_name: "",
    updated_by_id: null,
    updated_by_name: "",
    created_at: 0,
    updated_at: 0,
};