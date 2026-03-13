import React from 'react';
import type { IDataMetric, IPackageItem } from '../../../../interface/PackageServices.interface';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import type { FieldErrors, UseFormClearErrors, UseFormGetValues, UseFormSetError, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { getPeriodLabel, upsertDataMetric, useMergedMetrics } from '../../../../hook/handleFunction';


export interface ITableBranchLimitUseProps {
    branch_data: IDataMetric[]
    getValues: UseFormGetValues<IPackageItem>
    setValue: UseFormSetValue<IPackageItem>;
    errors: FieldErrors<IPackageItem>;
    watch: UseFormWatch<IPackageItem>;
};

interface Column {
    id: string;
    label: string;
    align: 'center' | 'left' | 'right';
    minWidth: number;
    render: (row: IDataMetric, index: number) => React.ReactNode;
}

const TableBranchLimitUse: React.FunctionComponent<ITableBranchLimitUseProps> = ({
    branch_data,
    getValues,
    setValue,
    watch,
    errors
}) => {

    // 👉 ดูค่า live ของ data_metric ในฟอร์ม (เพื่อ merge และรีเฟรช UI)
    const formMetrics = watch('data_metric') ?? getValues('data_metric') ?? [];

    // 👉 รวม owner_data (default) กับค่าที่แก้ไขในฟอร์ม
    const mergedRows = useMergedMetrics(branch_data, formMetrics);

    const columns: Column[] = [
        {
            id: 'master_name',
            label: 'ชื่อ/รหัสSKU',
            minWidth: 200,
            align: 'left',
            render: (row) => (
                <Typography variant="body2">{row?.master_name || "-"}</Typography>
            )
        },
        {
            id: 'cap',
            label: 'จำนวน',
            minWidth: 200,
            align: 'center',
            render: (row) => (
                <NumericFormat
                    displayType="input"
                    value={row.cap ?? 0}
                    onValueChange={(values) => {
                        const v = values.floatValue ?? 0;
                        upsertDataMetric(row, v, watch, setValue);
                    }}
                    customInput={TextField}
                    thousandSeparator=","
                    allowNegative={false}
                    decimalScale={0}
                    variant="outlined"
                    size="small"
                    style={{ width: "50%" }}
                />
            )
        },
        {
            id: 'unit_default',
            label: 'limit_unit',
            minWidth: 100,
            align: 'right',
            render: (row) => (
                <Typography variant="body2">{row?.unit_default || "-"}</Typography>
            )
        },
        {
            id: 'periodicity',
            label: 'period',
            minWidth: 100,
            align: 'right',
            render: (row) => (
                <Typography variant="body2">{getPeriodLabel(row?.periodicity)}</Typography>
            )
        },
    ];

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', m: 'auto' }}>
            <TableContainer sx={{ maxHeight: 500 }}>
                <Table stickyHeader aria-label="owners">
                    <TableHead
                        sx={{
                            '& .MuiTableCell-root': (theme) => ({
                                bgcolor: theme.palette.background.paper,
                                position: 'sticky',
                                top: 0,
                            }),
                        }}
                    >
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    sx={{ minWidth: column.minWidth }}
                                >
                                    <Typography variant="body1">{column.label}</Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {mergedRows?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    <Typography variant="body1">{"ไม่พบข้อมูล"}</Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            mergedRows.map((row, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.master_data_metric_id}>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} align={column.align}>
                                            {column.render(row, index)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default TableBranchLimitUse;