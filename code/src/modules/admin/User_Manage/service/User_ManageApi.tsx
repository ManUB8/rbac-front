import { ApiConfig } from "../../../../shared/service/ApiConfig";
import { api } from "../../../../shared/service/axiosInstance";
import type {  IUser, IUserDeletePayload, IUserResponse, IUserSearchPayload } from "../interface/User_Manage.interface";


export const getAllUser = async (body: IUserSearchPayload): Promise<IUserResponse> => {
    const res = await api.post<IUserResponse>(
        ApiConfig.USER_API + `/get-all`,
        body
    );

    return res;
};


export const getOneUser = async (user_id: number): Promise<IUser> => {
    const res = await api.get<IUser>(
        ApiConfig.USER_API + `/get-one/${user_id}`
    );
    return res;
};

export const CreateUser = async (body: IUser): Promise<IUser> => {
    const res = await api.post<IUser>(
        ApiConfig.USER_API + `/create`,
        body
    );
    return res;
};

export const UpdateUser = async (body: IUser): Promise<IUser> => {
    const res = await api.patch<IUser>(
        ApiConfig.USER_API + `/update/${body.user_id}`,
        body
    );
    return res;
};

export const DeleteUser = async (body: IUserDeletePayload): Promise<any> => {
    const res = await api.delete<any>(
        ApiConfig.USER_API + `/delete/${body.deleted_user_id}`,
        {
            data: body
        }
        
    );
    return res;
};




