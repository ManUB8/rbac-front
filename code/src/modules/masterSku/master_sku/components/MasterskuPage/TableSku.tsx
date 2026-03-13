import { useAtom, useSetAtom, type SetStateAction } from 'jotai';
import React from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { confirmPopupAtom, flashAlertAtom } from '../../../../../shared/components/constants/OptionsAtom';
import type { IMasterItem } from '../../interface/MadterSku.interface';
import { Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material';
import type { ITextAlert } from '../../../../../shared/components/message/Alert.interface';
import type { ITextPopup } from '../../../../../shared/components/popup/PopupConfirm.interface';
import { AppRoutes } from '../../../../../router/router';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import EditIcon from "../../../../../assets/svg/icon/Edit.svg";
import DeleteOutlinedIcon from "../../../../../assets/svg/icon/DeleteOutlined.svg";

// ===== Generic Column =====
export interface Column<T> {
    id: string;
    label: string;
    headerRender?: () => React.ReactNode;
    align: "center" | "left" | "right";
    minWidth: number;
    render: (row: T) => React.ReactNode;
}
// ===== Badge
//  สถานะ =====
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

function RowActions({
    row,
    navigate,
    setFlash,
    reload,
    setConfirmPopup,
}: {
    row: IMasterItem;
    navigate: NavigateFunction;
    setFlash: (f: ITextAlert | null) => void;
    reload: () => void;
    setConfirmPopup: (u: SetStateAction<ITextPopup | null>) => void;
}) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <>
            <IconButton size="small" onClick={handleOpen} aria-haspopup="true" aria-controls={`row-menu-${row.master_item_id}`}>
                <MoreHorizIcon sx={{ color: "secondary.100" }} />
            </IconButton>

            <Menu
                id={`row-menu-${row.master_item_id}`}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem
                    onClick={() => {
                        handleClose();
                        navigate(`${AppRoutes.master_sku}/view/edit/${row.master_item_id}`);
                    }}
                >
                    <ListItemIcon>
                        <Box component="img" src={EditIcon} sx={{ width: 18, height: 18 }} />
                    </ListItemIcon>
                    <ListItemText primary="แก้ไข" />
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        handleClose();
                        // onClickDeleteOwner({
                        //   navigate,
                        //   setFlash,
                        //   id: row.master_item_id,
                        //   reload,
                        //   setConfirmPopup,
                        // });
                    }}
                >
                    <ListItemIcon>
                        <Box component="img" src={DeleteOutlinedIcon} sx={{ width: 18, height: 18 }} />
                    </ListItemIcon>
                    <ListItemText primary="ลบ" />
                </MenuItem>
            </Menu>
        </>
    );
}

// เปลี่ยนชื่อให้เป็น useMasterSkuColumns จะได้ตาม rule hook ด้วย
export function useMasterSkuColumns(deps: {
  reload: () => void;
}): Column<IMasterItem>[] {
  const { reload } = deps;
  const navigate = useNavigate();
  const [, setConfirmPopup] = useAtom(confirmPopupAtom);
  const setFlash = useSetAtom(flashAlertAtom);

  return React.useMemo<Column<IMasterItem>[]>(() => [
    {
      id: "group_name",
      label: "กลุ่มสินค้า",
      minWidth: 200,
      align: "left",
      render: (row) => (
        <Typography variant="subtitle2">{row?.group_name || "-"}</Typography>
      ),
    },
    {
      id: "master_item_name",
      label: "ชื่อ สินค้า ",
      minWidth: 350,
      align: "left",
      render: (row) => (
        <Typography variant="subtitle2">{row?.master_item_name || "-"}</Typography>
      ),
    },
    {
      id: "category_and_sub_category_name",
      label: "หมวดหมู่สินค้า",
      minWidth: 300,
      align: "center",
      render: (row) => (
        <Typography variant="subtitle2">
          {row?.category_and_sub_category_name || "-"}
        </Typography>
      ),
    },
    {
      id: "stock_unit_per_small_unit",
      label: "หน่วยเก็บ/หน่วยใช้",
      minWidth: 300,
      align: "center",
      render: (row) => (
        <Typography variant="subtitle2">
          {row?.stock_unit_per_small_unit || "-"}
        </Typography>
      ),
    },
    {
      id: "active_type",
      label: "สถานะบัญชี",
      minWidth: 150,
      align: "center",
      render: (row) => (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          {activeAvatar(row.is_active)}
        </Box>
      ),
    },
    {
      id: "management",
      label: "",
      headerRender: () => <AddBoxOutlinedIcon />,
      minWidth: 64,
      align: "center",
      render: (row) => (
        <RowActions
          row={row}
          navigate={navigate}
          setFlash={setFlash}
          reload={reload}
          setConfirmPopup={setConfirmPopup}
        />
      ),
    },
  ], [navigate, setFlash, setConfirmPopup, reload]);
}