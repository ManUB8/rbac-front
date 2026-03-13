// components/Table/TableOwner.tsx
import React from "react";
import { Box, Button, Stack, Typography, Table, TableHead, TableCell, TableRow, TableBody, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import { useAtom, type SetStateAction } from "jotai";
import { searchStateOwner } from "../../hook/Atom";
import type { IOwnerItem } from "../../interface/Owner.interface";
import type { IBranchItem } from "../../../branch/interface/Branch.interface";
import { onClickDeleteOwner } from "../../hook/handleFunction";
import type { ITextPopup } from "../../../../shared/components/popup/PopupConfirm.interface";
import type { ITextAlert } from "../../../../shared/components/message/Alert.interface";
import type { NavigateFunction } from "react-router";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { NumericFormat } from "react-number-format";
import { UNIT_MAP } from "../../constants/OptionsFilter";
// ===== Generic Column =====
export interface Column<T> {
  id: string;
  label: string;
  headerRender?: () => React.ReactNode;
  align: "center" | "left" | "right";
  minWidth: number;
  sortable?: boolean;
  render: (row: T) => React.ReactNode;
}

// ===== Sort hook (อัปเดต jotai: searchState.sort) =====
export function useOwnerSort() {
  const [, setSearchState] = useAtom(searchStateOwner);
  const [orderBy, setOrderBy] = React.useState<keyof IOwnerItem | null>(null);
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");

  const refetchOwners = React.useCallback((_sort: string) => {
    // ownerApi.list({ sort: _sort, ...query })
  }, []);

  const handleSort = React.useCallback((id: keyof IOwnerItem) => {
    const nextOrder = orderBy === id ? (order === "asc" ? "desc" : "asc") : "asc";
    setOrderBy(id);
    setOrder(nextOrder);
    const sortString = `${id} ${nextOrder}`; // "owner_name desc"
    setSearchState(prev => ({ ...prev, sort: sortString }));
    refetchOwners(sortString);
  }, [orderBy, order, refetchOwners, setSearchState]);

  return { orderBy, order, handleSort };
}

// ===== Badge สถานะ =====
export function activeAvatar(status: number) {
  let bgcolor = "#8C8C8C";
  let letter = "";
  let textColor = "#000";

  switch (status) {
    case 0: bgcolor = "errorTones.98"; textColor = "errorTones.40"; letter = "ปิดใช้งาน"; break;
    case 1: bgcolor = "successVariant80"; textColor = 'successVariant0'; letter = "เปิดใช้งาน"; break;
    case 2: bgcolor = "errorTones.98"; textColor = "errorTones.40"; letter = "ปิดใช้งาน"; break;
    case 3: bgcolor = 'onSurface'; textColor = "onPrimary"; letter = "ระงับการใช้"; break;
  }

  return (
    <Box sx={{ backgroundColor: bgcolor, borderRadius: "4px", px: 2, py: 0.5 }}>
      <Typography sx={{ color: textColor }}>{letter}</Typography>
    </Box>
  );
}

// ===== helper: เมนูต่อแถว =====
function RowActions({
  row,
  navigate,
  setFlash,
  reload,
  setConfirmPopup,
  EditIconSrc,
  DeleteIconSrc,
}: {
  row: IOwnerItem;
  navigate: NavigateFunction;
  setFlash: (f: ITextAlert | null) => void;
  reload: () => void;
  setConfirmPopup: (u: SetStateAction<ITextPopup | null>) => void;
  EditIconSrc: string;
  DeleteIconSrc: string;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton size="small" onClick={handleOpen} aria-haspopup="true" aria-controls={`row-menu-${row.id}`}>
        <MoreHorizIcon sx={{ color: "secondary.100" }} />
      </IconButton>

      <Menu
        id={`row-menu-${row.id}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate(`/owner-management/view/edit/${row.id}`);
          }}
        >
          <ListItemIcon>
            <Box component="img" src={EditIconSrc} sx={{ width: 18, height: 18 }} />
          </ListItemIcon>
          <ListItemText primary="แก้ไข" />
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            onClickDeleteOwner({
              navigate,
              setFlash,
              id: row.id,
              reload,
              setConfirmPopup,
            });
          }}
        >
          <ListItemIcon>
            <Box component="img" src={DeleteIconSrc} sx={{ width: 18, height: 18 }} />
          </ListItemIcon>
          <ListItemText primary="ลบ" />
        </MenuItem>
      </Menu>
    </>
  );
}

// ===== Columns ของแถวหลัก (Owner) — ใช้ factory เพื่อรับ deps จากแม่ =====
export function createOwnerColumns(deps: {
  openRows: Record<string, boolean>;
  setOpenRows: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  navigate: NavigateFunction;
  EditIconSrc: string;
  DeleteIconSrc: string;
  setFlash: (f: ITextAlert | null) => void;
  reload: () => void;
  setConfirmPopup: (update: SetStateAction<ITextPopup | null>) => void

}): Column<IOwnerItem>[] {
  const {
    openRows,
    setOpenRows,
    EditIconSrc,
    DeleteIconSrc,
    navigate,
    setFlash,
    reload,
    setConfirmPopup
  } = deps;

  return [
    {
      id: "owner_name",
      label: "ชื่อร้านค้า",
      minWidth: 200,
      align: "center",
      sortable: true,
      render: (row) => (
        <Stack direction="row" alignItems="center">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              aria-label="expand row"
              size="small"
              sx={{ boxShadow: 'none' }}
              onClick={() => setOpenRows(prev => ({ ...prev, [row.id]: !prev[row.id] }))}
            >
              {openRows[row.id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1, overflow: "hidden", ml: 1 }}>
            <Typography variant="body2" sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {row?.owner_name || "-"}
            </Typography>
          </Box>
        </Stack>
      ),
    },
    {
      id: "id",
      label: "Owner ID",
      minWidth: 180,
      align: "center",
      sortable: true,
      render: (row) => (
        <Typography variant="body2">{row?.id || "-"}</Typography>
      ),
    },
    // {
    //   id: "lead_id",
    //   label: "LEAD ID",
    //   minWidth: 180,
    //   align: "center",
    //   sortable: true,
    //   render: (row) => (
    //     <Typography variant="body2">{row?.lead_id || "-"}</Typography>
    //   ),
    // },
    {
      id: "customer_id",
      label: "Customer ID",
      minWidth: 180,
      align: "center",
      sortable: true,
      render: (row) => (
        <Typography variant="body2">{row?.customer_id || "-"}</Typography>
      ),
    },
    {
      id: "owner_type_names",
      label: "ประเภทร้านค้า",
      minWidth: 500,
      align: "left",
      sortable: true,
      render: (row) => (
        <Typography variant="body2">
          {Array.isArray(row?.owner_type_names) ? row.owner_type_names.join(", ") : row?.owner_type_names || "-"}
        </Typography>
      ),
    },
    {
      id: "user_type",
      label: "ประเภทบัญชี",
      minWidth: 150,
      align: "left",
      sortable: true,
      render: (row) => (
        <Typography variant="body2">{row?.user_type || "-"}</Typography>
      ),
    },
    // {
    //   id: "phone",
    //   label: "เบอร์โทร",
    //   minWidth: 80,
    //   align: "center",
    //   render: (row) => (
    //     <Typography variant="body2">{row?.phone || "-"}</Typography>
    //   ),
    // },
    {
      id: "email",
      label: "อีเมล",
      minWidth: 120,
      align: "left",
      render: (row) => (
        <Typography variant="body2">{row?.email || "-"}</Typography>
      ),
    },
    {
      id: "active_type",
      label: "สถานะบัญชี",
      minWidth: 150,
      align: "center",
      sortable: true,
      render: (row) => (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          {activeAvatar(row.active_type)}
        </Box>
      ),
    },
    // {
    //   id: "management",
    //   label: "",
    //   headerRender: () => <AddBoxOutlinedIcon />,
    //   minWidth: 100,
    //   align: "center",
    //   render: (row) => (
    //     <Stack direction="row" spacing={1}>
    //       <Button
    //         variant="contained"
    //         sx={{ bgcolor: "#FAFAFA" }}
    //         onClick={() => {
    //           navigate(`/owner-management/view/edit/${row.id}`);
    //           console.log("edit", row.id);
    //           console.log(`/owner-management/view/edit/${row.id}`)
    //         }}
    //       >
    //         <img src={EditIconSrc} />
    //       </Button>
    //       <Button variant="contained" sx={{ bgcolor: "#FAFAFA" }}
    //         onClick={() => onClickDeleteOwner({
    //           navigate,
    //           setFlash,
    //           id: row.id,
    //           reload,
    //           setConfirmPopup
    //         })}>
    //         <img src={DeleteIconSrc} />
    //       </Button>
    //     </Stack>
    //   ),
    // },
    {
      id: "management",
      label: "",
      headerRender: () => <AddBoxOutlinedIcon />,   // ไอคอนหัวตาราง
      minWidth: 64,
      align: "center",
      render: (row) => (
        <RowActions
          row={row}
          navigate={navigate}
          setFlash={setFlash}
          reload={reload}
          setConfirmPopup={setConfirmPopup}
          EditIconSrc={EditIconSrc}
          DeleteIconSrc={DeleteIconSrc}
        />
      ),
    }
  ];
}

// ===== Columns ของสาขา (branch) =====
export const rowDetailsColumns: Column<IBranchItem>[] = [

  {
    id: "branch",
    label: "สาขา",
    minWidth: 200,
    align: "left",
    render: (branch) => (
      <Stack direction="row" alignItems="center">
        {/* ไอคอนบ้าน จะแสดงเฉพาะสาขาหลัก */}
        {branch.is_branch_main && (
          <HomeWorkOutlinedIcon sx={{ marginRight: 1, color: "#5DC0EA" }} />
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            overflow: "hidden",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {branch?.branch_name || "-"}
          </Typography>
        </Box>
      </Stack>
    )
  },
  {
    id: "merchant_id",
    label: "MID",
    minWidth: 180,
    align: "left",
    render: (branch) => <Typography variant="body2" >{branch.merchant_id || "-"}</Typography>,
  },
  {
    id: "main_package",
    label: "แพ็คเกจหลัก",
    minWidth: 200,
    align: "left",
    render: (branch) => <Typography variant="body2" >{branch.package_main_name || "-"}</Typography>,
  },
  {
    id: "add_on_package",
    label: "แพ็คเกจเสริม",
    minWidth: 200,
    align: "left",
    render: (branch) =>
      <Typography variant="body2">
        {`${branch.addon_count} แพ็คเกจ` || "-"}
      </Typography>
  },
  {
    id: "package_type",
    label: "ค่าบริการ",
    minWidth: 150,
    align: "left",
    render: (branch) => (
      <Typography variant="body2">
        <NumericFormat
          displayType="text"
          value={branch.total_price ?? 0}
          thousandSeparator=","
          allowNegative={false}
        />
        {UNIT_MAP[branch.unit_price ?? ''] ?? ''}
      </Typography>
    ),
  },
  {
    id: "start_date",
    label: "วันที่เริ่ม",
    minWidth: 130,
    align: "left",
    render: (branch) => <Typography variant="body2" >{branch.start_at || "-"}</Typography>,
  },
  {
    id: "end_date",
    label: "วันที่สิ้นสุด",
    minWidth: 130,
    align: "left",
    render: (branch) => <Typography variant="body2" >{branch.end_at || "-"}</Typography>,
  },
  {
    id: "time",
    label: "เวลาคงเหลือ",
    minWidth: 180,
    align: "left",
    render: () => <Typography variant="body2" >{'-'}{/* calculateRemainingTime(...) */}</Typography>,
  },
  {
    id: "payment",
    label: "สถานะชำระเงิน",
    minWidth: 150,
    align: "left",
    render: (branch) => <Typography variant="body2" >{branch.payment_status || "-"}</Typography>,
  },
  {
    id: "status",
    label: "สถานะ",
    minWidth: 80,
    align: "center",
    render: (branch) => (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {activeAvatar(branch.active_type)}
      </Box>
    ),
  },
];

// ===== รายละเอียดสาขาเป็นคอมโพเนนต์ =====
export function BranchDetails({ branches }: { branches: IBranchItem[]; }) {
  return (
    <Box sx={{ m: 1 }}>
      <Table size="small" aria-label="branches">
        <TableHead>
          <TableRow sx={{ bgcolor: 'surfaceContainerLowest' }}>
            {rowDetailsColumns.map((c) => (
              <TableCell key={c.id} align={c.align} style={{ minWidth: c.minWidth }}>
                <Typography variant="body1">{c.label}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {branches.map((b) => (
            <TableRow key={b.id}>
              {rowDetailsColumns.map((c) => (
                <TableCell key={c.id} align={c.align}>
                  {c.render(b)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}