import React from 'react';
import HeadStudentActivities from '../components/page/HeadStudentActivitiesComputer';
import StudentActivitiesFrom from '../components/form/StudentActivitiesComputerFrom';

export interface IStudentActivitiesPageProps { };

const StudentActivitiesComputerPage: React.FunctionComponent<IStudentActivitiesPageProps> = props => {
    
    return (
        <>
            <HeadStudentActivities/>
            <StudentActivitiesFrom/>
        </>
    )
};

export default StudentActivitiesComputerPage;