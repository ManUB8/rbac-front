import React from "react";
import {
    Chip,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import { NumericFormat } from "react-number-format";

export interface IHeadEventProps {
    total: number;
}

const HeadEvent: React.FunctionComponent<IHeadEventProps> = ({ total }) => {
    return (
        <Grid container>
            <Grid size={12}>
                <Stack spacing={1}>
                    <Stack
                        direction="row"
                        sx={{
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 24,
                                fontWeight: 800,
                            }}
                        >
                            {"ผู้ลงทะเบียนกิจกรรม"}
                        </Typography>

                        <Chip
                            label={
                                <span>
                                    <NumericFormat
                                        value={total}
                                        displayType="text"
                                        thousandSeparator=","
                                    />
                                    {" รายการ"}
                                </span>
                            }
                            sx={{
                                fontWeight: 700,
                            }}
                        />
                    </Stack>

                    <Typography
                        sx={{
                            color: "text.secondary",
                        }}
                    >
                        {"จัดการรายชื่อนิสิตในแต่ละกิจกรรม"}
                    </Typography>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default HeadEvent;