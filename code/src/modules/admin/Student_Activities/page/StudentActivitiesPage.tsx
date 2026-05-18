import React from 'react';
import { useActivityStatusFetch } from '../../ActivityManage/hook/useFetchActivity';
import HeadStudentActivities from '../components/page/HeadStudentActivities';
import StudentActivitiesFrom from '../components/form/StudentActivitiesFrom';

export interface IStudentActivitiesPageProps { };

const StudentActivitiesPage: React.FunctionComponent<IStudentActivitiesPageProps> = props => {
    
    return (
        <>
            <HeadStudentActivities/>
            <StudentActivitiesFrom/>
        </>
    )
};

export default StudentActivitiesPage;