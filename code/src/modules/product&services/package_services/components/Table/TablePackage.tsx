import type { NavigateFunction } from "react-router";
import type { ITextAlert } from "../../../../../shared/components/message/Alert.interface";
import type { SetStateAction } from "jotai";
import type { ITextPopup } from "../../../../../shared/components/popup/PopupConfirm.interface";
import type { IPackageItem } from "../../interface/PackageServices.interface";
import { Box, Typography } from "@mui/material";
import { BILLING_TYPE_LABELS, PACKAGE_TIER_LABELS, PACKAGE_TYPE_LABELS } from "../../constants/package_option";

// helper: รับ code (number|string|undefined) → label หรือ fallback
const labelByCode = (map: Record<string, string>, code?: string | number | null, fallback?: string) => {
    const key = code != null ? String(code) : "";
    return map[key] ?? (fallback ?? "-");
};

// ===== Generic Column =====
export interface Column<T> {
    id: string;
    label: string;
    align: "center" | "left" | "right";
    minWidth: number;
    sortable?: boolean;
    render: (row: T) => React.ReactNode;
}

// ===== Badge สถานะ =====
export function activeAvatar(status: boolean) {
    let bgcolor = "#8C8C8C";
    let letter = "";
    let textColor = "#000";
    switch (status) {
        case true: bgcolor = "successVariant80"; textColor = 'successVariant0'; letter = "เปิดใช้งาน"; break;
        case false: bgcolor = "errorTones.98"; textColor = "errorTones.40"; letter = "ปิดใช้งาน"; break;
    }

    return (
        <Box sx={{ backgroundColor: bgcolor, borderRadius: "4px", px: 2, py: 0.5 }}>
            <Typography sx={{ color: textColor }}>{letter}</Typography>
        </Box>
    );
}


export function createPackageColumns(deps: {
    navigate: NavigateFunction;
    setFlash: (f: ITextAlert | null) => void;
    reload: () => void;
    setConfirmPopup: (update: SetStateAction<ITextPopup | null>) => void

}): Column<IPackageItem>[] {
    return [
        {
            id: "package_type",
            label: "ประเภทแพ็กเกจ",
            minWidth: 180,
            align: "left",
            sortable: true,
            render: (row) => (
                <>
                    {/* <Typography variant="body2" >
                        {row?.package_type.name || "-"}
                    </Typography> */}
                    <Typography variant="body2">
                        {labelByCode(
                            PACKAGE_TYPE_LABELS,
                            row?.package_type?.code,
                            row?.package_type?.name || "-"
                        )}
                    </Typography>
                </>
            ),
        },
        {
            id: "package_tier",
            label: "รูปแบบ",
            minWidth: 100,
            align: "left",
            sortable: true,
            render: (row) => (
                <>
                    {/* <Typography variant="body2" >
                        {row?.package_tier.name || "-"}
                    </Typography> */}
                    <Typography variant="body2">
                        {labelByCode(
                            PACKAGE_TIER_LABELS,
                            row?.package_tier?.code,
                            row?.package_tier?.name || "-"
                        )}
                    </Typography>
                </>
            ),
        },
        {
            id: "package_name",
            label: "ชื่อแพ็กเกจ",
            minWidth: 200,
            align: "left",
            sortable: true,
            render: (row) => (
                <>
                    <Typography variant="body2" >
                        {row?.package_name || "-"}
                    </Typography>
                </>
            ),
        },
        {
            id: "billing_type",
            label: "การเรียกเก็บเงิน",
            minWidth: 180,
            align: "left",
            sortable: true,
            render: (row) => {
                // ถ้าเป็นหลาย billing types แต่ UI เดิมแสดงตัวเดียว ให้ใช้ index 0 ตามที่ใช้อยู่
                const first = row?.billing?.[0];
                const label = labelByCode(BILLING_TYPE_LABELS, first?.code, first?.name || "-");
                return <Typography variant="body2">{label}</Typography>;
            },
        },
        {
            id: "price",
            label: "ราคา",
            minWidth: 180,
            align: "right",
            sortable: false,
            render: (row) => {
                const prices: string[] = [];
                const formatPrice = (value: number, unit: string) =>
                    `฿${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2 })}/${unit}`;

                for (const key of ["price_yearly", "price_monthly", "price_daily"] as const) {
                    const item = row[key];
                    if (!item?.is_selected) continue;

                    switch (key) {
                        case "price_yearly":
                            prices.push(formatPrice(item.price, "ปี"));
                            break;
                        case "price_monthly":
                            prices.push(formatPrice(item.price, "เดือน"));
                            break;
                        case "price_daily":
                            prices.push(formatPrice(item.price, "วัน"));
                            break;
                    }
                }
                return (
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                        {prices.length > 0 ? (
                            prices.map((text, i) => (
                                <Typography key={i} variant="body2">
                                    {text}
                                </Typography>
                            ))
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                {"-"}
                            </Typography>
                        )}
                    </Box>
                );
            },
        },
        {
            id: "status",
            label: "สถานะ",
            minWidth: 140,
            align: "left",
            render: (row) => (
                <Box sx={{ display: "flex", justifyContent: "left", alignItems: "left" }}>
                    {activeAvatar(row.is_active)}
                </Box>
            ),
        },

    ];
}