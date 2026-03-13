import { ApiConfig } from '../../../../shared/service/ApiConfig';
import { api } from '../../../../shared/service/axiosInstance';
import type { IGetAllSupplierProductsRes, IGetAllSupplierRes } from '../interface/MasterSupplier.interface';

export const getAllMasterSupplier = async (search: string, page: string, limit: string, is_active: string, sortby: string): Promise<IGetAllSupplierRes> => {
    const res = await api.get<IGetAllSupplierRes>(ApiConfig.MASTERDATA_API + '/get-all/supplier', {
        params: {
            search,
            page,
            limit,
            is_active,
            sortby
        }
    });
    return res;
};

export const getAllMasterSupplierProduct = async (search: string, page: string, limit: string): Promise<IGetAllSupplierProductsRes> => {
    const res = await api.get<IGetAllSupplierProductsRes>(ApiConfig.MASTERDATA_API + '/get-all/supplier-product', {
        params: {
            search,
            page,
            limit
        }
    });
    return res;
};
