import { ApiConfig } from "../../../shared/service/ApiConfig";
import { api } from "../../../shared/service/axiosInstance";
import type { ILoginAdminBody, ILoginAdminItem } from "../interface/Login.interface";

// export const getLoginAdmin = async (body: ILoginAdminBody): Promise<ILoginAdminItem> => {
//     const res = await api.post<ILoginAdminItem>(ApiConfig.LOGIN_API,
//         body,
//     );
//     return res
// };

export const getLoginAdmin = async ( body: ILoginAdminBody ): Promise<ILoginAdminItem> => {
  const res = await api.post<ILoginAdminItem>(
    ApiConfig.LOGIN_API,
    body,
    {
      skipSwal: true, 
    }
  );

  return res;
};