export interface ILoginAdminBody {
    username: string
    password: string
}

export interface IUser {
    user_id: string;
    username: string;
    account_type: string;   
    account_name: string;   
    owner_id: string;
    branch_id: string;
    first_login: boolean;
    role_id: string;
    is_auto: boolean;
}

export interface ILoginAdminItem{
    access_token: string
    refresh_token: string
    user: IUser
}