import React from 'react';
import { useOrderStudentFetch } from '../hook/useFetchOrderShop';
import HeadOrderShop from '../components/page/HeadOrderShop';
import CardOrderShop from '../components/page/CardOrderShop';
import OrderShopForm from '../components/form/OrderShopForm';

export interface IOrderShopPageProps { };

const OrderShopPage: React.FunctionComponent<IOrderShopPageProps> = props => {
    const mastercontroller = useOrderStudentFetch()
    return (
        <>
            <HeadOrderShop mastercontroller={mastercontroller} />
            <CardOrderShop mastercontroller={mastercontroller} />
            <OrderShopForm mastercontroller={mastercontroller} />
        </>
    )
};

export default OrderShopPage;