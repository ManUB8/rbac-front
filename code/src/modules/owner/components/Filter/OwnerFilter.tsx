// components/Filter/OwnerFilter.tsx
import React, { useCallback, useMemo, useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    ListItemButton,
    ListItemText,
    Menu,
    Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import { searchStateOwner } from "../../hook/Atom";
import { useFetchOwnerType } from "../../hook/useFetchOwner";
import type { IFilterOwnerType } from "../../interface/OwnerType.interface";
import { OWNER_STATUS_OPTIONS, type StatusKey } from "../../constants/OptionsFilter";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export function useOwnerFilterRenderers() {
    const { user_type } = useFetchOwnerType();
    const [state, setSearchState] = useAtom(searchStateOwner);

    const commonSx = { width: "100%", bgcolor: "background.paper" } as const;

    // =========================
    // USER TYPE (ประเภทบัญชี)
    // =========================
    const [userTypeAnchorEl, setUserTypeAnchorEl] = useState<null | HTMLElement>(null);
    const userTypeOpen = Boolean(userTypeAnchorEl);

    const userTypeOptionsWithAll = useMemo(
        () => [{ id: "0", name: "ทั้งหมด" } as IFilterOwnerType, ...user_type],
        [user_type]
    );

    const userTypeAllOption = useMemo(() => userTypeOptionsWithAll[0], [userTypeOptionsWithAll]);

    const userTypeNonAllOptions = useMemo(
        () => userTypeOptionsWithAll.filter((o) => o.id !== "0"),
        [userTypeOptionsWithAll]
    );

    const selectedUserTypeIds = useMemo(() => {
        const raw = state.user_type_id;
        if (!raw) return new Set<string>(); // "" = all
        return new Set(raw.split(",").filter(Boolean));
    }, [state.user_type_id]);

    const userTypeAllSelected = useMemo(() => {
        if (!state.user_type_id) return true; // "" = all
        return selectedUserTypeIds.size === userTypeNonAllOptions.length;
    }, [state.user_type_id, selectedUserTypeIds, userTypeNonAllOptions.length]);

    const currentUserTypeLabel = useMemo(() => {
        if (userTypeAllSelected) return userTypeAllOption?.name ?? "ทั้งหมด";
        const names = userTypeNonAllOptions
            .filter((o) => selectedUserTypeIds.has(o.id))
            .map((o) => o.name);
        return names.join(", ");
    }, [userTypeAllSelected, userTypeAllOption, userTypeNonAllOptions, selectedUserTypeIds]);

    const toggleUserTypeAll = useCallback(() => {
        setSearchState((p) => ({ ...p, user_type_id: "" }));
        setUserTypeAnchorEl(null);
    }, [setSearchState]);

    const toggleUserTypeOne = useCallback(
        (id: string) => {
            if (id === "0") {
                toggleUserTypeAll();
                return;
            }

            setSearchState((p) => {
                const raw = p.user_type_id;
                const set = new Set<string>();
                if (raw) raw.split(",").filter(Boolean).forEach((x) => set.add(x));

                if (set.has(id)) set.delete(id);
                else set.add(id);

                // ไม่เหลือ หรือ เลือกครบ => ทั้งหมด
                if (set.size === 0 || set.size === userTypeNonAllOptions.length) {
                    return { ...p, user_type_id: "" };
                }

                return { ...p, user_type_id: Array.from(set).sort().join(",") };
            });
        },
        [setSearchState, toggleUserTypeAll, userTypeNonAllOptions.length]
    );

    // =========================
    // STATUS (สถานะบัญชี)
    // =========================
    const [statusAnchorEl, setStatusAnchorEl] = useState<null | HTMLElement>(null);
    const statusOpen = Boolean(statusAnchorEl);

    const statusAllOption = OWNER_STATUS_OPTIONS[0]; // id '0'
    const statusNonAllOptions = useMemo(
        () => OWNER_STATUS_OPTIONS.filter((o) => o.id !== "0"),
        []
    );

    const selectedStatusIds = useMemo(() => {
        const raw = state.count_active_type;
        if (!raw || raw === "0") return new Set<string>(); // ""/0 = all
        return new Set(raw.split(",").filter(Boolean));
    }, [state.count_active_type]);

    const allSelected = useMemo(() => {
        if (!state.count_active_type || state.count_active_type === "0") return true;
        return selectedStatusIds.size === statusNonAllOptions.length;
    }, [state.count_active_type, selectedStatusIds, statusNonAllOptions.length]);

    const hasAnyStatus = useMemo(() => {
        return !allSelected && selectedStatusIds.size > 0;
    }, [allSelected, selectedStatusIds]);

    const currentStatusLabel = useMemo(() => {
        if (allSelected) return statusAllOption.name;
        const names = statusNonAllOptions
            .filter((o) => selectedStatusIds.has(o.id))
            .map((o) => o.name);
        return names.join(", ");
    }, [allSelected, selectedStatusIds, statusAllOption.name, statusNonAllOptions]);

    const toggleAll = useCallback(() => {
        setSearchState((p) => ({ ...p, count_active_type: "0" }));
        setStatusAnchorEl(null);
    }, [setSearchState]);

    const toggleOne = useCallback(
        (id: StatusKey) => {
            if (id === "0") {
                toggleAll();
                return;
            }

            setSearchState((p) => {
                const raw = p.count_active_type;
                const set = new Set<string>();
                if (raw && raw !== "0") raw.split(",").filter(Boolean).forEach((x) => set.add(x));

                if (set.has(id)) set.delete(id);
                else set.add(id);

                if (set.size === 0 || set.size === statusNonAllOptions.length) {
                    return { ...p, count_active_type: "0" };
                }

                return { ...p, count_active_type: Array.from(set).sort().join(",") };
            });
        },
        [setSearchState, statusNonAllOptions.length, toggleAll]
    );

    // =========================
    // FILTERS + RENDER
    // =========================
    const FILTERS: { key: "count_active_type" | "user_type_id"; label: string }[] = [
        { key: "user_type_id", label: "ประเภทบัญชี" },
        { key: "count_active_type", label: "สถานะบัญชี" },
    ];

    const renderBox = useCallback(
        (f: { key: (typeof FILTERS)[number]["key"]; label: string }) => {
            // 1) ประเภทบัญชี
            if (f.key === "user_type_id") {
                return (
                    <>
                        <Button
                            variant="outlined"
                            onClick={(e) => setUserTypeAnchorEl(e.currentTarget)}
                            size="large"
                            sx={{
                                ...commonSx,
                                borderRadius: 1.5,
                                px: 1.5,
                                justifyContent: "space-between",
                                textTransform: "none",
                                display: "flex",
                                alignItems: "center",
                                height: 56,
                            }}
                            endIcon={userTypeOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        >
                            <Typography variant="subtitle2">{f.label}</Typography>
                            <Typography variant="subtitle2" fontWeight={700} maxWidth={140} noWrap>
                                {currentUserTypeLabel}
                            </Typography>
                        </Button>

                        <Menu
                            anchorEl={userTypeAnchorEl}
                            open={userTypeOpen}
                            onClose={() => setUserTypeAnchorEl(null)}
                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
                            slotProps={{
                                paper: { sx: { borderRadius: 2, overflow: "hidden", width: 240, py: 1 } },
                            }}
                        >
                            <Box px={1} pb={0.5}>
                                {/* ทั้งหมด */}
                                <ListItemButton onClick={toggleUserTypeAll}>
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle2" sx={{ width: 150 }}>
                                                {userTypeAllOption?.name ?? "ทั้งหมด"}
                                            </Typography>
                                        }
                                    />
                                    <Checkbox
                                        edge="end"
                                        disableRipple
                                        checked={userTypeAllSelected}
                                        indeterminate={!userTypeAllSelected && selectedUserTypeIds.size > 0}
                                        sx={{
                                            p: 0.5,
                                            color: 'onSecondaryContainer',
                                            '&.MuiCheckbox-indeterminate': { color: 'secondaryContainer' },
                                        }}
                                    />
                                </ListItemButton>

                                {/* ตัวเลือกอื่น */}
                                {userTypeNonAllOptions.map((opt) => (
                                    <ListItemButton key={opt.id} onClick={() => toggleUserTypeOne(opt.id)}>
                                        <ListItemText
                                            primary={
                                                <Typography variant="subtitle2" sx={{ width: 150 }}>
                                                    {opt.name}
                                                </Typography>
                                            }
                                        />
                                        <Checkbox
                                            edge="end"
                                            disableRipple
                                            checked={selectedUserTypeIds.has(opt.id)}
                                            sx={{ p: 0.5 }}
                                        />
                                    </ListItemButton>
                                ))}
                            </Box>
                        </Menu>
                    </>
                );
            }

            // 2) สถานะบัญชี
            return (
                <>
                    <Button
                        variant="outlined"
                        onClick={(e) => setStatusAnchorEl(e.currentTarget)}
                        size="large"
                        sx={{
                            ...commonSx,
                            borderRadius: 1.5,
                            px: 1.5,
                            justifyContent: "space-between",
                            textTransform: "none",
                            display: "flex",
                            alignItems: "center",
                            height: 56,
                        }}
                        endIcon={statusOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    >
                        <Typography variant="subtitle2">{f.label}</Typography>

                        {hasAnyStatus ? (
                            <Typography variant="subtitle2" fontWeight={700} maxWidth={140} noWrap>
                                {currentStatusLabel}
                            </Typography>
                        ) : (
                            <Typography variant="subtitle2" fontWeight={700} maxWidth={140} noWrap>
                                {statusAllOption.name}
                            </Typography>
                        )}
                    </Button>

                    <Menu
                        anchorEl={statusAnchorEl}
                        open={statusOpen}
                        onClose={() => setStatusAnchorEl(null)}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                        slotProps={{
                            paper: { sx: { borderRadius: 2, overflow: "hidden", width: 220, py: 1 } },
                        }}
                    >
                        <Box px={1} pb={0.5}>
                            {/* ทั้งหมด */}
                            <ListItemButton onClick={toggleAll}>
                                <ListItemText
                                    primary={
                                        <Typography variant="subtitle2" sx={{ width: 140 }}>
                                            {statusAllOption.name}
                                        </Typography>
                                    }
                                />
                                <Checkbox
                                    edge="end"
                                    disableRipple
                                    checked={allSelected}
                                    indeterminate={!allSelected && selectedStatusIds.size > 0}
                                    sx={{
                                        p: 0.5,
                                        color: 'onSecondaryContainer',
                                        '&.MuiCheckbox-indeterminate': { color: 'secondaryContainer' },
                                    }}
                                />
                            </ListItemButton>

                            {/* ตัวเลือกอื่น */}
                            {statusNonAllOptions.map((opt) => (
                                <ListItemButton key={opt.id} onClick={() => toggleOne(opt.id)}>
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle2" sx={{ width: 140 }}>
                                                {opt.name}
                                            </Typography>
                                        }
                                    />
                                    <Checkbox
                                        edge="end"
                                        disableRipple
                                        checked={selectedStatusIds.has(opt.id)}
                                        sx={{ p: 0.5 }}
                                    />
                                </ListItemButton>
                            ))}
                        </Box>
                    </Menu>
                </>
            );
        },
        [
            // user type deps
            userTypeOpen,
            userTypeAnchorEl,
            userTypeAllOption,
            userTypeAllSelected,
            userTypeNonAllOptions,
            selectedUserTypeIds,
            currentUserTypeLabel,
            toggleUserTypeAll,
            toggleUserTypeOne,

            // status deps
            statusOpen,
            statusAllOption.name,
            hasAnyStatus,
            currentStatusLabel,
            selectedStatusIds,
            allSelected,
            statusNonAllOptions,
            toggleAll,
            toggleOne,

            // shared
            commonSx,
            setSearchState,
        ]
    );

    return { FILTERS, renderBox };
}