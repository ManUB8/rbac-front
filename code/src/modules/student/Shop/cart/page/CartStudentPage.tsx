import React from 'react';
import { useCartStudentFetch } from '../hook/useFetchCartStudent';
import HeadCartStudent from '../components/page/HeadCartStudent';
import CartStudentDetail from '../components/page/CartStudentDetail';
import SumCartStudent from '../components/page/SumCartStudent';
import DeliveryShop from '../components/page/DeliveryShop';
import DetailCartShop from '../components/form/DetailCartShop';

export interface ICartStudentPageProps { };

const CartStudentPage: React.FunctionComponent<ICartStudentPageProps> = props => {
    const masterController = useCartStudentFetch()
    return (
        <>
            <HeadCartStudent masterController={masterController} />
            <CartStudentDetail masterController={masterController} />
            <DeliveryShop masterController={masterController} />
            <SumCartStudent masterController={masterController} />
            <DetailCartShop masterController={masterController} />
        </>
    )
};

export default CartStudentPage;