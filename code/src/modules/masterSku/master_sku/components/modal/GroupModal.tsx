import React, { useEffect, useMemo, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    Divider,
    IconButton,
    List,
    ListItemButton,
    Stack,
    Typography,
    CircularProgress,
} from "@mui/material";
import CloseIcon from "../../../../../assets/svg/icon/close.svg";
import SearchOrder from "../../../../../shared/components/search/SearchOrder";
import { useFetchGroup } from "../../hook/useFetchMasterSku";
import type { UseFormGetValues } from "react-hook-form";
import type { IGroupOption, IMasterSkuData } from "../../interface/MadterSku.interface";
import BookIcon from "../../../../../assets/image/book.png"

export interface IGroupModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    getValues: UseFormGetValues<IMasterSkuData>
    // optional: ถ้าต้องส่งค่ากลับ
    onSelectGroup?: (g: any) => void;
    onSave?: (group: IGroupOption) => void;      // ✅ ส่งค่ากลับตอนกดบันทึก
}

const GroupModal: React.FunctionComponent<IGroupModalProps> = ({
    isOpen,
    setIsOpen,
    onSelectGroup,
    onSave,
    getValues
}) => {
    const masterName = (getValues("master_item_name") ?? "").trim();
    const [searchGroup, setSearchGroup] = useState(masterName);
    const [debounced, setDebounced] = useState(masterName);
    const [dirty, setDirty] = useState(false); // ผู้ใช้เคยแก้ search แล้วไหม
    const [selected, setSelected] = useState<any | null>(null);

    useEffect(() => {
        if (!isOpen) return;
        setSelected(null); // เปิดใหม่เคลียร์ selection
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        // ถ้ายังไม่เคยพิมพ์เอง ให้ sync ค่าจาก form เข้า search
        if (!dirty) {
            setSearchGroup(masterName);
            setDebounced(masterName);
        }
    }, [isOpen, masterName, dirty]);

    // 2) debounce เวลาพิมพ์
    useEffect(() => {
        const t = setTimeout(() => setDebounced(searchGroup.trim()), 300);
        return () => clearTimeout(t);
    }, [searchGroup]);

    // 3) ใช้ debounced ใน query (สำคัญ)
    const enabled = debounced.trim().length > 0;
    const { group, loading_group } = useFetchGroup(debounced, { enabled });

    const list = useMemo(() => (Array.isArray(group) ? group : []), [group]);

    const handleClose = () => {
        setIsOpen(false);
        setSearchGroup("");
        setDebounced("");
        setDirty(false);
    };

    const handleSave = () => {
        if (!selected) return;            // ยังไม่เลือก ไม่ต้องส่ง
        onSave?.(selected);               // ✅ ส่ง object กลับไป
        handleClose();                    // ปิด modal
    };

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={isOpen}
            onClose={handleClose}
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 2.5,
                        p: 3,
                        width: 720,
                        maxWidth: "none",
                        height: "80vh",
                        display: "flex",
                        flexDirection: "column",
                    },
                },
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                    gap: 1,
                }}
            >
                <IconButton
                    onClick={handleClose}
                    sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: "surfaceContainerLowest",
                        "&:hover": { bgcolor: "surfaceContainerLow" },
                    }}
                >
                    <img src={CloseIcon} alt="close" />
                </IconButton>

                <Typography variant="h5">ชื่อกลุ่มสินค้า</Typography>

                <Button
                    onClick={handleSave}
                    variant="contained"
                    disabled={!selected}   // ✅ กดได้เมื่อเลือกแล้ว
                >
                    <Typography variant="button">{"บันทึก"}</Typography>
                </Button>
            </Box>

            <DialogContent sx={{ flex: 1, overflow: "auto", p: 0 }}>
                <Stack spacing={2}>
                    <SearchOrder
                        searchValue={searchGroup}
                        handleChangeSearch={(e: any) => {
                            setDirty(true);
                            setSearchGroup(e.target.value);
                        }}
                    />

                    {/* Content */}
                    <Box sx={{ flex: 1 }}>
                        {loading_group ? (
                            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                                <CircularProgress />
                            </Box>
                        ) : debounced.trim().length === 0 ? (
                            <Box
                                sx={{
                                    borderRadius: 2,
                                    border: (t) => `1px solid ${t.palette.divider}`,
                                    p: 5,
                                    textAlign: "center",
                                    color: "text.secondary",
                                }}
                            >
                                {"พิมพ์คำค้นหาเพื่อแสดงรายการกลุ่มสินค้า"}
                            </Box>
                        ) : list.length === 0 ? (
                            <Box
                                sx={{
                                    borderRadius: 2,
                                    border: (t) => `1px solid ${t.palette.divider}`,
                                    p: 5,
                                    textAlign: "center",
                                }}
                            >
                                <Box sx={{ mb: 2 }}>
                                    {/* ถ้ามีนายมีรูป icon ก็ใส่แทนได้ */}
                                    <Box
                                        sx={{
                                            width: 72,
                                            height: 72,
                                            borderRadius: 2,
                                            mx: "auto",
                                            bgcolor: "surfaceContainerLowest",
                                            display: "grid",
                                            placeItems: "center",
                                            fontSize: 28,
                                        }}
                                    >
                                        <img src={BookIcon} style={{ width: 72, height: 72 }} />
                                    </Box>
                                </Box>
                                <Typography sx={{ fontWeight: 700, mb: 0.5 }}>
                                    {"ไม่มีข้อมูลในผลการค้นหา"}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {"โปรดลองตรวจสอบคำค้นหา หรือเปลี่ยนคำค้นหาใหม่"}
                                    <br />
                                    {"หากพบปัญหากรุณาติดต่อผู้ดูแลระบบ"}
                                </Typography>
                            </Box>
                        ) : (
                            <Box>
                                {/* <Divider /> */}
                                <List disablePadding>
                                    {list.map((g: any) => (
                                        <React.Fragment key={g.group_id ?? g.group_code}>
                                            <ListItemButton
                                                onClick={() => setSelected(g)}
                                                sx={(theme) => {
                                                    const isSelected = selected?.group_id === g.group_id;

                                                    return {
                                                        px: 2,
                                                        py: 1.5,
                                                        borderRadius: 0,
                                                        // สีตอนเลือกแล้ว
                                                        bgcolor: isSelected ? "secondaryContainer" : "transparent",
                                                        // สีตอน hover
                                                        "&:hover": {
                                                            bgcolor: isSelected
                                                                ? "secondaryContainer"   // ถ้าเลือกแล้ว ไม่เปลี่ยนสี
                                                                : "secondaryTones.95",   // ถ้ายังไม่เลือก
                                                        },
                                                        transition: theme.transitions.create("background-color", {
                                                            duration: theme.transitions.duration.shortest,
                                                        }),
                                                    };
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: "100%",
                                                        display: "grid",
                                                        gridTemplateColumns: "1.6fr 1fr 0.7fr",
                                                        alignItems: "center",
                                                        gap: 1,
                                                    }}
                                                >
                                                    <Typography sx={{ fontWeight: 500 }}>
                                                        {g.group_name ?? "-"}
                                                    </Typography>

                                                    <Typography color="text.secondary">
                                                        {g.group_code ?? "-"}
                                                    </Typography>
                                                </Box>
                                            </ListItemButton>
                                            <Divider />
                                        </React.Fragment>
                                    ))}
                                </List>
                            </Box>
                        )}
                    </Box>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default GroupModal;