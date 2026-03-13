import React from 'react';
import {  Grid, IconButton, Stack, Tab, Tabs, Tooltip, Typography, useTheme } from '@mui/material';
import type { IuseMasterFunctionOwner } from '../../hook/useFetchOwner';
import { labelByCode, OWNER_TYPE_LABELS, stylesByStatus, type StatusKey } from '../../constants/OptionsFilter';
import OwnerTable from './OwnerTable';

export interface ITabsOwnerProps {
    masterController:IuseMasterFunctionOwner
};

const TabsOwner: React.FunctionComponent<ITabsOwnerProps> = ({
    masterController
}) => {
    return (
        <>
         <Grid container marginTop={2}>
                <>
                    <Tabs
                        value={masterController.valueTab}
                        onChange={(_, v: StatusKey) => {
                            masterController.setValueTab(v);
                            masterController.setSearchStateOwner((prev) => ({
                                ...prev,
                                page: 1,
                                limit: 20,
                                count_active_type: String(v) || "0",
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
                                            <Typography fontSize={14}>
                                                {labelByCode(
                                                    OWNER_TYPE_LABELS,
                                                    e.code || e.labal
                                                )}
                                            </Typography>
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
                    <OwnerTable
                        owner={masterController.owner}
                        loading_owner={masterController.loading_owner}
                        setConfirmPopup={masterController.setConfirmPopup}
                        reload={masterController.reload}
                        total_owner={masterController.total_owner}
                    />
                </>
            </Grid>
        </>
    )
};

export default TabsOwner;