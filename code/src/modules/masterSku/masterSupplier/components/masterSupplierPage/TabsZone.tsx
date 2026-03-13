import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import type { ITabSelect } from '../../interface/MasterSupplier.interface';

export interface ITabsProps {
    tabList: {
        value: number;
        label: string;
    }[];
    tabSelect: ITabSelect;
    handleChangeTab: (value: number) => void;
}

const TabsZone: React.FunctionComponent<ITabsProps> = (props) => {
    return (
        <Box>
            <Tabs value={props.tabSelect.value} onChange={(_, v) => props.handleChangeTab(v)}>
                {props.tabList.map((t) => (
                    <Tab key={t.value} label={t.label} value={t.value} />
                ))}
            </Tabs>
        </Box>
    );
};

export default TabsZone;
