import React from 'react';
import { useActivityStatusFetch } from '../../ActivityManage/hook/useFetchActivity';
import HeadStudentActivities from '../components/page/HeadStudentActivitiesPhone';
import StudentActivitiesFrom from '../components/form/StudentActivitiesPhoneFrom';

export interface IStudentActivitiesPageProps { };

const StudentActivitiesPhonePage: React.FunctionComponent<IStudentActivitiesPageProps> = props => {
    
    return (
        <>
            <HeadStudentActivities/>
            <StudentActivitiesFrom/>
        </>
    )
};

export default StudentActivitiesPhonePage;