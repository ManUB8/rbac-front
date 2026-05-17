import Cookies from 'js-cookie'
import { api } from '../../../service/axiosInstance';
import { ApiConfig } from '../../../service/ApiConfig';

export const UploadImage = async (formData: FormData): Promise<any> => {
    const res = await api.post(ApiConfig.UPLOAD_IMG_API, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res;
};
