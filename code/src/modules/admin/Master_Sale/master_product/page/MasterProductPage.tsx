import React from 'react';
import { useFetchMasterFunctionProduct } from '../hook/useFetchMasterProduct';
import HeadMasterProduct from '../components/page/HeadMasterProduct';
import FilterMasterProduct from '../components/page/FilterMasterProduct';
import TableMasterProduct from '../components/page/TableMasterProduct';
import MasterProductForm from '../components/form/MasterProductForm';

export interface IMasterProductPageProps { };

const MasterProductPage: React.FunctionComponent<IMasterProductPageProps> = props => {
    const master_product = useFetchMasterFunctionProduct()
    return (
        <>
            <HeadMasterProduct master_product={master_product} />
            <FilterMasterProduct master_product={master_product} />
            <TableMasterProduct master_product={master_product} />
            <MasterProductForm master_product={master_product} />
        </>
    )
};

export default MasterProductPage;