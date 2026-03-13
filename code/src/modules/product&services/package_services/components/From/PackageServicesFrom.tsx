import React, { useEffect, useMemo } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PackagePage from "./package/Packagepage";
import LimitUsePage from "./Limit _use/LimitUsePage";
import LicensePage from "./License/Licensepage";
import { useModalHeader } from "../../../../../shared/components/layouts/ModalHeaderContext";
import LoadingDisplayLast from "../../../../../shared/components/loading/LoadingDisplayLast";
import { useSetAtom } from "jotai";
import { confirmPopupAtom, flashAlertAtom } from "../../../../../shared/components/constants/OptionsAtom";
import { useFetchEnumDataMetric } from "../../hook/useFetchPackage";
import { useMasterFunctionPackageFromFetch } from "../../hook/useFetchMasterPackage";
import { FormProvider } from "react-hook-form";

export interface IPackageServicesFromProps { }

const PackageServicesFrom: React.FC<IPackageServicesFromProps> = () => {
    const master = useMasterFunctionPackageFromFetch();
    const methods = master.methods; 
    const { setTitle, setActions } = useModalHeader();
    const setFlash = useSetAtom(flashAlertAtom);
    const setConfirmPopup = useSetAtom(confirmPopupAtom);
    const { owner_level, branch_level, loading_data_metric } = useFetchEnumDataMetric();

    const headerButtons = useMemo(() => {
        const buttons: React.ReactNode[] = [
            <Button key="submit" type="submit" form="package-form" variant="contained">
                <Typography variant="button">
                    {master.actype === "create" ? "บันทึก" : "บันทึกการแก้ไข"}
                </Typography>
            </Button>,
            <Button
                key="cancel"
                variant="contained"
                color="warning"
                onClick={() => master.navigate(-1)}
            >
                <Typography variant="button">{"ยกเลิก"}</Typography>
            </Button>,
        ];

        if (master.actype === "edit") {
            buttons.push(
                <Button
                    key="delete"
                    variant="contained"
                    color="error"
                    onClick={() =>
                        master.onClickDeletePackage({
                            id: master.package_id,
                            getValues: master.getValues,
                            navigate: master.navigate,
                            setFlash,
                            setConfirmPopup,
                        })
                    }
                >
                    <Typography variant="button">{"ลบแพ็คเกจ"}</Typography>
                </Button>
            );
        }

        return buttons;
    }, [master.actype, master.navigate]);

    // ใส่ปุ่มบน header
    useEffect(() => {
        setActions(headerButtons);
    }, [setTitle, setActions, headerButtons]);

    if (master.loading || loading_data_metric) {
        return <LoadingDisplayLast loading />;
    }

    return (
        <FormProvider {...methods}>
            <form
                id="package-form"
                onSubmit={master.handleSubmit(
                    () =>
                        master.onSubmitPackage({
                            getValues: master.getValues,
                            navigate: master.navigate,
                            package_id: master.package_id,
                            setFlash,
                            setConfirmPopup,
                        }),
                    (errs) => master.handleErrorSubmit(errs, methods.setFocus)
                )}
            >
                <Grid container alignItems="center" p={2}>
                    <Grid size={12}>
                        <TabContext value={master.valueTab}>
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <TabList onChange={master.handleChangeTab} aria-label="package tabs">
                                    <Tab label={<Typography>{"ข้อมูลแพ็คเกจ"}</Typography>} value="1" />
                                    <Tab label={<Typography>{"จำกัดการใช้งาน"}</Typography>} value="2" />
                                    <Tab label={<Typography>{"สิทธิ์การใช้งาน"}</Typography>} value="3" />
                                </TabList>
                            </Box>

                            <TabPanel value="1">
                                <PackagePage
                                    getValues={master.getValues}
                                    setValue={master.setValue}
                                    watch={master.watch}
                                    errors={master.errors}
                                    actype={master.actype}
                                    setError={master.setError}
                                    clearErrors={master.clearErrors}
                                />
                            </TabPanel>

                            <TabPanel value="2">
                                <LimitUsePage
                                    getValues={master.getValues}
                                    setValue={master.setValue}
                                    watch={master.watch}
                                    errors={master.errors}
                                    actype={master.actype}
                                    setError={master.setError}
                                    clearErrors={master.clearErrors}
                                    owner_level={owner_level}
                                    branch_level={branch_level}
                                />
                            </TabPanel>

                            <TabPanel value="3">
                                <LicensePage
                                    getValues={master.getValues}
                                    setValue={master.setValue}
                                    watch={master.watch}
                                    errors={master.errors}
                                    actype={master.actype}
                                    setError={master.setError}
                                    clearErrors={master.clearErrors}
                                />
                            </TabPanel>
                        </TabContext>
                    </Grid>
                </Grid>
            </form>
        </FormProvider>
    );
};

export default PackageServicesFrom;