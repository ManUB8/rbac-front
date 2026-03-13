import { ApiConfig } from "../../../../shared/service/ApiConfig";
import { api } from "../../../../shared/service/axiosInstance";
import type { IGroupOption, IMasterItemResponse, IMasterSkuData, IMasterSkuFilterConfig, IMasterSkuItemCreate, IMasterSkuUpdateData, ISearchMasterSkuContext } from "../interface/MadterSku.interface";
import qs from "qs";
import Cookies from 'js-cookie'

export const getAllMasterSku = async (body: ISearchMasterSkuContext): Promise<IMasterItemResponse> => {
    const res = await api.get<IMasterItemResponse>(ApiConfig.MASTER_API + `/get-all`, {
        params: body,
        paramsSerializer: (params: any) =>
            qs.stringify(params, {
                arrayFormat: "repeat",
            }),
    }
    );
    return res
};

export const getFilterMasterSku = async (): Promise<IMasterSkuFilterConfig> => {
    const res = await api.get<IMasterSkuFilterConfig>(ApiConfig.MASTER_API + `/get-filter-info`);
    return res
};

export const getCreateMasterSku = async (): Promise<IMasterSkuItemCreate> => {
    const res = await api.get<IMasterSkuItemCreate>(ApiConfig.MASTER_API + `/get-create-info`);
    return res
};

export const getMasterSkuByOne = async (master_item_id: string): Promise<IMasterSkuData> => {
    const res = await api.get<IMasterSkuData>(ApiConfig.MASTER_API + `/get-one/${master_item_id}`);
    return res
};

export const CreatePhotoMasterSku = async (file: File, img_url: string) => {
    const user_id = Cookies.get('userId') || ''
    const formData = new FormData();
    formData.append('image', file);
    formData.append('module', 'masterdata');
    formData.append('sub_module', 'masterdata');
    formData.append('owner_id', user_id);
    formData.append('old_image', img_url);

    const res = await api.post<any>(
        ApiConfig.UPLOAD_ROS_SKU_API,
        formData,
        {
            headers: { 'Content-Type': 'multipart/form-data' },
            transformRequest: [(d: any) => d], // กัน interceptor ที่ serialize เป็น JSON
        }
    );
    return res;
};

export const CreateMasterSku = async (body: IMasterSkuData): Promise<any> => {
    const res = await api.post<any>(
        `${ApiConfig.MASTER_API}` + `/upsert-masterdata`,
        body
    );
    return res
};

export const UpdateMasterSku = async (body: IMasterSkuUpdateData): Promise<any> => {
    const res = await api.post<any>(
        `${ApiConfig.MASTER_API}` + `/upsert-masterdata`,
        body
    );
    return res
};

export const DeleteMasterSkuByOne = async (master_item_id: string) => {
    const res = await api.delete(
        `${ApiConfig.MASTER_API}/delete-masterdata?master_item_id=${master_item_id}`
    );
    return res
};

export const getGroupMasterSku = async (master_item_name: string) => {
    const res = await api.get<IGroupOption[]>(
        ApiConfig.MASTER_API + `/get-group-info`,
        {
            params: {
                master_item_name: master_item_name,
            }
        }
    );
    return res
};