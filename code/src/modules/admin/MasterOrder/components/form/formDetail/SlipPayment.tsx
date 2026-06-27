import React from "react";
import {
    Box,
    Button,
    Card,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";

import type { IuseFetcOrderFrom } from "../../../hook/useFetchMasterOrder";
import NoImg from "../../../../../../assets/image/NoImg.png";

interface Props {
    controller: IuseFetcOrderFrom;
}

const formatDateTime = (timestamp?: number) => {
    if (!timestamp) return "-";

    return new Date(timestamp * 1000).toLocaleString("th-TH", {
        dateStyle: "medium",
        timeStyle: "short",
    });
};

const SlipPayment: React.FC<Props> = ({ controller }) => {
    const order = controller.watch();
    const slip = order?.payment?.slip_image || "";
    const [openPreview, setOpenPreview] = React.useState(false);

    return (
        <>
            <Card
                elevation={0}
                sx={{
                    p: 2.5,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    <ReceiptLongOutlinedIcon color="primary" />

                    <Typography sx={{ fontWeight: 800, fontSize: 20 }}>
                        หลักฐานการชำระเงิน
                    </Typography>
                </Stack>

                <Box
                    component="img"
                    src={slip || NoImg}
                    onClick={() => slip && setOpenPreview(true)}
                    sx={{
                        width: "100%",
                        maxHeight: 320,
                        objectFit: "contain",
                        bgcolor: "grey.100",
                        borderRadius: 2,
                        mt: 2,
                        cursor: slip ? "zoom-in" : "default",
                        border: "1px solid",
                        borderColor: "divider",
                    }}
                />

                <Typography sx={{ mt: 1.5 }} color="text.secondary">
                    อัปโหลดเมื่อ:{" "}
                    {formatDateTime(order?.payment?.slip_uploaded_at)}
                </Typography>

                {slip && (
                    <Button
                        variant="outlined"
                        startIcon={<OpenInFullOutlinedIcon />}
                        sx={{ mt: 1.5 }}
                        onClick={() => setOpenPreview(true)}
                    >
                        เปิดรูปเต็ม
                    </Button>
                )}
            </Card>

            <Dialog
                open={openPreview}
                onClose={() => setOpenPreview(false)}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>
                    หลักฐานการชำระเงิน

                    <IconButton
                        onClick={() => setOpenPreview(false)}
                        sx={{ position: "absolute", right: 12, top: 12 }}
                    >
                        <CloseOutlinedIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <Box
                        component="img"
                        src={slip || NoImg}
                        sx={{
                            width: "100%",
                            maxHeight: "75vh",
                            objectFit: "contain",
                        }}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SlipPayment;