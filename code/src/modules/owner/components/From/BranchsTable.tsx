import React from 'react';
import { useNavigate } from 'react-router';
import { BranchColumns } from '../Table/TableBranchs';
import type { FieldErrors, UseFormGetValues, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { IOwnerItem } from '../../interface/Owner.interface';
import { Button, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import type { IBranchItem } from "../../../branch/interface/Branch.interface";
import { handleAddBranch } from '../../hook/handleFunction';
import { useAtom } from 'jotai';
import { OwnerState } from '../../hook/Atom';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export interface IBranchsTableProps {
    actype: string;
    getValues: UseFormGetValues<IOwnerItem>
    setValue: UseFormSetValue<IOwnerItem>;
    errors: FieldErrors<IOwnerItem>;
    watch: UseFormWatch<IOwnerItem>;
};

const BranchsTable: React.FunctionComponent<IBranchsTableProps> = ({
    actype,
    getValues,
    errors
}) => {
    const [owner, setOwner] = useAtom(OwnerState);
    const navigate = useNavigate();
    const columns = React.useMemo(
        () =>
            BranchColumns({
                navigate,      // you can pass the function directly
                actype,
                getValues,
            }),
        [navigate, actype, getValues] // ✅ proper deps
    );


    return (
        <>
            <Grid container spacing={2} p={4}>
                <Grid size={12}>
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography variant="subtitle2">{"ข้อมูลสาขา"}</Typography>

                        <Button
                            variant="contained"
                            color="info"
                            startIcon={<AddOutlinedIcon fontSize="small" />}
                            onClick={() => handleAddBranch(getValues, actype, navigate, setOwner)}
                        >
                            {/*  variant="subtitle1" */}
                            <Typography fontWeight={500}>{"เพิ่มสาขา"}</Typography>
                        </Button>
                    </Stack>
                </Grid>
                <Grid size={12}>
                    <Paper
                        sx={{
                            width: "100%",
                            border: errors.branches
                                ? "1px solid red" // ถ้ามี error ก็จะเปลี่ยนกรอบเป็นสีแดง
                                : "none",
                        }}
                    >
                        <TableContainer
                            sx={{
                                // maxHeight: 400,
                                maxWidth: "100%",
                            }}
                        >
                            <Table aria-label="sticky table" >
                                <TableHead>
                                    <TableRow>
                                        {columns?.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{
                                                    minWidth: column.minWidth,
                                                }}
                                            >
                                                <Typography variant='body1'>
                                                    {column.label}
                                                </Typography>

                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {getValues(`branches`)?.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={columns.length} align="center">
                                                {"ไม่พบข้อมูล"}
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        getValues("branches")?.map((row: IBranchItem, index: number) => (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={index}
                                                sx={{ cursor: 'pointer' }} // เพิ่มให้เป็น pointer
                                                onClick={() =>
                                                    navigate(`/owner-management/branch/edit/${row.id || row.temp_id}`)
                                                }
                                            >
                                                {columns?.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                    >
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
                </Grid>
            </Grid>


        </>
    )
};

export default BranchsTable;