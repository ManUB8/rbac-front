import React from "react";
import {
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import type { IuseFetchProductFrom } from "../../hook/useFetchMasterProduct";

const defaultVariants = [
  {
    variant_name: "",
    color_name: "",
    variant_image: "",
    sku_code: "",
    price: 0,
    stock: 0,
    is_active: true,
  },
];

interface Props {
  controller: IuseFetchProductFrom;
}

const ProductInventorySection: React.FC<Props> = ({ controller }) => {
  return (
    <>
      <Typography sx={{ fontWeight: 700 }}>
        ราคาและคลังสินค้า
      </Typography>

      <FormControlLabel
        control={
          <Switch
            checked={!!controller.watch("has_variant")}
            onChange={(e) => {
              const checked = e.target.checked;

              controller.setValue("has_variant", checked);

              if (checked) {
                controller.setValue("base_price", null as any);
                controller.setValue("base_stock", 0);
                controller.setValue("variants" as any, defaultVariants);
              } else {
                controller.setValue("variants" as any, []);
              }
            }}
          />
        }
        label="สินค้ามีตัวเลือก"
      />

      {!controller.watch("has_variant") && (
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <TextField
            label="ราคา"
            type="number"
            fullWidth
            {...controller.register("base_price")}
          />

          <TextField
            label="คงเหลือ"
            type="number"
            fullWidth
            {...controller.register("base_stock")}
          />
        </Stack>
      )}

      <Divider />
    </>
  );
};

export default ProductInventorySection;