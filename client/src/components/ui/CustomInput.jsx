import { FormControl, TextField } from "@mui/material"

export default function CustomInput({
  type = "text",
  label,
  value,
  onChange,
  startAdornment,
  ...props
}) {
  return (
    <FormControl  variant="standard" sx={{ my: "1rem" }}>
      <TextField
        type={type}
        value={value}
        onChange={(e) => onChange && onChange(e.target?.value)}
        InputProps={{
          startAdornment: startAdornment ? startAdornment : null,
        }}
        label={label}
        variant="standard"
        {...props}
      />
    </FormControl>
  );
}
