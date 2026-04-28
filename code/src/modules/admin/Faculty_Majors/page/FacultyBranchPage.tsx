import React, {  } from "react";
import { useFaculty_MajorsFetch, useFacultyFormFetch } from "../hook/useFetchFaculty_Majors";
import Header_Faculty_Majors from "../components/page/Header_Faculty_Majors";
import Info_Faculty_Majors from "../components/page/Info_Faculty_Majors";
import { FormProvider } from "react-hook-form";
import CreateFaculty from "../components/form/CreateFaculty";
import EditFaculty from "../components/form/EditFaculty";
import CreateMajor from "../components/form/CreateMajor";
import EditMajor from "../components/form/EditMajor";
import { Backdrop, CircularProgress } from "@mui/material";

export interface IFacultyBranchPageProps { }

const FacultyBranchPage: React.FunctionComponent<
  IFacultyBranchPageProps
> = () => {
  const Master_Faculty_Majors = useFaculty_MajorsFetch();

  const Master_Controller = useFacultyFormFetch({
    id:
      Master_Faculty_Majors.formType === "major"
        ? Master_Faculty_Majors.majorId
        : Master_Faculty_Majors.facultyId,

    facultyId: Master_Faculty_Majors.facultyId,
    majorId: Master_Faculty_Majors.majorId,

    formMode: Master_Faculty_Majors.formMode,
    formType: Master_Faculty_Majors.formType,

    openModal: Master_Faculty_Majors.openModal,
    setOpenModal: Master_Faculty_Majors.setOpenModal,
    reload: Master_Faculty_Majors.reload,
  });

  const methods = Master_Controller.methods;
  return (
    <>
      <FormProvider {...methods}>
        <form
          autoComplete="off"
          id="faculty-form"
          onSubmit={Master_Controller.handleSubmit(
            Master_Controller.onSubmitMaster,
            (errs) => Master_Controller.handleErrorSubmit(errs, methods.setFocus)
          )}
        >
          <Backdrop
            open={
              Master_Faculty_Majors.Faculty_MajorsItemLoading ||
              Master_Faculty_Majors.Faculty_MajorsItemFetching
            }
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 9999,
            }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Header_Faculty_Majors
            Master_Faculty_Majors={Master_Faculty_Majors}
          />
          <Info_Faculty_Majors Master_Faculty_Majors={
            Master_Faculty_Majors}
            Master_Controller={Master_Controller}
            />
          <CreateFaculty
            open={
              Master_Faculty_Majors.openModal &&
              Master_Faculty_Majors.formType === "faculty" &&
              Master_Faculty_Majors.formMode === "create"
            }
            onClose={Master_Faculty_Majors.handleCloseModal}
            Master_Controller={Master_Controller}
          />

          <EditFaculty
            open={
              Master_Faculty_Majors.openModal &&
              Master_Faculty_Majors.formType === "faculty" &&
              Master_Faculty_Majors.formMode === "edit"
            }
            onClose={Master_Faculty_Majors.handleCloseModal}
            Master_Controller={Master_Controller}
          />
          <CreateMajor
            open={
              Master_Faculty_Majors.openModal &&
              Master_Faculty_Majors.formType === "major" &&
              Master_Faculty_Majors.formMode === "create"
            }
            onClose={Master_Faculty_Majors.handleCloseModal}
            Master_Controller={Master_Controller}
          />

          <EditMajor
            open={
              Master_Faculty_Majors.openModal &&
              Master_Faculty_Majors.formType === "major" &&
              Master_Faculty_Majors.formMode === "edit"
            }
            onClose={Master_Faculty_Majors.handleCloseModal}
            Master_Controller={Master_Controller}
          />
        </form>
      </FormProvider>

    </>
  );
};

export default FacultyBranchPage;