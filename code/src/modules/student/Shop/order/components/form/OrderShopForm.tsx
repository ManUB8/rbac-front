import React from 'react';
import { useFetcOrderStudentFrom, type IuseOrderStudentFetch } from '../../hook/useFetchOrderShop';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    Chip,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { orderStatusColor, orderStatusText, paymentStatusColor, paymentStatusText } from '../../../../../admin/MasterOrder/utils/order_option';
import DetailOrderShop from './formDetail/DetailOrderShop';
import ProductOrderShop from './formDetail/ProductOrderShop';
import SlipPaymentOrderShop from './formDetail/SlipPaymentOrderShop';

export interface IOrderShopFormProps {
    mastercontroller: IuseOrderStudentFetch;
};

const OrderShopForm: React.FunctionComponent<IOrderShopFormProps> = ({ mastercontroller }) => {
    const controller = useFetcOrderStudentFrom(mastercontroller.selectedId, mastercontroller.openModal, mastercontroller.setOpenModal)
    const order = controller.order_date
    return (
        <>
            <Dialog
                open={mastercontroller.openModal}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle sx={{ pr: 6 }}>
                    คำสั่งซื้อ {order?.order_no || "-"}

                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        <Chip
                            size="small"
                            variant="outlined"
                            color={
                                orderStatusColor[
                                order?.order_status as keyof typeof orderStatusColor
                                ] ?? "default"
                            }
                            label={
                                orderStatusText[
                                order?.order_status as keyof typeof orderStatusText
                                ] ?? "-"
                            }
                        />

                        <Chip
                            size="small"
                            variant="outlined"
                            color={
                                paymentStatusColor[
                                order?.payment_status as keyof typeof paymentStatusColor
                                ] ?? "default"
                            }
                            label={
                                paymentStatusText[
                                order?.payment_status as keyof typeof paymentStatusText
                                ] ?? "-"
                            }
                        />
                    </Stack>

                    <IconButton
                        onClick={mastercontroller.handleCloseModal}
                        sx={{ position: "absolute", right: 12, top: 12 }}
                    >
                        <CloseOutlinedIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>
                        <Stack
                            direction={{ xs: "column", md: "column" }}
                            spacing={1}
                        >
                            <DetailOrderShop controller={controller} />
                            <ProductOrderShop controller={controller} />
                            <SlipPaymentOrderShop controller={controller} />
                        </Stack>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={mastercontroller.handleCloseModal}
                        variant="outlined"
                        color="inherit"
                    >
                        ปิด
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default OrderShopForm;