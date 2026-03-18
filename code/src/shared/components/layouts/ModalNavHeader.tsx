// ModalNavHeader.tsx
import React from 'react';
import { Box, Container, IconButton, Typography } from '@mui/material';
import CloseIcon from '../../../assets/svg/icon/close.svg';
export const MODAL_HEADER_H = 64;
export const MODAL_FOOTER_H = 72;

export default function ModalNavHeader({
    title,
    actions,
    onClose,
    isMobile = false, // ✅ เพิ่ม
}: {
    title: string;
    actions?: React.ReactNode[];
    onClose: () => void;
    isMobile?: boolean;
}) {
    const HEADER_H = MODAL_HEADER_H;
    const FOOTER_H = MODAL_FOOTER_H;

    return (
        <>
            {/* HEADER fixed */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    bgcolor: 'background.paper',
                    borderBottom: '1px solid #E9ECEF',
                    borderColor: 'divider',
                }}
            >
                <Container maxWidth="xl" sx={{ position: 'relative', height: HEADER_H }}>
                    {/* ซ้าย: ปุ่มปิด */}
                    <IconButton
                        size="small"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            left: 8,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: 56,
                            height: 56,
                            borderRadius: 2,
                            bgcolor: 'action.hover',  
                            '&:hover': { bgcolor: '#E9ECEF' },
                        }}
                    >
                        <img src={CloseIcon} alt="close" />
                    </IconButton>

                    {/* กลาง: ชื่อหน้า */}
                    <Typography
                        variant="h5"
                        sx={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                              color: 'text.primary',       
                        }}
                    >
                        {title || ' '}
                    </Typography>

                    {/* ขวา: ปุ่มต่าง ๆ (แสดงเฉพาะเดสก์ท็อป) */}
                    {!isMobile && (
                        <Box
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                display: 'flex',
                                gap: 1,
                            }}
                        >
                            {actions?.map((node, idx) => (
                                <React.Fragment key={idx}>{node}</React.Fragment>
                            ))}
                        </Box>
                    )}
                </Container>
            </Box>

            {/* FOOTER fixed เฉพาะมือถือ */}
            {isMobile && !!actions?.length && (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 0, left: 0, right: 0,
                        zIndex: 1000,
                        bgcolor: 'background.paper',      
                        borderTop: '1px solid #E9ECEF',
                        height: FOOTER_H,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Container maxWidth="xl">
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1,
                                // ทำให้ปุ่มกว้างเท่า ๆ กัน และยืดเต็มความกว้างจอ
                                '& > *': { flex: 1 },
                            }}
                        >
                            {actions.map((node, idx) => (
                                <React.Fragment key={idx}>{node}</React.Fragment>
                            ))}
                        </Box>
                    </Container>
                </Box>
            )}
        </>
    );
}
