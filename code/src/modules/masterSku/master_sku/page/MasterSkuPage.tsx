import React from 'react';
import HeaderSku from '../components/MasterskuPage/HeaderSku';
import { useMasterFunctionSkuFetch } from '../hook/useFetchMasterSku';
import FilterSku from '../components/MasterskuPage/FilterSku';
import TableMasterSku from './TableMasterSku';

export interface IMasterSkuPageProps { };

const MasterSkuPage: React.FunctionComponent<IMasterSkuPageProps> = props => {
    const masterController = useMasterFunctionSkuFetch();
    return (
        <>
            <HeaderSku masterController={masterController} />
            <FilterSku masterController={masterController} />
            <TableMasterSku masterController={masterController} />
        </>
    )
};

export default MasterSkuPage;