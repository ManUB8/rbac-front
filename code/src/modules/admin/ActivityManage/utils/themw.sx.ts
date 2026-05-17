export const inputSx = (value?: string) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#f8fafc",
    "& input": {
      color: value ? "#6b7280" : "#9ca3af",
    },
    "& input:focus": {
      color: "#111827",
    },
  },
});