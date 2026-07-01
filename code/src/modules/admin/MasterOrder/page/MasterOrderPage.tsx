import React from 'react';
import { useFetchMasterFunctionOrder } from '../hook/useFetchMasterOrder';
import HeadMasterOrder from '../components/page/HeadMasterOrder';
import FilterMasterOrder from '../components/page/FilterMasterOrder';
import TableMasterOrder from '../components/page/TableMasterOrder';
import MasterOrderForm from '../components/form/MasterOrderForm';

export interface IMasterOrderPageProps { };

const MasterOrderPage: React.FunctionComponent<IMasterOrderPageProps> = props => {
    const mastercontroller = useFetchMasterFunctionOrder()
    return (
        <>
            <HeadMasterOrder mastercontroller={mastercontroller}/>
            <FilterMasterOrder mastercontroller={mastercontroller}/>
            <TableMasterOrder mastercontroller={mastercontroller}/>
            <MasterOrderForm mastercontroller={mastercontroller}/>
        </>
    )
};

export default MasterOrderPage;