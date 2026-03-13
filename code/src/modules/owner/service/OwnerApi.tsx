import type { IOwnerItem, IOwnerResponse, ISearchContext } from "../interface/Owner.interface"
import { api } from "../../../shared/service/axiosInstance";
import { ApiConfig } from "../../../shared/service/ApiConfig";
import type { CheckEmailResponse, IFilterOwnerType } from "../interface/OwnerType.interface";

export const getAllOwner = async (body: ISearchContext): Promise<IOwnerResponse> => {
    const res = await api.get<IOwnerResponse>(ApiConfig.OWNERS_API, {
        params: body,
    });
    return res
};

export const getOwnerType = async (): Promise<IFilterOwnerType[]> => {
    const res = await api.get<IFilterOwnerType[]>(ApiConfig.OWNERS_API + `/owner-types`);
    return res
};

export const getFoodOwnerType = async (): Promise<IFilterOwnerType[]> => {
    const res = await api.get<IFilterOwnerType[]>(ApiConfig.OWNERS_API + `/food-types`);
    return res
};

export const getUserOwnerType = async (): Promise<IFilterOwnerType[]> => {
    const res = await api.get<IFilterOwnerType[]>(ApiConfig.OWNERS_API + `/user-types`);
    return res
};

export const getOwnerByOne = async (owner_id: string): Promise<IOwnerItem> => {
    const res = await api.get<IOwnerItem>(
        `${ApiConfig.OWNERS_API}/owner/${owner_id}`
    );
    return res
};

export const getCheckEmail = async (email: string): Promise<CheckEmailResponse> => {
    // check-email
    const res = await api.post<CheckEmailResponse>(
        `${ApiConfig.USER_API}/check-email`,
        {
            email: email,
        }
    );
    return res
};

export const CreateOwner = async (body: IOwnerItem): Promise<any> => {
    const res = await api.post<any>(
        `${ApiConfig.OWNERS_API}`,
        body
    );
    return res
};

export const UpdateOwner = async (body: IOwnerItem): Promise<any> => {
    const res = await api.patch<any>(
        `${ApiConfig.OWNERS_API}/owner/${body.id}`,
        body
    );
    return res
};


export const DeleteOwnerByOne = async (owner_id: string) => {
    const res = await api.delete(
        `${ApiConfig.OWNERS_API}/owner/${owner_id}`
    );
    return res
};
