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
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useFetchFaculty } from "../hook/useFaculty";
import { NumericFormat } from "react-number-format";
import type {
  IFaculty,
  IMajor,
  IStudentRegister,
} from "../interface/Login.interface";
import { CreateStudent } from "../service/LoginApi";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { faculty, loading_faculty, reload } = useFetchFaculty();
  const [selectedFaculty, setSelectedFaculty] = useState<IFaculty | null>(null);
  const [selectedMajor, setSelectedMajor] = useState<IMajor | null>(null);
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
  } = useForm<IStudentRegister>({});

  const onSubmit = async (body: IStudentRegister) => {
    try {
      setLoading(true);
      setSuccessMessage("");
      setErrorMessage("");
      console.log("body", body);
      const res = CreateStudent(body);
      // แก้ URL ให้ตรงกับ backend ของคุณ
      console.log("CreateStudent", res);
      setSuccessMessage("สมัครข้อมูลสำเร็จ");
      reset();

      // ถ้าอยากเด้งกลับหน้า login หลังสมัครสำเร็จ
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error: any) {
      setErrorMessage(
        error?.response?.data?.detail || "สมัครข้อมูลไม่สำเร็จ กรุณาลองใหม่",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Value set", getValues());
  }, [watch()]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        bgcolor: "#f3f4f6",
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
              fontWeight={800}
              textAlign="center"
              gutterBottom
            >
              สมัครข้อมูล
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
              sx={{ mb: 3 }}
            >
              กรอกข้อมูลเพื่อสร้างบัญชีผู้ใช้งาน
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2.2}>
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
                  value={getValues("student_id") ?? ""}
                  onValueChange={(values) => {
                    setValue("student_id", values.value);
                    setValue("user.username", values.value);
                  }}
                  error={!!errors?.student_id}
                  helperText={errors?.student_id?.message || ""}
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
                    <Typography color="error" fontSize={12}>
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
                        {...field}
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
                          value="อื่นๆ"
                          control={<Radio />}
                          label="อื่นๆ"
                        />
                      </RadioGroup>
                    )}
                  />

                  {errors.gender && (
                    <Typography color="error" fontSize={12}>
                      {errors.gender.message}
                    </Typography>
                  )}
                </FormControl>

                <Autocomplete<IFaculty>
                  disablePortal
                  loading={loading_faculty}
                  options={faculty ?? []}
                  value={selectedFaculty}
                  onChange={(_, newValue) => {
                    setSelectedFaculty(newValue);
                    setSelectedMajor(null);

                    setValue("faculty_name", newValue?.faculty_name ?? "");
                    setValue("faculty_id", newValue?.id ?? 0);
                    setValue("major_name", "");
                  }}
                  getOptionLabel={(option) => option.faculty_name}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
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

                <Autocomplete<IMajor>
                  disablePortal
                  options={selectedFaculty?.majors ?? []}
                  value={selectedMajor}
                  onChange={(_, newValue) => {
                    setSelectedMajor(newValue);
                    setValue("major_name", newValue?.major_name ?? "");
                    setValue("major_id", newValue?.id ?? 0);
                  }}
                  getOptionLabel={(option) => option.major_name}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
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
                  value={getValues("user.username") ?? ""}
                  disabled
                  error={!!errors.user?.username}
                  helperText={errors.user?.username?.message}
                />

                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  {...register("user.password", {
                    required: "กรุณากรอก password",
                    minLength: {
                      value: 6,
                      message: "รหัสผ่านต้องอย่างน้อย 6 ตัวอักษร",
                    },
                  })}
                  error={!!errors.user?.password}
                  helperText={errors.user?.password?.message}
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
                  กลับไปหน้าเข้าสู่ระบบ
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default RegisterPage;
