import React from 'react';
import { useActivityStatusFetch } from '../../ActivityManage/hook/useFetchActivity';
import HeadStudentActivitiesManual from '../components/page/HeadStudentActivitiesManual';
import StudentActivitiesManualFrom from '../components/form/StudentActivitiesManualFrom';

export interface IStudentActivitiesManualPageProps { };

const StudentActivitiesManualPage: React.FunctionComponent<IStudentActivitiesManualPageProps> = props => {
    
    return (
        <>
            <HeadStudentActivitiesManual/>
            <StudentActivitiesManualFrom/>
        </>
    )
};

export default StudentActivitiesManualPage;