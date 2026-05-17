import React from 'react';
import { useMasterFunctionStudent } from '../hook/useFetchStudent';
import HeadStudent from '../components/page/HeadStudent';
import FilterStudent from '../components/page/FilterStudent';
import TableStudent from '../components/page/TableStudent';
import StudentFrom from '../components/form/StudentForm';

export interface IStudent_ManagePageProps { };

const Student_ManagePage: React.FunctionComponent<IStudent_ManagePageProps> = props => {
    const masterController = useMasterFunctionStudent()
    return (
        <>
            <HeadStudent masterController={masterController} />
            <FilterStudent masterController={masterController} />
            <TableStudent masterController={masterController} />
            <StudentFrom
                open={masterController.openStudentModal}
                id={masterController.selectedStudentId}
                onClose={() => masterController.setOpenStudentModal(false)}
                reload={masterController.reload} 
            />
        </>
    )
};

export default Student_ManagePage;