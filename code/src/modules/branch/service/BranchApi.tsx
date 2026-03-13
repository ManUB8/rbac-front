import { ApiConfig } from "../../../shared/service/ApiConfig";
import { api } from "../../../shared/service/axiosInstance";
import type { IDistrict, IProvince, ISubDistrict } from "../interface/Address.interface";
import type { IBranchItem } from "../interface/Branch.interface";
import type { CheckUsernameResponse, IFilterBranchType, UploadResponse } from "../interface/BranchType.interface";

export const getBranchByOne = async (branch_id: string): Promise<IBranchItem> => {
    const res = await api.get<IBranchItem>(
        `${ApiConfig.BRANCHS_API}/branches/${branch_id}`
    );
    return res
};

export const getBranchType = async (): Promise<IFilterBranchType[]> => {
    const res = await api.get<IFilterBranchType[]>(ApiConfig.BRANCHS_API + `/owners/branch-types`);
    return res
};

export const getCheckUsername = async (username: string): Promise<CheckUsernameResponse> => {
    const res = await api.post<CheckUsernameResponse>(
        `${ApiConfig.USER_API}/check-username`,
        {username: username}
    );
    console.log('res',res)
    return res
};

export const CreatePhoto = async (file: File, unix: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('menu_type', 'false');
    formData.append('image_type', 'branch_photo');
    formData.append('unix_id', unix);

    const res = await api.post<any>(
        ApiConfig.UPLOAD_API,
        formData,
        {
            headers: { 'Content-Type': 'multipart/form-data' },
            transformRequest: [(d: any) => d], // กัน interceptor ที่ serialize เป็น JSON
        }
    );
    return res;
};


export const CreateBranch = async (body: IBranchItem): Promise<any> => {
    const res = await api.post<any>(
        `${ApiConfig.BRANCHS_API}/branches`,
        body
    );
    return res
};

export const UpdateBranch = async (body: IBranchItem): Promise<any> => {
    const res = await api.patch<any>(
        `${ApiConfig.BRANCHS_API}/branches/${body.id}`,
        body
    );
    return res
};

export const DeleteBranchByOne = async (branch_id: string) => {
    const res = await api.delete(
        `${ApiConfig.BRANCHS_API}/branches/${branch_id}`
    );
    return res
};
//  BRANCHS_API: "/owner-branch/v1",
// api/owner-branch/v1/owners/provinces

export const getProvince = async (): Promise<IProvince[]> => {
    const res = await api.get<IProvince[]>(ApiConfig.BRANCHS_API + `/owners/provinces`);
    return res
};

export const getDistrict = async (province_id: number): Promise<IDistrict[]> => {
    const res = await api.get<IDistrict[]>(
        `${ApiConfig.BRANCHS_API}/owners/districts/${province_id}`
    );
    return res
};

export const getSubDistrict = async (district_id: number): Promise<ISubDistrict[]> => {
    const res = await api.get<ISubDistrict[]>(
        `${ApiConfig.BRANCHS_API}/owners/sub-districts/${district_id}`
    );
    return res
};

