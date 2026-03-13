// OwnerFrome.tsx
import { Button, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import LoadingDisplayLast from "../../../../shared/components/loading/LoadingDisplayLast";
import { useOwnerFromFetch } from "../../hook/useFetchOwner";
import DetailOwner from "./DetailOwner";
import UserOwner from "./UserOwner";
import BranchsTable from "./BranchsTable";
import { useModalHeader } from "../../../../shared/components/layouts/ModalHeaderContext";
import { handleErrorSubmit, onSubmitOwner } from "../../hook/handleFunction";
import { useAtom, useSetAtom } from "jotai";
import { OwnerState } from "../../hook/Atom";
import { IOwnerItemDefault } from "../../interface/Owner.interface";
import { confirmPopupAtom, flashAlertAtom } from "../../../../shared/components/constants/OptionsAtom";
import RegisterOwner from "./RegisterOwner";
import { FormProvider } from "react-hook-form";
export interface IOwnerFromeProps { }

const OwnerFrome: React.FunctionComponent<IOwnerFromeProps> = () => {
    const { setTitle, setActions } = useModalHeader();
    const { id } = useParams<{ id: string }>();
    const [_, setOwner] = useAtom(OwnerState);
    const setFlash = useSetAtom(flashAlertAtom);
    const [, setConfirmPopup] = useAtom(confirmPopupAtom);
    const navigate = useNavigate()
    // const {
    //     handleSubmit,
    //     setValue,
    //     watch,
    //     getValues,
    //     errors,
    //     loading,
    //     actype,
    //     setError,
    //     clearErrors
    // } = useOwnerFromFetch(id ?? "0");

    const { methods, loading, actype } = useOwnerFromFetch(id ?? "0");
    const { handleSubmit, setValue, watch, getValues, setError, clearErrors, setFocus, formState: { errors }, control } = methods;



    const headerButtons = useMemo(() => {
        if (actype === 'create') {
            return [
                <Button
                    key="submit"
                    type="submit"
                    form="owner-form"
                    variant="contained"
                    color="secondary"
                >
                    <Typography variant="button">{"บันทึก"}</Typography>
                </Button>,
                <Button
                    key="cancel"
                    variant="contained"
                    color="warning"
                    onClick={() => { navigate(-1); setOwner(IOwnerItemDefault); }}
                >
                    <Typography variant="button">{"ยกเลิก"}</Typography>
                </Button>,
            ];
        }

        if (actype === 'edit') {
            return [
                <Button
                    key="delete"
                    variant="contained"
                    color="error"
                    onClick={() =>
                        console.log('ddd')
                    }
                >
                    <Typography variant="button">{"ลบ"}</Typography>
                </Button>,
                <Button
                    key="submit"
                    type="submit"
                    form="owner-form"
                    variant="contained"
                    color="secondary"
                >
                    <Typography variant="button">{"บันทึกการแก้ไข"}</Typography>
                </Button>,
                <Button
                    key="cancel"
                    variant="contained"
                    color="warning"
                    onClick={() => { navigate(-1); setOwner(IOwnerItemDefault); }}
                >
                    <Typography variant="button">{"ยกเลิก"}</Typography>
                </Button>,
            ];
        }

        return [];
    }, [actype, navigate]);

    useEffect(() => {
        setActions(headerButtons);
    }, [setTitle, setActions, headerButtons]);

    if (loading) {
        return (
            <>
                <LoadingDisplayLast loading={loading} />
            </>
        );
    }


    return (
        <>
            <FormProvider {...methods}>
                <form
                    autoComplete="off"
                    id="owner-form"
                    onSubmit={handleSubmit(
                        () => onSubmitOwner({ getValues, navigate, id, setOwner, setFlash, setConfirmPopup }),
                        (errs) => handleErrorSubmit(errs, setFocus)
                    )}
                >
                    <Stack spacing={1}>
                        <DetailOwner
                            getValues={getValues}
                            setValue={setValue}
                            watch={watch}
                            errors={errors}
                            actype={actype}
                            control={control}
                        />

                        <RegisterOwner
                            getValues={getValues}
                            setValue={setValue}
                            watch={watch}
                            errors={errors}
                            actype={actype}
                        />

                        <Divider
                            sx={{
                                backgroundColor: 'var(--Schemes-Outline-Variant, #C0C8CB)',
                                height: '4px', // ความหนา
                            }}
                        />
                        <UserOwner
                            getValues={getValues}
                            setValue={setValue}
                            watch={watch}
                            errors={errors}
                            actype={actype}
                            setError={setError}
                            clearErrors={clearErrors}
                        />

                        <Divider
                            sx={{
                                backgroundColor: 'var(--Schemes-Outline-Variant, #C0C8CB)',
                                height: '4px', // ความหนา
                            }}
                        />
                        <BranchsTable
                            getValues={getValues}
                            setValue={setValue}
                            watch={watch}
                            errors={errors}
                            actype={actype}
                        />
                    </Stack>
                </form>
            </FormProvider>
        </>
    );
};

export default OwnerFrome;