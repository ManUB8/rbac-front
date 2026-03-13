import { ApiConfig } from '../../../../../shared/service/ApiConfig';
import { api } from '../../../../../shared/service/axiosInstance';
import type { IGetAllUnit, IGetAllUnitRes } from '../interface/manageUnit.interface';
// import type { IGetAllInven } from '../interface/ManageInventory.interface';

export const getAllManageUnit = async (page: string, limit: string): Promise<IGetAllUnitRes> => {
    const res = await api.get<IGetAllUnitRes>(ApiConfig.MASTERDATA_API + '/get-all/unit', {
        params: {
            page,
            limit
        }
    });
    return res;
};
