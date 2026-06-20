import Cookies from 'js-cookie'
import { api } from '../../../service/axiosInstance';
import { ApiConfig } from '../../../service/ApiConfig';

export const UploadImageActivity = async (formData: FormData): Promise<any> => {
    const res = await api.post(ApiConfig.UPLOAD_IMG_API + `/image-activities`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res;
};

export const UploadImageShopProduct = async (formData: FormData): Promise<any> => {
    const res = await api.post(ApiConfig.UPLOAD_IMG_API + `/shop-product-image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res;
};

export const UploadImagePatmentSlip = async (formData: FormData): Promise<any> => {
    const res = await api.post(ApiConfig.UPLOAD_IMG_API + `/payment-slip`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res;
};
