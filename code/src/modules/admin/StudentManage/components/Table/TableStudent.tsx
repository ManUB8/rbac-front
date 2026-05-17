import React from "react";
import {IconButton, Stack, Typography } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import type { IStudentItem } from "../../interface/StudentMange.interface";
export interface ITableStudentProps {};
const TableStudent: React.FunctionComponent<ITableStudentProps> = props => {
  return (<>
  
  
  </>);
};
export default TableStudent;
export interface Column<T> {
  id: string;
  label: string;
  headerRender?: () => React.ReactNode;
  align: "center" | "left" | "right";
  minWidth: number;
  render: (row: T, index: number) => React.ReactNode;
}

function RowActions({
  row,
  onEdit,
  onClickDeleteMaster,
}: {
  row: IStudentItem;
  onEdit: (id: number) => void;
  onClickDeleteMaster: (id: number) => void;
}) {
  return (
    <Stack direction="row" spacing={1} justifyContent="center">
      <IconButton
        onClick={() => onEdit(row.student_id)}
        sx={{
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
        }}
      >
        <EditOutlinedIcon fontSize="small" />
      </IconButton>

      <IconButton
        onClick={() => onClickDeleteMaster(row.student_id)}
        sx={{
          borderRadius: "12px",
          backgroundColor: "#e11d48",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#be123c",
          },
        }}
      >
        <DeleteOutlineOutlinedIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}


export function useMasterStudentColumns(deps: {
  reload: () => void;
  onEdit: (id: number) => void;
  onClickDeleteMaster: (id: number) => void;
}): Column<IStudentItem>[] {
  const { onEdit, onClickDeleteMaster } = deps;

  return React.useMemo<Column<IStudentItem>[]>(
    () => [
      {
        id: "no",
        label: "ลำดับ",
        minWidth: 100,
        align: "left",
        render: (_, index) => (
          <Typography variant="subtitle2">{index + 1}</Typography>
        ),
      },
      {
        id: "student_code",
        label: "รหัสนิสิต",
        minWidth: 150,
        align: "left",
        render: (row) => (
          <Typography variant="subtitle2">{row?.student_code || "-"}</Typography>
        ),
      },
      {
        id: "prefix",
        label: "คำนำหน้า",
        minWidth: 120,
        align: "left",
        render: (row) => (
          <Typography variant="subtitle2">{row?.prefix || "-"}</Typography>
        ),
      },
      {
        id: "first_name",
        label: "ชื่อ",
        minWidth: 120,
        align: "left",
        render: (row) => (
          <Typography variant="subtitle2">{row?.first_name || "-"}</Typography>
        ),
      },
      {
        id: "last_name",
        label: "นามสกุล",
        minWidth: 120,
        align: "left",
        render: (row) => (
          <Typography variant="subtitle2">{row?.last_name || "-"}</Typography>
        ),
      },
      {
        id: "gender",
        label: "เพศ",
        minWidth: 100,
        align: "left",
        render: (row) => (
          <Typography variant="subtitle2">{row?.gender || "-"}</Typography>
        ),
      },
      {
        id: "management",
        label: "จัดการ",
        headerRender: () => <AddBoxOutlinedIcon />,
        minWidth: 120,
        align: "center",
        render: (row) => (
          <RowActions row={row} onEdit={onEdit} onClickDeleteMaster={onClickDeleteMaster} />
        ),
      },
    ],
    [onEdit, onClickDeleteMaster]
  );
}