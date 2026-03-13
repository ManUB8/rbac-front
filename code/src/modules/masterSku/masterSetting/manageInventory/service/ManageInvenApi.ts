import { ApiConfig } from '../../../../../shared/service/ApiConfig';
import { api } from '../../../../../shared/service/axiosInstance';
import type { IGetAllInven } from '../interface/ManageInventory.interface';

export const getAllManageInven = async (type: string, page: string, limit: string): Promise<IGetAllInven> => {
    const res = await api.get<IGetAllInven>(ApiConfig.MASTERDATA_API+ '/get-all/category', {
        params: {
            category_type: type,
            page,
            limit
        }
    });
    return res;
};
