import React from 'react';
import { useFetchEnumDataMetric } from '../../../hook/useFetchPackage';
import type { FieldErrors, UseFormClearErrors, UseFormGetValues, UseFormSetError, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { IDataMetric, IPackageItem } from '../../../interface/PackageServices.interface';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TableOwnerLimitUse from './Table/TableOwnerLimitUse';
import TableBranchLimitUse from './Table/TableBranchLimitUse';

export interface ILimitUsePageProps {
    getValues: UseFormGetValues<IPackageItem>
    setValue: UseFormSetValue<IPackageItem>;
    errors: FieldErrors<IPackageItem>;
    watch: UseFormWatch<IPackageItem>;
    setError: UseFormSetError<IPackageItem>
    clearErrors: UseFormClearErrors<IPackageItem>
    actype: string;
    owner_level: IDataMetric[]
    branch_level: IDataMetric[]
};

const LimitUsePage: React.FunctionComponent<ILimitUsePageProps> = ({
    getValues,
    watch,
    setValue,
    errors,
    actype,
    setError,
    clearErrors,
    owner_level,
    branch_level
}) => {
    

    return (
        <>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                    <Typography fontSize={18} fontWeight={500} component="span">{"จำนวนข้อมูลรวม (limit_data) (owner)"}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TableOwnerLimitUse
                        owner_data={owner_level}
                        getValues={getValues}
                        setValue={setValue}
                        errors={errors}
                        watch={watch}
                    />
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                    <Typography fontSize={18} fontWeight={500} component="span">{'จำนวนข้อมูลตามสาขา (limit_data) (branch)'}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TableBranchLimitUse
                        branch_data={branch_level}
                        getValues={getValues}
                        setValue={setValue}
                        errors={errors}
                        watch={watch}
                    />
                </AccordionDetails>
            </Accordion>

        </>
    )
};

export default LimitUsePage;