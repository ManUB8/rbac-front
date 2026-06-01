import { ApiConfig } from "../../../../shared/service/ApiConfig";
import { api } from "../../../../shared/service/axiosInstance";
import type { IDeleteEventRegistrantsRequest, IEventRegistrantsAllInOneResponse, IEventRegistrantsRequest, IStudentActivityJoinResponse, IUpdateEventRegistrantsRequest } from "../interface/EventRegistrants.interface";


export const getAllEventRegistrants = async (body: IEventRegistrantsRequest): Promise<IStudentActivityJoinResponse> => {
    const res = await api.post<IStudentActivityJoinResponse>(
        ApiConfig.STUDENT_ACTIVITY_API + `/admin/get-all`, body
    );
    return res;
};


export const UpdateEventRegistrants = async (body: IUpdateEventRegistrantsRequest): Promise<any> => {
    const res = await api.patch<any>(
        ApiConfig.STUDENT_ACTIVITY_API + `/update/${body.student_activity_id}`,
        body
    );
    return res;
};

export const DeleteEventRegistrants = async (body: IDeleteEventRegistrantsRequest): Promise<any> => {
    const res = await api.delete<any>(
        ApiConfig.STUDENT_ACTIVITY_API + `/delete/${body.student_activity_id}`,
        {
            data: body,
        }
    );
    return res;
};
