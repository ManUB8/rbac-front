import React from 'react';
import type { IuseFetchMasterFunctionProduct, IuseFetchProductFrom } from '../../hook/useFetchMasterProduct';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    TextField,
    Typography,
    Switch,
    FormControlLabel,
    MenuItem,
    Divider,
    DialogActions,
} from "@mui/material";

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ProductBasicInfoSection from './ProductBasicInfoSection';
import ProductImageSection from './ProductImageSection';
import ProductInventorySection from './ProductInventorySection';
import ProductVariantSection from './ProductVariantSection';
import ProductSaleConditionSection from './ProductSaleConditionSection';

export interface IDetailProductProps {
    controller: IuseFetchProductFrom
    master_product: IuseFetchMasterFunctionProduct;
};

const DetailProduct: React.FunctionComponent<IDetailProductProps> = ({ controller, master_product }) => {
    
    return (
        <>
            <Dialog
                open={master_product.openModal}
                onClose={() => master_product.setOpenModal(false)}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle sx={{ fontWeight: 1000, pr: 6 }}>
                    {controller.actype === "create" ? "เพิ่ม" : "แก้ไขข้อมูล"}
                    <IconButton
                        onClick={() => master_product.setOpenModal(false)}
                        sx={{ position: "absolute", right: 12, top: 12 }}
                    >
                        <CloseOutlinedIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ pt: 1 }}>
                        <Box
                            component="form"
                            id="product-form"
                            onSubmit={controller.handleSubmit(controller.onSubmitMaster)}
                        >
                            <Stack spacing={3}>
                                <ProductBasicInfoSection controller={controller} />
                                <ProductImageSection controller={controller} />
                                <ProductInventorySection controller={controller} />
                                <ProductVariantSection controller={controller} />
                                <ProductSaleConditionSection controller={controller} />
                            </Stack>
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 1.5,
                            pt: 1,
                        }}
                    >
                        <Button
                            onClick={() => master_product.setOpenModal(false)}
                            variant="outlined"
                            color="error"
                        >
                            ยกเลิก
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            form="product-form"
                        >
                            {controller.actype === "create" ? "บันทึก" : "อัปเดต"}
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default DetailProduct;