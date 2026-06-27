import React from "react";
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

import type {
    IuseFetchMasterFunctionOrder,
    IuseFetcOrderFrom,
} from "../../hook/useFetchMasterOrder";

import DetailUser from "./formDetail/DetailUser";
import ProductOrder from "./formDetail/ProductOrder";
import SlipPayment from "./formDetail/SlipPayment";
import ActionsOrder from "./formDetail/ActionsOrder";

import {
    orderStatusText,
    paymentStatusText,
    orderStatusColor,
    paymentStatusColor,
} from "../../utils/order_option";

export interface IDetailOrderProps {
    mastercontroller: IuseFetchMasterFunctionOrder;
    controller: IuseFetcOrderFrom;
}

const DetailOrder: React.FC<IDetailOrderProps> = ({
    mastercontroller,
    controller,
}) => {
    const order = controller.watch();

    const handleClose = () => {
        mastercontroller.setOpenModal(false);
    };

    return (
        <Dialog
            open={mastercontroller.openModal}
            onClose={handleClose}
            fullWidth
            maxWidth="lg"
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
                    onClick={handleClose}
                    sx={{ position: "absolute", right: 12, top: 12 }}
                >
                    <CloseOutlinedIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <Box
                    component="form"
                    id="order-form"
                    onSubmit={controller.handleSubmit(controller.onSubmitMaster)}
                >
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={2}
                    >
                        <Stack spacing={2} sx={{ flex: 1 }}>
                            <DetailUser controller={controller} />
                            <SlipPayment controller={controller} />
                        </Stack>

                        <Stack spacing={2} sx={{ flex: 1 }}>
                            <ProductOrder controller={controller} />
                            <ActionsOrder controller={controller} />
                        </Stack>
                    </Stack>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={handleClose}
                    variant="outlined"
                    color="inherit"
                >
                    ปิด
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DetailOrder;