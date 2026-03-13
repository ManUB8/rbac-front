import { Grid, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import { stylesByStatus, type StatusKey } from '../../constants/package_option';
import PackageTable from './PackageTable';
import type { IuseMasterFunctionPackage } from '../../hook/useFetchMasterPackage';

export interface ITablePackageProps {
     masterController: IuseMasterFunctionPackage
};

const TablePackage: React.FunctionComponent<ITablePackageProps> = ({
    masterController
}) => {
    return (
        <>
          <Grid container marginTop={2} sx={{ mt: 2 }} spacing={1}>
                <>
                    <Tabs
                        value={masterController.valueTab}
                        onChange={(_, v: StatusKey) => {
                            masterController.setValueTab(v);
                            masterController.setSearchStatePackage((prev) => ({
                                ...prev,
                                search:'',
                                page: '1',
                                limit: '20',
                                package_type_code: String(v) || "0",
                            }));
                        }}
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        {masterController.status_data.map((e) => {
                            const code = e.code as StatusKey;
                            const sty = stylesByStatus[code];
                            return (
                                <Tab
                                    key={code}
                                    value={code}
                                    label={
                                        <Grid container gap={1.5} alignItems="center" wrap="nowrap">
                                            <Typography fontSize={14}>{e.labal ?? e.labal}</Typography>
                                            <Grid
                                                sx={(theme) => ({
                                                    px: 1, py: 0.5, borderRadius: '20px',
                                                    backgroundColor: typeof sty.bg === 'function' ? sty.bg(theme) : sty.bg,
                                                    color: typeof sty.color === 'function' ? sty.color(theme) : sty.color,
                                                    border: typeof sty.border === 'function' ? sty.border(theme) : sty.border,
                                                })}
                                            >
                                                <Typography fontWeight={500} fontSize={14} sx={{ lineHeight: 1 }}>
                                                    {e.qty}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    }
                                />
                            );
                        })}
                    </Tabs>
                </>
                <>
                    <PackageTable
                        packagedata={masterController.packagedata}
                        loading_package={masterController.loading_package}
                        setConfirmPopup={masterController.setConfirmPopup}
                        reload={masterController.reload}
                        total_package={masterController.selectedQty}
                    />
                </>
            </Grid>
        </>
    )
};

export default TablePackage;