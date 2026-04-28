import React from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type { IuseActivityFetch } from "../../hook/useFetchActivity";

export interface IHeadActivityProps {
    MasterActivity: IuseActivityFetch
};

const HeadActivity: React.FunctionComponent<IHeadActivityProps> = ({
    MasterActivity
}) => {
    return (
        <>
            <Card sx={{ mb: 3, borderRadius: 3 }}>
                <CardContent
                    sx={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Box>
                        <Typography variant="h4" fontWeight={700}>
                            จัดการกิจกรรม
                        </Typography>
                        <Typography color="text.secondary">
                            เพิ่ม แก้ไข และลบกิจกรรมต่างๆ
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={MasterActivity.handleOpenAdd}
                        sx={{
                            borderRadius: "50px",
                            px: 2.5,
                            py: 1.2,
                            textTransform: "none",
                            backgroundColor: "#020617",
                            boxShadow: "none",
                            "&:hover": {
                                backgroundColor: "#111827",
                                boxShadow: "none",
                            },
                        }}
                    >
                        เพิ่มกิจกรรม
                    </Button>
                </CardContent>
            </Card>
        </>
    )
};

export default HeadActivity;