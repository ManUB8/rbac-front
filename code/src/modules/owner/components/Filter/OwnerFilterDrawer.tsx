import React, { useMemo, useState, useEffect } from "react";
import {
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import { useAtom } from "jotai";
import { searchStateOwner } from "../../hook/Atom";
import { useFetchOwnerType } from "../../hook/useFetchOwner";
import { OWNER_TYPE_LABELS, type StatusKey } from "../../constants/OptionsFilter";
import { useFetchBranchType } from "../../../branch/hook/useFetchBranch";
import { useFetchPackageType } from "../../../product&services/package_services/hook/useFetchMasterPackage";

interface IOwnerFilterDrawerProps {
    open: boolean;
    onClose: () => void;
    onApply?: () => void;
}

const STATUS_OPTIONS: { id: StatusKey; name: string }[] = [
    { id: "0", name: OWNER_TYPE_LABELS["0"] },
    { id: "1", name: OWNER_TYPE_LABELS["1"] },
    { id: "2", name: OWNER_TYPE_LABELS["2"] },
    { id: "3", name: OWNER_TYPE_LABELS["3"] },
];

const OwnerFilterDrawer: React.FC<IOwnerFilterDrawerProps> = ({
    open,
    onClose,
    onApply,
}) => {
    const [searchState, setSearchState] = useAtom(searchStateOwner);
    const { owner_type, food_type, user_type } = useFetchOwnerType();
    const { branch_type, loading_branch_type } = useFetchBranchType();
    const { package_main, package_on } = useFetchPackageType();

    // local filter
    const [localFilter, setLocalFilter] = useState(() => ({
        user_type_id: searchState.user_type_id,
        owner_type_id: searchState.owner_type_id,
        food_type_id: searchState.food_type_id,
        count_active_type: searchState.count_active_type,
        branch_type_id: searchState.branch_type_id,
        branch_active_type: searchState.count_active_type,
        package_main_name: searchState.package_main_name,
        addon_package_name: searchState.addon_package_name,
    }));

    useEffect(() => {
        if (!open) return;
        setLocalFilter({
            user_type_id: searchState.user_type_id,
            owner_type_id: searchState.owner_type_id,
            food_type_id: searchState.food_type_id,
            count_active_type: searchState.count_active_type,
            branch_type_id: searchState.branch_type_id,
            branch_active_type: searchState.count_active_type,
            package_main_name: searchState.package_main_name,
            addon_package_name: searchState.addon_package_name,
        });
    }, [open, searchState]);

    // ✅ state เปิด/ปิดของแต่ละกล่อง (ไม่ใช้ activeOwnerFilter แล้ว)
    const [openUserTypeBox, setOpenUserTypeBox] = useState(false);
    const [openStatusBox, setOpenStatusBox] = useState(false);
    const [openStatusBoxBranch, setOpenStatusBoxBranch] = useState(false);
    const [openFoodTypeBox, setOpenFoodTypeBox] = useState(false);
    const [openOwnerTypeBox, setOpenOwnerTypeBox] = useState(false);
    const [openBranchTypeBox, setOpenBranchTypeBox] = useState(false);
    const [openPackageMainBox, setOpenPackageMainBox] = useState(false);
    const [openPackageOnBox, setOpenPackageOnBox] = useState(false);

    const [showMoreOwnerType, setShowMoreOwnerType] = useState(false);
    const [showMoreUserType, setShowMoreUserType] = useState(false);
    const [showMoreFoodType, setShowMoreFoodType] = useState(false);
    const [showMorePackageMain, setShowMorePackageMain] = useState(false);
    const [showMorePackageOn, setShowMorePackageOn] = useState(false);

    const selectedUserTypeIds = useMemo(
        () =>
            localFilter.user_type_id
                ? localFilter.user_type_id.split(",").filter(Boolean)
                : [],
        [localFilter.user_type_id]
    );

    const selectedOwnerTypeIds = useMemo(
        () =>
            localFilter.owner_type_id
                ? localFilter.owner_type_id.split(",").filter(Boolean)
                : [],
        [localFilter.owner_type_id]
    );

    const selectedPackageMainIds = useMemo(
        () =>
            localFilter.package_main_name
                ? localFilter.package_main_name.split(",").filter(Boolean)
                : [],
        [localFilter.package_main_name]
    );

    const selectedPackageOnIds = useMemo(
        () =>
            localFilter.addon_package_name
                ? localFilter.addon_package_name.split(",").filter(Boolean)
                : [],
        [localFilter.addon_package_name]
    );

    const selectedFoodTypeIds = useMemo(
        () =>
            localFilter.food_type_id
                ? localFilter.food_type_id.split(",").filter(Boolean)
                : [],
        [localFilter.food_type_id]
    );

    const selectedBranchTypeIds = useMemo(
        () =>
            localFilter.branch_type_id
                ? localFilter.branch_type_id.split(",").filter(Boolean)
                : [],
        [localFilter.branch_type_id]
    );

    // สมมติว่า count_active_type เป็น string เช่น "0" หรือ "1,2"
    const isStatusSelected = (id: string, value: string) => {
        if (id === "0") {
            // ปุ่ม "ทั้งหมด"
            return value === "0";
        }

        if (value === "0") return false;

        const selected = value.split(",").filter(Boolean);
        return selected.includes(id);
    };

    const limitList = <T,>(list: T[], showMore: boolean) =>
        showMore ? list : list.slice(0, 3);

    const handleClear = () => {
        setLocalFilter({
            user_type_id: "",
            owner_type_id: "",
            food_type_id: "",
            count_active_type: "0",
            branch_type_id: "",
            branch_active_type: "0",
            package_main_name: '',
            addon_package_name: '',
        });
    };

    const handleApply = () => {
        setSearchState((prev) => ({
            ...prev,
            user_type_id: localFilter.user_type_id,
            owner_type_id: localFilter.owner_type_id,
            food_type_id: localFilter.food_type_id,
            count_active_type: localFilter.count_active_type,
            branch_type_id: localFilter.branch_type_id,
            branch_active_type: localFilter.branch_active_type,
            page: 1,
            package_main_name: localFilter.package_main_name,
            addon_package_name: localFilter.addon_package_name,
        }));
        onApply?.();
        onClose();
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            // slotProps={{
            //     paper: {
            //         sx: { width: 360, maxWidth: "100%", bgcolor: "background.paper" },
            //     },
            // }}
            slotProps={{
                paper: {
                    sx: {
                        width: 360,
                        maxWidth: "100%",
                        bgcolor: "background.paper",
                        display: "flex",          // ใช้ flex ทั้ง paper
                        flexDirection: "column",
                        height: "100vh",          // สูงเต็มหน้าจอ
                    },
                },
            }}
        >
            <Box
                // sx={{ p: 2.5, display: "flex", flexDirection: "column", height: "100%" }}
                sx={{
                    p: 2.5,
                    pb: 0,                      // กันชนให้ footer
                    flex: 1,                    // กินพื้นที่ที่เหลือ
                    overflowY: "auto",          // เลื่อนเฉพาะส่วนนี้
                    minHeight: 0,
                }}
            >
                {/* Header */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Typography fontSize="28px" fontWeight={500} sx={{ flexGrow: 1 }}>
                        {"ตัวกรอง"}
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* บัญชีผู้ใช้งาน */}
                <Typography fontSize="18px" fontWeight={500} sx={{ mb: 1 }}>
                    {"บัญชีผู้ใช้งาน"}
                </Typography>

                <Stack spacing={2} sx={{ mb: 4 }}>
                    {/* กล่อง: ประเภทบัญชี */}
                    <Box
                        sx={
                            openUserTypeBox
                                ? {
                                    borderRadius: 2,
                                    border: "1px solid",
                                    borderColor: "grey.200",
                                    p: 1.5,
                                }
                                : { border: "none", p: 0 }
                        }
                    >
                        <Button
                            fullWidth
                            variant={openUserTypeBox ? "contained" : "outlined"}
                            onClick={() => {
                                setOpenUserTypeBox((p) => !p);
                            }}
                            sx={{
                                height: 48,
                                mb: openUserTypeBox ? 1.5 : 0,
                                borderRadius: 1.5,
                                textTransform: "none",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                                {"ประเภทบัญชี"}
                            </Typography>
                        </Button>

                        {openUserTypeBox && (
                            <>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    {"เลือกประเภทบัญชี"}
                                </Typography>
                                <Stack spacing={1}>
                                    {limitList(user_type, showMoreUserType).map((ot) => {
                                        const isSelected = selectedUserTypeIds.includes(ot.id);

                                        return (
                                            <Button
                                                key={ot.id}
                                                fullWidth
                                                variant={isSelected ? "contained" : "outlined"}
                                                onClick={() =>
                                                    setLocalFilter((prev) => {
                                                        const currentIds = prev.user_type_id
                                                            ? prev.user_type_id.split(",").filter(Boolean)
                                                            : [];

                                                        const exists = currentIds.includes(ot.id);
                                                        const nextIds = exists
                                                            ? currentIds.filter((id) => id !== ot.id)
                                                            : [...currentIds, ot.id];

                                                        return {
                                                            ...prev,
                                                            user_type_id: nextIds.join(","),
                                                        };
                                                    })
                                                }
                                                sx={{
                                                    height: 48,
                                                    borderRadius: 1.5,
                                                    textTransform: "none",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                                                    {ot.name}
                                                </Typography>
                                            </Button>
                                        );
                                    })}
                                </Stack>

                                {user_type.length > 3 && (
                                    <Button
                                        variant="text"
                                        onClick={() => setShowMoreUserType((p) => !p)}
                                        startIcon={
                                            <ArrowDownwardOutlinedIcon
                                                sx={{
                                                    transform: showMoreUserType ? "rotate(180deg)" : "none",
                                                    transition: "transform 0.2s",
                                                }}
                                            />
                                        }
                                        sx={{ mt: 1, justifyContent: "flex-start" }}
                                    >
                                        {showMoreUserType ? "แสดงน้อยลง" : "แสดงเพิ่ม"}
                                    </Button>
                                )}
                            </>
                        )}
                    </Box>

                    {/* กล่อง: สถานะบัญชี */}
                    <Box
                        sx={
                            openStatusBox
                                ? {
                                    borderRadius: 2,
                                    border: "1px solid",
                                    borderColor: "grey.200",
                                    p: 1.5,
                                }
                                : { border: "none", p: 0 }
                        }
                    >
                        <Button
                            fullWidth
                            variant={openStatusBox ? "contained" : "outlined"}
                            onClick={() => {
                                setOpenStatusBox((p) => !p);
                            }}
                            sx={{
                                height: 48,
                                mb: openStatusBox ? 1.5 : 0,
                                borderRadius: 1.5,
                                textTransform: "none",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                                {"สถานะบัญชี"}
                            </Typography>

                        </Button>

                        {openStatusBox && (
                            <>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    {"เลือกสถานะบัญชี"}
                                </Typography>
                                <Stack spacing={1}>
                                    {STATUS_OPTIONS.map((st) => (
                                        <Button
                                            key={st.id}
                                            fullWidth
                                            variant={
                                                isStatusSelected(st.id, localFilter.count_active_type)
                                                    ? "contained"
                                                    : "outlined"
                                            }
                                            onClick={() =>
                                                setLocalFilter((prev) => {
                                                    const allIds = ["1", "2", "3"]; // ids ที่ถือว่าเป็นชุดครบ

                                                    // ดึงค่าปัจจุบันมาทำเป็น array
                                                    let current =
                                                        prev.count_active_type === "0"
                                                            ? []
                                                            : prev.count_active_type.split(",").filter(Boolean);

                                                    // toggle ค่า
                                                    if (st.id === "0") {
                                                        // ถ้ากด "ทั้งหมด" → รีเซ็ตเป็น 0 เลย
                                                        return { ...prev, count_active_type: "0" };
                                                    }

                                                    if (current.includes(st.id)) {
                                                        // ถ้าเคยมีอยู่แล้ว → เอาออก
                                                        current = current.filter((x) => x !== st.id);
                                                    } else {
                                                        // ถ้าไม่มี → เพิ่มเข้าไป
                                                        current.push(st.id);
                                                    }

                                                    // ถ้าไม่เหลืออะไรเลย → ถือว่าทั้งหมด
                                                    if (current.length === 0) {
                                                        return { ...prev, count_active_type: "0" };
                                                    }

                                                    // ถ้าเลือกครบ 1,2,3 → ถือว่า "ทั้งหมด" → 0
                                                    const isAllSelected =
                                                        allIds.every((x) => current.includes(x)) &&
                                                        current.length === allIds.length;

                                                    if (isAllSelected) {
                                                        return { ...prev, count_active_type: "0" };
                                                    }

                                                    // อื่น ๆ (เลือก 1 หรือ 2 ตัว) → ส่งเป็น "1" หรือ "1,2" แบบนี้ได้เลย
                                                    return {
                                                        ...prev,
                                                        count_active_type: current.join(","),
                                                    };
                                                })
                                            }
                                            sx={{
                                                height: 48,
                                                borderRadius: 1.5,
                                                textTransform: "none",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                                                {st.name}
                                            </Typography>
                                        </Button>
                                    ))}
                                </Stack>
                            </>
                        )}
                    </Box>

                    {/* กล่อง: ประเภทร้านค้า */}
                    <Box
                        sx={
                            openOwnerTypeBox
                                ? {
                                    borderRadius: 2,
                                    border: "1px solid",
                                    borderColor: "grey.200",
                                    p: 1.5,
                                }
                                : { border: "none", p: 0 }
                        }
                    >
                        <Button
                            fullWidth
                            variant={openOwnerTypeBox ? "contained" : "outlined"}
                            onClick={() => {
                                setOpenOwnerTypeBox((p) => !p);
                            }}
                            sx={{
                                height: 48,
                                mb: openOwnerTypeBox ? 1.5 : 0,
                                borderRadius: 1.5,
                                textTransform: "none",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                                {"ประเภทร้านค้า"}
                            </Typography>
                        </Button>

                        {openOwnerTypeBox && (
                            <>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    {"เลือกประเภทร้านค้า"}
                                </Typography>
                                <Stack spacing={1}>
                                    {limitList(owner_type, showMoreOwnerType).map((v) => {
                                        const isSelected = selectedOwnerTypeIds.includes(v.id);

                                        return (
                                            <Button
                                                key={v.id}
                                                fullWidth
                                                variant={isSelected ? "contained" : "outlined"}
                                                onClick={() =>
                                                    setLocalFilter((prev) => {
                                                        const currentIds = prev.owner_type_id
                                                            ? prev.owner_type_id.split(",").filter(Boolean)
                                                            : [];

                                                        const exists = currentIds.includes(v.id);
                                                        const nextIds = exists
                                                            ? currentIds.filter((id) => id !== v.id) // กดซ้ำ = เอาออก
                                                            : [...currentIds, v.id];                // ยังไม่มี = เพิ่มเข้าไป

                                                        return {
                                                            ...prev,
                                                            owner_type_id: nextIds.join(","),       // 👉 "id1,id2,..." ที่นายต้องการ
                                                        };
                                                    })
                                                }
                                                sx={{
                                                    height: 48,
                                                    borderRadius: 1.5,
                                                    textTransform: "none",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                                                    {v.name}
                                                </Typography>
                                            </Button>
                                        );
                                    })}
                                </Stack>

                                {owner_type.length > 3 && (
                                    <Button
                                        variant="text"
                                        color="info"
                                        onClick={() => setShowMoreOwnerType((p) => !p)}
                                        startIcon={
                                            <ArrowDownwardOutlinedIcon
                                                sx={{
                                                    transform: showMoreOwnerType ? "rotate(180deg)" : "none",
                                                    transition: "transform 0.2s",
                                                }}
                                            />
                                        }
                                        sx={{
                                            mt: 1,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: "100%",
                                            textAlign: "center",
                                        }}
                                    >
                                        {showMoreOwnerType ? "แสดงน้อยลง" : "แสดงเพิ่ม"}
                                    </Button>
                                )}
                            </>
                        )}
                    </Box>

                    {/* กล่อง: ประเภทร้านอาหาร */}
                    <Box
                        sx={
                            openFoodTypeBox
                                ? {
                                    borderRadius: 2,
                                    border: "1px solid",
                                    borderColor: "grey.200",
                                    p: 1.5,
                                }
                                : { border: "none", p: 0 }
                        }
                    >
                        <Button
                            fullWidth
                            variant={openFoodTypeBox ? "contained" : "outlined"}
                            onClick={() => {
                                setOpenFoodTypeBox((p) => !p);
                            }}
                            sx={{
                                height: 48,
                                mb: openFoodTypeBox ? 1.5 : 0,
                                borderRadius: 1.5,
                                textTransform: "none",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                                {"ประเภทร้านอาหาร"}
                            </Typography>
                        </Button>

                        {openFoodTypeBox && (
                            <>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    เลือกประเภทร้านอาหาร
                                </Typography>
                                <Stack spacing={1}>
                                    {limitList(food_type, showMoreFoodType).map((ft) => {
                                        const isSelected = selectedFoodTypeIds.includes(ft.id);

                                        return (
                                            <Button
                                                key={ft.id}
                                                fullWidth
                                                variant={isSelected ? "contained" : "outlined"}
                                                onClick={() =>
                                                    setLocalFilter((prev) => {
                                                        const currentIds = prev.food_type_id
                                                            ? prev.food_type_id.split(",").filter(Boolean)
                                                            : [];

                                                        const exists = currentIds.includes(ft.id);
                                                        const nextIds = exists
                                                            ? currentIds.filter((id) => id !== ft.id) // ถ้ามีแล้ว → เอาออก
                                                            : [...currentIds, ft.id];                // ถ้ายังไม่มี → เพิ่มเข้าไป

                                                        return {
                                                            ...prev,
                                                            food_type_id: nextIds.join(","),         // 👉 "id1,id2,id3"
                                                        };
                                                    })
                                                }
                                                sx={{
                                                    height: 48,
                                                    borderRadius: 1.5,
                                                    textTransform: "none",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                                                    {ft.name}
                                                </Typography>
                                            </Button>
                                        );
                                    })}
                                </Stack>
                                {food_type.length > 3 && (
                                    <Button
                                        variant="text"
                                        color="info"
                                        onClick={() => setShowMoreFoodType((p) => !p)}
                                        startIcon={
                                            <ArrowDownwardOutlinedIcon
                                                sx={{
                                                    transform: showMoreFoodType ? "rotate(180deg)" : "none",
                                                    transition: "transform 0.2s",
                                                }}
                                            />
                                        }
                                        sx={{
                                            mt: 1,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: "100%",
                                            textAlign: "center",
                                        }}
                                    >
                                        {showMoreFoodType ? "แสดงน้อยลง" : "แสดงเพิ่ม"}
                                    </Button>
                                )}
                            </>
                        )}
                    </Box>
                </Stack>

                <Divider sx={{ marginBottom: 2 }} />
                {/* บัญชีสาขา */}
                <Typography fontSize="18px" fontWeight={500} sx={{ mb: 1 }}>
                    {"บัญชีสาขา"}
                </Typography>

                <Stack spacing={2} sx={{ mb: 4 }}>
                    {/* กล่อง: ประเภทสาขา */}
                    <Box
                        sx={
                            openBranchTypeBox
                                ? {
                                    borderRadius: 2,
                                    border: "1px solid",
                                    borderColor: "grey.200",
                                    p: 1.5,
                                }
                                : { border: "none", p: 0 }
                        }
                    >
                        <Button
                            fullWidth
                            variant={openBranchTypeBox ? "contained" : "outlined"}
                            onClick={() => {
                                setOpenBranchTypeBox((p) => !p);
                            }}
                            sx={{
                                height: 48,
                                mb: openBranchTypeBox ? 1.5 : 0,
                                borderRadius: 1.5,
                                textTransform: "none",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                                {"ประเภทสาขา"}
                            </Typography>
                        </Button>

                        {openBranchTypeBox && (
                            <>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    {"เลือกประเภทสาขา"}
                                </Typography>
                                <Stack spacing={1}>
                                    {branch_type.map((bt) => (
                                        <Button
                                            key={bt.id}
                                            fullWidth
                                            variant={
                                                localFilter.branch_type_id === bt.id
                                                    ? "contained"
                                                    : "outlined"
                                            }
                                            onClick={() =>
                                                setLocalFilter((prev) => ({
                                                    ...prev,
                                                    branch_type_id:
                                                        prev.branch_type_id === bt.id ? " " : bt.id,
                                                }))
                                            }
                                            sx={{
                                                height: 48,
                                                borderRadius: 1.5,
                                                textTransform: "none",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                                                {bt.name}
                                            </Typography>
                                        </Button>
                                    ))}
                                </Stack>
                            </>
                        )}
                    </Box>

                    {/* กล่อง: สถานะร้านค้า */}
                    <Box
                        sx={
                            openStatusBoxBranch
                                ? {
                                    borderRadius: 2,
                                    border: "1px solid",
                                    borderColor: "grey.200",
                                    p: 1.5,
                                }
                                : { border: "none", p: 0 }
                        }
                    >
                        <Button
                            fullWidth
                            variant={openStatusBoxBranch ? "contained" : "outlined"}
                            onClick={() => {
                                setOpenStatusBoxBranch((p) => !p);
                            }}
                            sx={{
                                height: 48,
                                mb: openStatusBoxBranch ? 1.5 : 0,
                                borderRadius: 1.5,
                                textTransform: "none",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                                {"สถานะร้านค้า"}
                            </Typography>

                        </Button>

                        {openStatusBoxBranch && (
                            <>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    {"เลือกสถานะร้านค้า"}
                                </Typography>
                                <Stack spacing={1}>
                                    {STATUS_OPTIONS.map((st) => (
                                        <Button
                                            key={st.id}
                                            fullWidth
                                            variant={
                                                isStatusSelected(st.id, localFilter.branch_active_type)
                                                    ? "contained"
                                                    : "outlined"
                                            }
                                            onClick={() =>
                                                setLocalFilter((prev) => {
                                                    const allIds = ["1", "2", "3"]; // ids ที่ถือว่าเป็นชุดครบ

                                                    // ดึงค่าปัจจุบันมาทำเป็น array
                                                    let current =
                                                        prev.branch_active_type === "0"
                                                            ? []
                                                            : prev.branch_active_type.split(",").filter(Boolean);

                                                    // toggle ค่า
                                                    if (st.id === "0") {
                                                        // ถ้ากด "ทั้งหมด" → รีเซ็ตเป็น 0 เลย
                                                        return { ...prev, branch_active_type: "0" };
                                                    }

                                                    if (current.includes(st.id)) {
                                                        // ถ้าเคยมีอยู่แล้ว → เอาออก
                                                        current = current.filter((x) => x !== st.id);
                                                    } else {
                                                        // ถ้าไม่มี → เพิ่มเข้าไป
                                                        current.push(st.id);
                                                    }

                                                    // ถ้าไม่เหลืออะไรเลย → ถือว่าทั้งหมด
                                                    if (current.length === 0) {
                                                        return { ...prev, branch_active_type: "0" };
                                                    }

                                                    // ถ้าเลือกครบ 1,2,3 → ถือว่า "ทั้งหมด" → 0
                                                    const isAllSelected =
                                                        allIds.every((x) => current.includes(x)) &&
                                                        current.length === allIds.length;

                                                    if (isAllSelected) {
                                                        return { ...prev, branch_active_type: "0" };
                                                    }

                                                    // อื่น ๆ (เลือก 1 หรือ 2 ตัว) → ส่งเป็น "1" หรือ "1,2" แบบนี้ได้เลย
                                                    return {
                                                        ...prev,
                                                        branch_active_type: current.join(","),
                                                    };
                                                })
                                            }
                                            sx={{
                                                height: 48,
                                                borderRadius: 1.5,
                                                textTransform: "none",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                                                {st.name}
                                            </Typography>
                                        </Button>
                                    ))}
                                </Stack>
                            </>
                        )}
                    </Box>

                    {/* กล่อง: แพ็คเกจหลัก */}
                    <Box
                        sx={
                            openPackageMainBox
                                ? {
                                    borderRadius: 2,
                                    border: "1px solid",
                                    borderColor: "grey.200",
                                    p: 1.5,
                                }
                                : { border: "none", p: 0 }
                        }
                    >
                        <Button
                            fullWidth
                            variant={openPackageMainBox ? "contained" : "outlined"}
                            onClick={() => {
                                setOpenPackageMainBox((p) => !p);
                            }}
                            sx={{
                                height: 48,
                                mb: openPackageMainBox ? 1.5 : 0,
                                borderRadius: 1.5,
                                textTransform: "none",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                                {"แพ็คเกจหลัก"}
                            </Typography>
                        </Button>

                        {openPackageMainBox && (
                            <>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    {"เลือกแพ็คเกจหลัก"}
                                </Typography>
                                <Stack spacing={1}>
                                    {limitList(package_main, showMorePackageMain).map((v) => {
                                        const isSelected = selectedPackageMainIds.includes(v.package_name);

                                        return (
                                            <Button
                                                key={v.package_id}
                                                fullWidth
                                                variant={isSelected ? "contained" : "outlined"}
                                                onClick={() =>
                                                    setLocalFilter((prev) => {
                                                        const currentIds = prev.package_main_name
                                                            ? prev.package_main_name.split(",").filter(Boolean)
                                                            : [];

                                                        const exists = currentIds.includes(v.package_name);
                                                        const nextIds = exists
                                                            ? currentIds.filter((name) => name !== v.package_name) // กดซ้ำ = เอาออก
                                                            : [...currentIds, v.package_name];                // ยังไม่มี = เพิ่มเข้าไป

                                                        return {
                                                            ...prev,
                                                            package_main_name: nextIds.join(","),       // 👉 "id1,id2,..." ที่นายต้องการ
                                                        };
                                                    })
                                                }
                                                sx={{
                                                    height: 48,
                                                    borderRadius: 1.5,
                                                    textTransform: "none",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                                                    {v.package_name}
                                                </Typography>
                                            </Button>
                                        );
                                    })}
                                </Stack>

                                {package_main.length > 3 && (
                                    <Button
                                        variant="text"
                                        color="info"
                                        onClick={() => setShowMorePackageMain((p) => !p)}
                                        startIcon={
                                            <ArrowDownwardOutlinedIcon
                                                sx={{
                                                    transform: showMorePackageMain ? "rotate(180deg)" : "none",
                                                    transition: "transform 0.2s",
                                                }}
                                            />
                                        }
                                        sx={{
                                            mt: 1,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: "100%",
                                            textAlign: "center",
                                        }}
                                    >
                                        {showMorePackageMain ? "แสดงน้อยลง" : "แสดงเพิ่ม"}
                                    </Button>
                                )}
                            </>
                        )}
                    </Box>

                    {/* กล่อง: แพ็คเกจเสริม */}
                    <Box
                        sx={
                            openPackageOnBox
                                ? {
                                    borderRadius: 2,
                                    border: "1px solid",
                                    borderColor: "grey.200",
                                    p: 1.5,
                                }
                                : { border: "none", p: 0 }
                        }
                    >
                        <Button
                            fullWidth
                            variant={openPackageOnBox ? "contained" : "outlined"}
                            onClick={() => {
                                setOpenPackageOnBox((p) => !p);
                            }}
                            sx={{
                                height: 48,
                                mb: openPackageOnBox ? 1.5 : 0,
                                borderRadius: 1.5,
                                textTransform: "none",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                                {"แพ็คเกจเสริม"}
                            </Typography>
                        </Button>

                        {openPackageOnBox && (
                            <>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    {"เลือกแพ็คเกจเสริม"}
                                </Typography>
                                <Stack spacing={1}>
                                    {limitList(package_on, showMorePackageOn).map((v) => {
                                        const isSelected = selectedPackageOnIds.includes(v.package_name);

                                        return (
                                            <Button
                                                key={v.package_id}
                                                fullWidth
                                                variant={isSelected ? "contained" : "outlined"}
                                                onClick={() =>
                                                    setLocalFilter((prev) => {
                                                        const currentIds = prev.addon_package_name
                                                            ? prev.addon_package_name.split(",").filter(Boolean)
                                                            : [];

                                                        const exists = currentIds.includes(v.package_name);
                                                        const nextIds = exists
                                                            ? currentIds.filter((name) => name !== v.package_name) // กดซ้ำ = เอาออก
                                                            : [...currentIds, v.package_name];                // ยังไม่มี = เพิ่มเข้าไป

                                                        return {
                                                            ...prev,
                                                            addon_package_name: nextIds.join(","),       // 👉 "id1,id2,..." ที่นายต้องการ
                                                        };
                                                    })
                                                }
                                                sx={{
                                                    height: 48,
                                                    borderRadius: 1.5,
                                                    textTransform: "none",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                                                    {v.package_name}
                                                </Typography>
                                            </Button>
                                        );
                                    })}
                                </Stack>

                                {package_on.length > 3 && (
                                    <Button
                                        variant="text"
                                        color="info"
                                        onClick={() => setShowMorePackageOn((p) => !p)}
                                        startIcon={
                                            <ArrowDownwardOutlinedIcon
                                                sx={{
                                                    transform: showMorePackageOn ? "rotate(180deg)" : "none",
                                                    transition: "transform 0.2s",
                                                }}
                                            />
                                        }
                                        sx={{
                                            mt: 1,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: "100%",
                                            textAlign: "center",
                                        }}
                                    >
                                        {showMorePackageOn ? "แสดงน้อยลง" : "แสดงเพิ่ม"}
                                    </Button>
                                )}
                            </>
                        )}
                    </Box>

                </Stack>
            </Box>

            {/* ปุ่มล่าง */}
            <Box
                sx={{
                    borderTop: "1px solid",
                    borderColor: "divider",
                    p: 2.5,
                    pt: 2,
                }}
            >
                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button variant="outlined" fullWidth sx={{ height: '60px' }} onClick={handleClear}>
                        {"ล้าง"}
                    </Button>
                    <Button variant="contained" fullWidth sx={{ height: '60px' }} onClick={handleApply}>
                        {"บันทึก"}
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default OwnerFilterDrawer;