import * as R from 'ramda';
import { useAtom, type SetStateAction } from "jotai";
import { useCallback, useMemo, useRef, useEffect, useState } from "react";
import type { NavigateFunction } from "react-router";
import { Box, Button, Checkbox, Divider, Grid, ListItemButton, ListItemText, ListSubheader, Menu, MenuItem, Typography } from "@mui/material";
import { searchStateSku } from "./AtomSku";
import { useFetchCategory } from "./useFetchMasterSku";
import { setToStatus, SKU_TYPE_LABELS, sortFilterList, statusToSet, type StatusKey } from "../constants/sku_option";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export function useMasterSkuFilterRenderers() {
  const { category } = useFetchCategory(); // สมมติว่า category เป็น list ของ sub-category
  const [searchState, setSearchState] = useAtom(searchStateSku);
  const commonSx = { width: "100%", bgcolor: "background.paper" } as const;
  // anchor แต่ละเมนู
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [catAnchorEl, setCatAnchorEl] = useState<null | HTMLElement>(null);
  const [statusAnchorEl, setStatusAnchorEl] = useState<null | HTMLElement>(null);

  const sortOpen = Boolean(sortAnchorEl);
  const catOpen = Boolean(catAnchorEl);
  const statusOpen = Boolean(statusAnchorEl);

  // state ไว้จำว่า category ไหนกางอยู่
  const [openCategoryIds, setOpenCategoryIds] = useState<string[]>([]);


  const FILTERS: { key: "sort_by" | "status" | "sub_category_ids"; label: string }[] = [
    { key: "sort_by", label: "จัดเรียง" },
    { key: "sub_category_ids", label: "หมวดหมู่สินค้า" },
    { key: "status", label: "สถานะ" }
  ];

  const selectedSubIds = searchState.sub_category_ids;
  const noneCatSelected = selectedSubIds.length === 0;    // = ทั้งหมด
  const indeterminateCat = selectedSubIds.length > 0;

  // label ปัจจุบันของหมวดหมู่
  const firstSubName =
    selectedSubIds.length === 1
      ? (() => {
        const id = selectedSubIds[0];
        for (const catItem of category ?? []) {
          const found = catItem.sub_category?.find(
            (s: any) => s.sub_category_id === id,
          );
          if (found) return found.sub_category_name;
        }
        return undefined;
      })()
      : undefined;

  const currentCategoryLabel =
    selectedSubIds.length === 0
      ? "ทั้งหมด"
      : selectedSubIds.length === 1 && firstSubName
        ? firstSubName
        : `${selectedSubIds.length} รายการที่เลือก`;

  // toggle ทั้งหมด
  const toggleAllSubCategory = () => {
    setSearchState((prev) => ({
      ...prev,
      page: "1",
      sub_category_ids: [],   // กด "ทั้งหมด" = เคลียร์ filter เสมอ
    }));
  };
  
  // toggle ตัวเดียว
  const toggleOneSubCategory = (id: string) => {
    setSearchState((prev) => {
      const exists = prev.sub_category_ids.includes(id);
      const nextIds = exists
        ? prev.sub_category_ids.filter((x) => x !== id)
        : [...prev.sub_category_ids, id];

      return {
        ...prev,
        page: "1",
        sub_category_ids: nextIds,
      };
    });
  };

  // toggle เปิด/ปิด accordion ของ category
  const toggleCategoryOpen = (categoryId: string) => {
    setOpenCategoryIds((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  // หา label ปัจจุบันของ sort_by
  const currentSortOption = sortFilterList
    .flatMap((g) => g.options)
    .find((o) => String(o.value) === searchState.sort_by);

  const selectedSet = statusToSet(searchState.status);
  const hasActive = selectedSet.has('active');
  const hasInactive = selectedSet.has('inactive');
  const hasAnyStatus = selectedSet.size > 0;
  const allSelected = hasActive && hasInactive;

  // label ที่ขึ้นบนปุ่ม
  const currentStatusLabel =
    !hasAnyStatus
      ? ''
      : allSelected
        ? SKU_TYPE_LABELS.all
        : hasActive
          ? SKU_TYPE_LABELS.active
          : SKU_TYPE_LABELS.inactive;

  const toggleAll = () => {
    setSearchState(prev => {
      const set = statusToSet(prev.status);
      let nextSet: Set<StatusKey>;

      if (set.size === 0) {
        // จากไม่มีอะไรเลย -> เลือกทั้งหมด
        nextSet = new Set<StatusKey>(['active', 'inactive']);
      } else if (set.size === 2) {
        // จากเลือกทั้งหมด -> เคลียร์ทั้งหมด
        nextSet = new Set<StatusKey>();
      } else {
        // จากเลือกบางส่วน -> เลือกทั้งหมด
        nextSet = new Set<StatusKey>(['active', 'inactive']);
      }

      return {
        ...prev,
        page: '1',
        status: setToStatus(nextSet),
      };
    });
  };

  const toggleOne = (key: StatusKey) => {
    setSearchState(prev => {
      const set = statusToSet(prev.status);

      if (set.has(key)) {
        set.delete(key);
      } else {
        set.add(key);
      }

      return {
        ...prev,
        page: '1',
        status: setToStatus(set),
      };
    });
  };
  
  const renderBox = useCallback(
    (f: { key: (typeof FILTERS)[number]["key"]; label: string }) => {
      // ------------ จัดเรียง ------------
      if (f.key === "sort_by") {
        return (
          <>
            <Grid container>
              <Button
                variant="outlined"
                onClick={(e) => setSortAnchorEl(e.currentTarget)}
                size="large"
                sx={{
                  ...commonSx,
                  borderRadius: 1.5,
                  px: 1.5,
                  justifyContent: "space-between",
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",           // กัน text ลอย
                  height: 56
                }}
                endIcon={<KeyboardArrowDownIcon />}
              >
                <Typography variant="subtitle1">
                  {f.label}{" "}
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  noWrap
                  sx={{
                    maxWidth: 100, // ปรับตามต้องการ
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {currentSortOption?.label ?? "ใหม่ไปเก่า"}
                </Typography>
              </Button>
              <Menu
                anchorEl={sortAnchorEl}
                open={sortOpen}
                onClose={() => setSortAnchorEl(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                slotProps={{
                  paper: {
                    sx: {
                      borderRadius: '8px',
                      overflow: 'hidden',
                      minWidth: 188,
                      py: 1
                    }
                  }
                }}
              >
                {sortFilterList.map((group, gi) => (
                  <Box key={group.title}>
                    <ListSubheader disableSticky sx={{ typography: 'subtitle2', px: 2, pb: 1 }}>
                      {group.title}
                    </ListSubheader>
                    {group.options.map((opt) => {
                      const selected =
                        String(opt.value) === String(searchState.sort_by);
                      return (
                        <MenuItem
                          key={opt.value}
                          selected={selected}
                          onClick={() => {
                            setSearchState((prev) => ({
                              ...prev,
                              page: "1",
                              sort_by: String(opt.value)
                            }));
                            setSortAnchorEl(null);
                          }}
                          sx={{
                            typography: 'subtitle2',
                            py: 1,
                            px: 2,
                            '&.Mui-selected': { bgcolor: 'action.selected' },
                            '&.Mui-selected:hover': { bgcolor: 'action.hover' }
                          }}
                        >
                          {opt.label}
                        </MenuItem>
                      );
                    })}
                    {gi !== sortFilterList.length - 1 && <Divider />}
                  </Box>
                ))}
              </Menu>
            </Grid>
          </>
        );
      }

      // ------------ หมวดหมู่สินค้า (multi select แบบ grouped) ------------
      if (f.key === "sub_category_ids") {
        return (
          <>
            <Button
              variant="outlined"
              onClick={(e) => setCatAnchorEl(e.currentTarget)}
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
              endIcon={<KeyboardArrowDownIcon />}
            >
              <Typography variant="subtitle2">{f.label} </Typography>
              <Typography
                variant="subtitle2"
                fontWeight={700}
                noWrap
                sx={{
                  maxWidth: 50,
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {currentCategoryLabel}
              </Typography>
            </Button>

            <Menu
              anchorEl={catAnchorEl}
              open={catOpen}
              onClose={() => setCatAnchorEl(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              slotProps={{
                paper: {
                  sx: {
                    width: 360,             // ✅ กว้างขึ้น
                    maxHeight: "80vh",      // ✅ สูงสุด 80% ของจอ
                    borderRadius: 2,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  },
                },
              }}
            >
              {/* แถวบนสุด: ทั้งหมด */}
              <Box px={2} py={1}>
                <ListItemButton onClick={toggleAllSubCategory}>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" sx={{ width: 200 }}>
                        ทั้งหมด
                      </Typography>
                    }
                  />
                  <Checkbox
                    edge="end"
                    disableRipple
                    checked={noneCatSelected}        // ถ้า array ว่าง = tick เหลือง
                    indeterminate={indeterminateCat} // ถ้าเลือกบางอัน = ขีดเหลือง
                    sx={{
                      p: 0.5,
                      color: 'onSecondaryContainer',
                      '&.MuiCheckbox-indeterminate': { color: 'secondaryContainer' },
                    }}
                  />
                </ListItemButton>
              </Box>

              <Divider />

              {/* list category + sub_category */}
              <Box sx={{ maxHeight: 420, overflowY: "auto" }}>
                {(category ?? []).map((catItem: any) => {
                  const isOpen = openCategoryIds.includes(catItem.category_id);

                  return (
                    <Box key={catItem.category_id}>
                      {/* หัว category */}
                      <ListItemButton
                        onClick={() => toggleCategoryOpen(catItem.category_id)}
                        sx={{ px: 2 }}
                      >
                        <ListItemText
                          primary={
                            <Typography variant="subtitle2">
                              {catItem.category_name}
                            </Typography>
                          }
                        />
                        {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </ListItemButton>

                      {/* รายการ sub_category */}
                      {isOpen && (
                        <Box pl={4} pb={1}>
                          {(catItem.sub_category ?? []).map((sub: any) => {
                            const id = sub.sub_category_id;
                            const checked = selectedSubIds.includes(id);
                            return (
                              <ListItemButton
                                key={id}
                                onClick={() => toggleOneSubCategory(id)}
                                sx={{ py: 0.5 }}
                              >
                                <ListItemText
                                  primary={
                                    <Typography variant="subtitle2">
                                      {sub.sub_category_name}
                                    </Typography>
                                  }
                                />
                                <Checkbox
                                  edge="end"
                                  disableRipple
                                  checked={checked}
                                  sx={{ p: 0.5 }}
                                />
                              </ListItemButton>
                            );
                          })}
                        </Box>
                      )}

                      <Divider />
                    </Box>
                  );
                })}
              </Box>
            </Menu>
          </>
        );
      }

      // ------------ สถานะ (single select แบบรูปที่ 3) ------------
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
              height: 56
            }}
            endIcon={<KeyboardArrowDownIcon />}
          >
            <Typography variant="subtitle2">
              {f.label}{" "}
            </Typography>

            {hasAnyStatus && (   // ถ้าไม่มีการเลือก ไม่โชว์ตัวหนาด้านหลัง
              <Typography
                variant="subtitle2"
                textAlign="left"
                fontWeight={700}
                maxWidth={100}
                noWrap
              >
                {currentStatusLabel}
              </Typography>
            )}
          </Button>

          <Menu
            anchorEl={statusAnchorEl}
            open={statusOpen}
            onClose={() => setStatusAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            slotProps={{
              paper: {
                sx: {
                  borderRadius: 2,
                  overflow: 'hidden',
                  width: 200,
                  py: 1
                }
              }
            }}
          >
            <Box px={1} pb={0.5}>
              {/* ทั้งหมด */}
              <ListItemButton onClick={toggleAll}>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" sx={{ width: 116 }}>
                      {SKU_TYPE_LABELS.all}
                    </Typography>
                  }
                />
                <Checkbox
                  edge="end"
                  disableRipple
                  checked={allSelected}
                  indeterminate={hasAnyStatus && !allSelected}
                  sx={{
                    p: 0.5,
                    color: 'onSecondaryContainer',
                    '&.MuiCheckbox-indeterminate': { color: 'secondaryContainer' },
                  }}
                />
              </ListItemButton>

              {/* เปิดใช้งาน */}
              <ListItemButton onClick={() => toggleOne('active')}>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" sx={{ width: 116 }}>
                      {SKU_TYPE_LABELS.active}
                    </Typography>
                  }
                />
                <Checkbox
                  edge="end"
                  disableRipple
                  checked={hasActive}
                  sx={{
                    p: 0.5,
                  }}
                />
              </ListItemButton>

              {/* ปิดใช้งาน */}
              <ListItemButton onClick={() => toggleOne('inactive')}>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" sx={{ width: 116 }}>
                      {SKU_TYPE_LABELS.inactive}
                    </Typography>
                  }
                />
                <Checkbox
                  edge="end"
                  disableRipple
                  checked={hasInactive}
                  sx={{
                    p: 0.5,
                  }}
                />
              </ListItemButton>
            </Box>
          </Menu>
        </>
      );
    },
    [
      sortOpen,
      catOpen,
      statusOpen,
      sortAnchorEl,
      catAnchorEl,
      statusAnchorEl,
      searchState.sort_by,
      searchState.status,
      searchState.sub_category_ids,
      currentSortOption?.label,
      currentCategoryLabel,
      currentStatusLabel,
      setSearchState,
      category,
      indeterminateCat,
      selectedSubIds,
      openCategoryIds,
    ]
  );

  return { FILTERS, renderBox };
}