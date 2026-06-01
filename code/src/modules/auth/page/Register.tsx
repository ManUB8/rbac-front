import React, { useEffect, useState } from "react";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import {
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Controller, useForm, type Resolver } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useFetchFaculty } from "../hook/useFaculty";
import { NumericFormat } from "react-number-format";
import type { IStudentItem } from "../interface/Login.interface";
import { CreateStudent } from "../service/LoginApi";
import Swal from "sweetalert2";
import { AppRoutes } from "../../../router/router";
import type {
  IFacultyItem,
  IMajorItem,
} from "../../admin/Faculty_Majors/interface/Faculty_Majors.Interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterZod } from "../utils/RegisterValidation";

interface IYearType {
  label: string;
  id: string;
}

export const Year_type: IYearType[] = [
  { label: "ปี 1", id: "ปี 1" },
  { label: "ปี 2", id: "ปี 2" },
  { label: "ปี 3", id: "ปี 3" },
  { label: "ปี 4", id: "ปี 4" },
];

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { faculty, loading_faculty } = useFetchFaculty();

  const [selectedFaculty, setSelectedFaculty] =
    useState<IFacultyItem | null>(null);

  const [selectedMajor, setSelectedMajor] = useState<IMajorItem | null>(null);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    control,
  } = useForm<IStudentItem>({
    resolver: zodResolver(RegisterZod as any) as Resolver<IStudentItem>,
    defaultValues: {
      student_code: "",
      prefix: "",
      first_name: "",
      last_name: "",
      gender: "",
      faculty_id: 0,
      faculty_name: "",
      major_id: 0,
      major_name: "",
      year_status: "",
      user: {
        username: "",
        password: "",
        confirm_password: "",
      },
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (body: IStudentItem) => {
    try {
      setLoading(true);
      setSuccessMessage("");
      setErrorMessage("");
      console.log('body', body)
      const res = await CreateStudent(body);
      console.log("CreateStudent", res);

      reset();
      setSelectedFaculty(null);
      setSelectedMajor(null);

      await Swal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: "สมัครข้อมูลสำเร็จ",
        timer: 1200,
        showConfirmButton: false,
      });

      navigate(AppRoutes.login);
    } catch (error: any) {
      setErrorMessage(
        error?.response?.data?.detail || "สมัครข้อมูลไม่สำเร็จ กรุณาลองใหม่"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Value set", getValues());
  }, [watch(), getValues]);


  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                textAlign: "center",
                mb: 1,
              }}
            >
              สมัครข้อมูล
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                textAlign: "center",
                mb: 3,
              }}
            >
              {"กรอกข้อมูลเพื่อสร้างบัญชีผู้ใช้งาน"}
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2.2,
                }}
              >
                {successMessage && (
                  <Alert severity="success">{successMessage}</Alert>
                )}

                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

                <NumericFormat
                  label="รหัสนิสิต"
                  customInput={TextField}
                  fullWidth
                  allowNegative={false}
                  decimalScale={0}
                  value={watch("student_code") ?? ""}
                  onValueChange={(values) => {
                    setValue("student_code", values.value, {
                      shouldValidate: true,
                    });
                    setValue("user.username", values.value)
                  }}
                  error={!!errors?.student_code}
                  helperText={errors?.student_code?.message || ""}
                  slotProps={{
                    htmlInput: {
                      maxLength: 8,
                    },
                  }}
                  isAllowed={(values) => values.value.length <= 8}
                />

                <FormControl error={!!errors.prefix}>
                  <FormLabel>คำนำหน้า</FormLabel>

                  <Controller
                    name="prefix"
                    control={control}
                    rules={{ required: "กรุณาเลือกคำนำหน้า" }}
                    render={({ field }) => (
                      <RadioGroup
                        row
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      >
                        <FormControlLabel
                          value="นาย"
                          control={<Radio />}
                          label="นาย"
                        />
                        <FormControlLabel
                          value="นางสาว"
                          control={<Radio />}
                          label="นางสาว"
                        />
                      </RadioGroup>
                    )}
                  />

                  {errors.prefix && (
                    <Typography
                      sx={{
                        color: "error.main",
                        fontSize: 12,
                      }}
                    >
                      {errors.prefix.message}
                    </Typography>
                  )}
                </FormControl>

                <TextField
                  label="ชื่อจริง"
                  fullWidth
                  {...register("first_name", {
                    required: "กรุณากรอกชื่อ",
                  })}
                  error={!!errors.first_name}
                  helperText={errors.first_name?.message}
                />

                <TextField
                  label="นามสกุล"
                  fullWidth
                  {...register("last_name", {
                    required: "กรุณากรอกนามสกุล",
                  })}
                  error={!!errors.last_name}
                  helperText={errors.last_name?.message}
                />

                <FormControl error={!!errors.gender}>
                  <FormLabel>เพศ</FormLabel>

                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: "กรุณาเลือกเพศ" }}
                    render={({ field }) => (
                      <RadioGroup
                        row
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      >
                        <FormControlLabel
                          value="ชาย"
                          control={<Radio />}
                          label="ชาย"
                        />
                        <FormControlLabel
                          value="หญิง"
                          control={<Radio />}
                          label="หญิง"
                        />
                        <FormControlLabel
                          value="LGBTQ+"
                          control={<Radio />}
                          label="LGBTQ+"
                        />
                      </RadioGroup>
                    )}
                  />

                  {errors.gender && (
                    <Typography
                      sx={{
                        color: "error.main",
                        fontSize: 12,
                      }}
                    >
                      {errors.gender.message}
                    </Typography>
                  )}
                </FormControl>

                <Controller
                  name="year_status"
                  control={control}
                  rules={{ required: "กรุณาเลือกชั้นปี" }}
                  render={({ field }) => (
                    <Autocomplete
                      fullWidth
                      disablePortal
                      options={Year_type}
                      value={
                        Year_type.find((item) => item.id === field.value) ??
                        null
                      }
                      getOptionLabel={(option) => option.label}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      onChange={(_, newValue) => {
                        field.onChange(newValue?.id ?? "");
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="ชั้นปี"
                          error={!!errors.year_status}
                          helperText={errors.year_status?.message}
                        />
                      )}
                    />
                  )}
                />

                <Autocomplete
                  disablePortal
                  loading={loading_faculty}
                  options={faculty ?? []}
                  value={selectedFaculty}
                  onChange={(_, newValue) => {
                    setSelectedFaculty(newValue);
                    setSelectedMajor(null);

                    setValue("faculty_name", newValue?.faculty_name ?? "", {
                      shouldValidate: true,
                    });
                    setValue("faculty_id", newValue?.faculty_id ?? 0, {
                      shouldValidate: true,
                    });
                    setValue("major_name", "", {
                      shouldValidate: true,
                    });
                    setValue("major_id", 0, {
                      shouldValidate: true,
                    });
                  }}
                  getOptionLabel={(option) => option.faculty_name ?? ""}
                  isOptionEqualToValue={(option, value) =>
                    option.faculty_id === value.faculty_id
                  }
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="คณะ"
                      error={!!errors.faculty_name}
                      helperText={errors.faculty_name?.message}
                    />
                  )}
                />

                <Autocomplete
                  disablePortal
                  options={selectedFaculty?.majors ?? []}
                  value={selectedMajor}
                  onChange={(_, newValue) => {
                    setSelectedMajor(newValue);

                    setValue("major_name", newValue?.major_name ?? "", {
                      shouldValidate: true,
                    });
                    setValue("major_id", newValue?.major_id ?? 0, {
                      shouldValidate: true,
                    });
                  }}
                  getOptionLabel={(option) => option.major_name ?? ""}
                  isOptionEqualToValue={(option, value) =>
                    option.major_id === value.major_id
                  }
                  fullWidth
                  disabled={!selectedFaculty}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="สาขา"
                      error={!!errors.major_name}
                      helperText={errors.major_name?.message}
                    />
                  )}
                />

                <TextField
                  label="Username"
                  fullWidth
                  value={watch("user.username") ?? ""}
                  disabled
                  error={!!errors.user?.username}
                  // helperText={errors.user?.username?.message}
                  helperText={'* Username คือ รหัสนิสิต *'}
                />

                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  {...register("user.password", {
                    required: "กรุณากรอก password",
                  })}
                  error={!!errors.user?.password}
                  helperText={errors.user?.password?.message}

                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((prev) => !prev)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    "& .MuiInputBase-input": {
                      py: 2,
                      fontSize: 17,
                      color: "#475569",
                    },
                  }}

                />

                <TextField
                  label="ยืนยัน Password"
                  type={showConfirmPassword ? "text" : "password"}
                  fullWidth
                  {...register("user.confirm_password")}
                  error={!!errors.user?.confirm_password}
                  helperText={errors.user?.confirm_password?.message}

                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    mt: 2,

                    "& .MuiInputBase-input": {
                      py: 2,
                      fontSize: 17,
                      color: "#475569",
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    mt: 1,
                    py: 1.4,
                    borderRadius: 3,
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: 16,
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "สมัครข้อมูล"
                  )}
                </Button>

                <Button
                  variant="text"
                  onClick={() => navigate("/login")}
                  sx={{
                    textTransform: "none",
                    fontWeight: 700,
                  }}
                >
                  {"กลับไปหน้าเข้าสู่ระบบ"}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default RegisterPage;