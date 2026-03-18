import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import Exit from "../../../assets/svg/icon/exit_to_app-red.svg";
import { colorModeAtom } from "../../store/themeAtom";
import { useAtom } from "jotai";
export default function SidebarFooter({
    collapsed, version, logoMain, logoText, onLogout,
}: {
    collapsed: boolean;
    version: string;
    logoMain: string;   // โลโก้สัญลักษณ์
    logoText?: string;  // โลโก้ตัวอักษร (ถ้ามี)
    onLogout: () => void;
}) {
    const [mode] = useAtom(colorModeAtom);

    return (
        <>

            {collapsed ? (
                <>
                    <Stack spacing={2} alignItems="center" >
                        <Box
                            sx={{
                                width: 48, height: 48, borderRadius: 2, border: "2px solid #B3261E",
                                display: "flex", alignItems: "center", justifyContent: "center"
                            }}
                            onClick={onLogout}
                        >
                            <img src={Exit} />
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <img src={logoMain} alt="logo" style={{ width: 34, height: 34, display: "block" }} />
                        </Box>
                        <Typography>{version}</Typography>
                    </Stack>
                </>
            ) : (
                <>
                    <Stack spacing={2}>
                        {/* Logout (ชิดซ้าย) */}
                        <Box
                            onClick={onLogout}
                            sx={{
                                cursor: "pointer",
                                "&:hover": { opacity: 0.7 },
                                alignSelf: "flex-start", // ✅ บังคับให้อยู่ซ้าย
                            }}
                        >
                            <Typography
                                sx={{
                                    color: (theme) => theme.palette.error.main, // ✅ ใช้ error.main จาก theme
                                    fontSize: 16,
                                    fontWeight: 500,
                                    lineHeight: "24px",
                                }}
                            >
                               {" ออกจากระบบ :"}
                            </Typography>

                            <Typography
                                sx={{
                                    color: (theme) => theme.palette.error.main,
                                    fontSize: 16,
                                    fontWeight: 500,
                                    lineHeight: "24px",
                                }}
                                noWrap
                            >
                                {"Admin"}
                            </Typography>

                        </Box>

                        {/* Centered section */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start", // ✅ จัดตรงกลาง
                                gap: 1,
                                flex: 1,
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center"}}>
                                <img
                                    src={logoMain}
                                    alt="logo"
                                    style={{ width: 28, height: 34, display: "block" }}
                                />
                                {logoText && (
                                    <img
                                        src={logoText}
                                        alt="super"
                                        style={{ width: 94, height: 34, display: "block" }}
                                    />
                                )}
                            </Box>
                            <Typography variant="body1">{`Web Admin Version ${version}`}</Typography>
                        </Box>
                    </Stack>
                </>
            )}
        </>
    );
}