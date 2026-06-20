import React from "react";
import {
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import type { IuseFetchProductFrom } from "../../hook/useFetchMasterProduct";

interface Props {
  controller: IuseFetchProductFrom;
}

const ProductSaleConditionSection: React.FC<Props> = ({ controller }) => {
  const isActive = !!controller.watch("is_active");
  const isLimited = !!controller.watch("is_limited");

  return (
    <>
      <Typography sx={{ fontWeight: 700 }}>
        {"เงื่อนไขการขาย"}
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <TextField
          label="จำกัดต่อคน"
          type="number"
          fullWidth
          disabled={!isLimited}
          value={controller.watch("limit_per_student") ?? ""}
          onChange={(e) =>
            controller.setValue(
              "limit_per_student",
              e.target.value === "" ? null : Number(e.target.value) as any
            )
          }
        />

        <TextField
          label="น้ำหนักสินค้า"
          type="number"
          fullWidth
          value={controller.watch("weight_gram") ?? ""}
          onChange={(e) =>
            controller.setValue(
              "weight_gram",
              e.target.value === "" ? null : Number(e.target.value) as any
            )
          }
        />
      </Stack>

      <Stack direction="row" spacing={2}>
        <FormControlLabel
          control={
            <Switch
              checked={isActive}
              onChange={(e) =>
                controller.setValue("is_active", e.target.checked)
              }
            />
          }
          label="เปิดใช้งาน"
        />

        <FormControlLabel
          control={
            <Switch
              checked={isLimited}
              onChange={(e) => {
                const checked = e.target.checked;
                controller.setValue("is_limited", checked);
                if (!checked) {
                  controller.setValue("limit_per_student", null as any);
                }
              }}
            />
          }
          label="จำกัดจำนวนต่อคน"
        />
      </Stack>
    </>
  );
};

export default ProductSaleConditionSection;