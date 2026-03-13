import { ApiConfig } from "../../../../shared/service/ApiConfig";
import { api } from "../../../../shared/service/axiosInstance";
import type { IDataMetric, IPackageDataResponse, IPackageEnumResponse, IPackageItem, IPagePermission } from "../interface/PackageServices.interface";
import type { ISearchContextPackage } from "../interface/PackageServices.interface";

export const getAllMasterPackage = async (body: ISearchContextPackage): Promise<IPackageDataResponse> => {
    const res = await api.get<IPackageDataResponse>(ApiConfig.PACKAGE_API, {
        params: body,
    });
    return res
};

export const getAllEnumPackage = async (): Promise<IPackageEnumResponse> => {
    const res = await api.get<IPackageEnumResponse>(ApiConfig.PACKAGE_API + `/enum/inital`,);
    return res
};

export const getAllEnumDataMetric = async (): Promise<IDataMetric[]> => {
    const res = await api.get<IDataMetric[]>(ApiConfig.PACKAGE_API + `/enum/datametric`,);
    return res
};

export const getPackageByOne = async (package_id: string): Promise<IPackageItem> => {
    const res = await api.get<IPackageItem>(ApiConfig.PACKAGE_API + `/${package_id}`,);
    return res
};

export const getLicensePackageByPage = async (page: number): Promise<IPagePermission[]> => {
    const res = await api.get<IPagePermission[]>(ApiConfig.PACKAGE_API + `/page/${page}`,);
    return res
};

export const CreatePackage = async (body: IPackageItem): Promise<any> => {
    const res = await api.post<any>(
        `${ApiConfig.PACKAGE_API}`,
        body
    );
    return res
};

export const UpdatePackage = async (body: IPackageItem): Promise<any> => {
    const res = await api.patch<any>(
        `${ApiConfig.PACKAGE_API}/${body.package_id}`,
        body
    );
    return res
};

export const DeletePackageByOne = async (package_id: string) => {
    const res = await api.delete(
        `${ApiConfig.PACKAGE_API}/${package_id}`
    );
    return res
};


export const CreatePhotoPackage = async (file: File, unix: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('platform', 'admin');
    formData.append('owner_id', 'Package');
    formData.append('image_type', 'package_photo');
    formData.append('unix_id', unix);

    const res = await api.post<any>(
        ApiConfig.UPLOAD_ROS_API,
        formData,
        {
            headers: { 'Content-Type': 'multipart/form-data' },
            transformRequest: [(d: any) => d], // กัน interceptor ที่ serialize เป็น JSON
        }
    );
    return res;
};

export const getPhotoPackage = async (fileName: string): Promise<any> => {
    const res = await api.get<any>(ApiConfig.UPLOAD_ROS_API + `/original/${fileName}`,);
    return res
};

export const getPackageCompatibleMain = async (package_id: string): Promise<IPackageItem[]> => {
    const res = await api.get<IPackageItem[]>(ApiConfig.PACKAGE_API + `/compatible/${package_id}`);
    return res
};