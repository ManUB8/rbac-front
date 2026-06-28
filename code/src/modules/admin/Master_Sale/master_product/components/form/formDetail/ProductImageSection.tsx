import React from "react";
import {
    Box,
    Button,
    Divider,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import type { IuseFetchProductFrom } from "../../../hook/useFetchMasterProduct";
import { ImageUploader } from "../../../../../../../shared/components/UploadImg/ImageUploader";


interface Props {
    controller: IuseFetchProductFrom;
}

const ProductImageSection: React.FC<Props> = ({
    controller,
}) => {
    const productImages =
        controller.watch("product_images") ?? [];

    const addImage = () => {
        controller.setValue(
            "product_images",
            [...productImages, ""]
        );
    };

    const removeImage = (index: number) => {
        controller.setValue(
            "product_images",
            productImages.filter(
                (_: string, i: number) => i !== index
            )
        );
    };

    const updateImage = (
        index: number,
        url: string | null
    ) => {
        const updated = [...productImages];

        updated[index] = url ?? "";

        controller.setValue(
            "product_images",
            updated
        );
    };

    return (
        <>
            <Typography sx={{ fontWeight: 700 }}>
                รูปภาพสินค้า
            </Typography>

            {/* Main Image */}

            <Typography
                variant="body2"
                sx={{
                    fontWeight: 600,
                    mb: 1,
                }}
            >
                รูปหลักสินค้า
            </Typography>

            <ImageUploader
                type="product"
                value={controller.watch("main_image")}
                onChange={(url) =>
                    controller.setValue(
                        "main_image",
                        url ?? ""
                    )
                }
            />

            {/* Gallery */}

            <Stack
                direction="row"
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 3,
                }}
            >
                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 600,
                    }}
                >
                    รูปภาพเพิ่มเติม
                </Typography>

                <Button
                    startIcon={
                        <AddPhotoAlternateOutlinedIcon />
                    }
                    variant="outlined"
                    size="small"
                    onClick={addImage}
                >
                    เพิ่มรูป
                </Button>
            </Stack>

            <Stack spacing={2} sx={{ mt: 2 }}>
                {productImages.map(
                    (image: string, index: number) => (
                        <Box
                            key={index}
                            sx={{
                                position: "relative",
                            }}
                        >
                            <ImageUploader
                                type="product"
                                width={400}
                                height={180}
                                value={image}
                                onChange={(url) =>
                                    updateImage(index, url)
                                }
                            />

                            <IconButton
                                color="error"
                                onClick={() =>
                                    removeImage(index)
                                }
                                sx={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                    bgcolor: "white",
                                }}
                            >
                                <DeleteOutlineIcon />
                            </IconButton>
                        </Box>
                    )
                )}
            </Stack>

            <Divider sx={{ mt: 3 }} />
        </>
    );
};

export default ProductImageSection;