// components/Table/TableBranch.tsx
import React from "react";
import { Box, Typography, } from "@mui/material";
import type { IOwnerItem } from "../../interface/Owner.interface";
import type { UseFormGetValues } from "react-hook-form";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import type { IBranchItem } from "../../../branch/interface/Branch.interface";
// ===== Generic Column =====
export interface Column<T> {
    id: string;
    label: string;
    align: "center" | "left" | "right";
    minWidth: number;
    sortable?: boolean;
    render: (row: T, index: number) => React.ReactNode; // ✅ add index
}

// export function activeAvatar(status: number) {
//     let bgcolor = "#8C8C8C";
//     let letter = "";
//     let textColor = "#000";

//     switch (status) {
//         case 0: bgcolor = "#8C8C8C"; textColor = "#fff"; letter = "ปิด"; break;
//         case 1: bgcolor = "#F1FFFD"; textColor = "#119480"; letter = "เปิด"; break;
//         case 2: bgcolor = "#8C8C8C"; textColor = "#fff"; letter = "ปิด"; break;
//         case 3: bgcolor = '#FF3535'; textColor = "#fff"; letter = "ระงับ"; break;
//     }

//     return (
//         <Box sx={{ backgroundColor: bgcolor, borderRadius: "20px", px: 2, py: 0.5 }}>
//             <Typography sx={{ color: textColor }}>{letter}</Typography>
//         </Box>
//     );
// }


// ===== Badge สถานะ =====
export function activeAvatar(status: number) {
    let bgcolor = "#8C8C8C";
    let letter = "";
    let textColor = "#000";

    switch (status) {
        case 0: bgcolor = "secondaryContainer"; textColor = "onSecondaryContainer"; letter = "ปิดใช้งาน"; break;
        case 1: bgcolor = "successVariant80"; textColor = 'successVariant0'; letter = "เปิดใช้งาน"; break;
        case 2: bgcolor = "errorTones.98"; textColor = "errorTones.40"; letter = "ปิดใช้งาน"; break;
        case 3: bgcolor = 'onSurface'; textColor = "onPrimary"; letter = "ระงับการใช้"; break;
    }

    return (
        <Box sx={{ backgroundColor: bgcolor, borderRadius: "20px", px: 2, py: 0.5 }}>
            <Typography sx={{ color: textColor }}>{letter}</Typography>
        </Box>
    );
}

// ===== Columns ของแถวหลัก (Branch) — ใช้ factory เพื่อรับ deps จากแม่ =====
export function BranchColumns(deps: {
    navigate: (path: string) => void;
    actype: string;
    getValues: UseFormGetValues<IOwnerItem>;

}): Column<IBranchItem>[] {
    const { navigate, actype, getValues } = deps;

    return [
        {
            id: "row",
            label: "ลำดับ",
            minWidth: 20,
            align: "center",
            render: (_: IBranchItem, index: number) => (
                <Typography>{index + 1}</Typography>
            ),
        },
        {
            id: "branch_name",
            label: "ชื่อสาขา",
            minWidth: 250,
            align: "left",
            render: (row: IBranchItem) => (
                <Box display="flex" alignItems="center">
                    {(() => {
                        const mainBranch = getValues("branches").find((e) => e.is_branch_main);

                        if (actype === "create") {
                            return mainBranch?.is_branch_main === row?.is_branch_main ? (
                                <HomeWorkOutlinedIcon sx={{ mr: 1, color: "#5DC0EA" }} />
                            ) : null;
                        }

                        if (actype === "edit") {
                            return (
                                getValues("branch_name") === row?.branch_name &&
                                mainBranch?.is_branch_main === row?.is_branch_main && (
                                    <HomeWorkOutlinedIcon sx={{ mr: 1, color: "#5DC0EA" }} />
                                )
                            );
                        }

                        return null;
                    })()}

                    <Typography variant="body2"> {row?.branch_name || "-"}</Typography>
                </Box>
            ),
        },
        {
            id: "merchant_id",
            label: "MID",
            minWidth: 250,
            align: "left",
            render: (branch) => <Typography variant="body2" >{branch.merchant_id || "-"}</Typography>,
        },
        {
            id: "main_package",
            label: "แพ็คเกจหลัก",
            minWidth: 200,
            align: "left",
            render: (branch) => <Typography variant="body2" >{branch.main_package || "-"}</Typography>,
        },
        {
            id: "add_on_package",
            label: "แพ็คเกจเสริม",
            minWidth: 200,
            align: "left",
            render: (branch) => <Typography variant="body2" >{branch.add_on_package || "-"}</Typography>,
        },
        // {
        //     id: "package_type",
        //     label: "ประเภทบริการ",
        //     minWidth: 150,
        //     align: "left",
        //     render: (branch) => <Typography variant="body2" >{branch.package_type || "-"}</Typography>,
        // },
        {
            id: "start_date",
            label: "วันที่เริ่ม",
            minWidth: 130,
            align: "left",
            render: (branch) => <Typography variant="body2" >{branch.start_date || "-"}</Typography>,
        },
        {
            id: "end_date",
            label: "วันที่สิ้นสุด",
            minWidth: 130,
            align: "left",
            render: (branch) => <Typography variant="body2" >{branch.end_date || "-"}</Typography>,
        },
        {
            id: "active_type",
            label: "สถานะ",
            minWidth: 150,
            align: "center",
            render: (row: IBranchItem) => (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {activeAvatar(row?.active_type)}
                </Box>
            ),
        },
    ];
}