import { ApiConfig } from '../../../../../shared/service/ApiConfig';
import { api } from '../../../../../shared/service/axiosInstance';
import type { IGetAllStorageTypeRes } from '../interface/manageTemp.interface';
// import type { IGetAllInven } from '../interface/ManageInventory.interface';

export const getAllManageTemp = async (page: string, limit: string): Promise<IGetAllStorageTypeRes> => {
    const res = await api.get<IGetAllStorageTypeRes>(ApiConfig.MASTERDATA_API + '/get-all/storage-type', {
        params: {
            page,
            limit
        }
    });
    return res;
};
