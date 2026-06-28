import React from "react";
import { Box } from "@mui/material";
import {
    useFetchShopStudentProductFrom,
    type IuseFetchMasterFunctionShopStudent,
} from "../../hook/useFetchShopStudent";
import ProductDetail from "./ProductDetail";

export interface IShopStudentFormProps {
    mastercontroller: IuseFetchMasterFunctionShopStudent;
}

const ShopStudentForm: React.FC<IShopStudentFormProps> = ({
    mastercontroller,
}) => {
    const controller = useFetchShopStudentProductFrom(
        mastercontroller.selectedId,
        mastercontroller.openModal,
        mastercontroller.setOpenModal
    );

    return (
        <Box>
            <ProductDetail
                mastercontroller={mastercontroller}
                controller={controller}
            />
        </Box>
    );
};

export default ShopStudentForm;