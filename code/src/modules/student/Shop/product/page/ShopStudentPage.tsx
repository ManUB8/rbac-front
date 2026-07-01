import React from 'react';
import { useFetchMasterFunctionShopStudent } from '../hook/useFetchShopStudent';
import HeadShopStudent from '../components/page/HeadShopStudent';
import FilterShopStudent from '../components/page/FilterShopStudent';
import CardShopStudent from '../components/page/CardShopStudent';
import { Badge, Fab } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useCartStudentFetch } from '../../cart/hook/useFetchCartStudent';
import ShopStudentForm from '../components/form/ShopStudentForm';
import { AppRoutes } from '../../../../../router/router';
export interface IShopStudentPageProps { };

const ShopStudentPage: React.FunctionComponent<IShopStudentPageProps> = props => {
    const mastercontroller = useFetchMasterFunctionShopStudent()
    const mastercontroller_cart = useCartStudentFetch()
    return (
        <>
            <HeadShopStudent mastercontroller={mastercontroller} />
            <FilterShopStudent mastercontroller={mastercontroller} />
            <CardShopStudent mastercontroller={mastercontroller} />
            <ShopStudentForm mastercontroller={mastercontroller} />
            <Fab
                color="primary"
                onClick={() =>
                    mastercontroller.navigate(`${AppRoutes.studentShop}/cart`)
                }
                sx={{
                    position: "fixed",
                    bottom: 24,
                    right: 24,
                    zIndex: 999,
                }}
            >
                <Badge
                    badgeContent={mastercontroller_cart.total_items}
                    color="error"
                >
                    <ShoppingCartOutlinedIcon />
                </Badge>
            </Fab>
        </>
    )
};

export default ShopStudentPage;