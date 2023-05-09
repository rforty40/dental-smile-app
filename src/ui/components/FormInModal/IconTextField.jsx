import { InputAdornment, TextField } from "@mui/material";

export const IconTextField = ({
  colorIcon,
  colorHover,
  colorTxt,
  colorLabel,
  iconStart,
  iconEnd,
  InputProps,
  propsXS,
  ...props
}) => {
  return (
    <TextField
      variant="outlined"
      sx={{
        boxShadow: "1px 1.5px 1.5px rgba(0, 0, 0, 0.5)",
        ":hover": {
          boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
        },
        "& .MuiInputLabel-root.Mui-disabled ": {
          opacity: "0.3",
        },
        "& .MuiFormHelperText-contained": {
          color: colorHover,
          // margin: "2px 3px",
        },
        "& .Mui-disabled.MuiInputBase-formControl": {
          opacity: "0.3",
        },
        "& .Mui-focused.MuiInputBase-root ": {
          boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
        },

        "& .Mui-focused > .MuiInputAdornment-root > .material-icons": {
          color: colorHover,
        },
        ...propsXS,
        "& .MuiInputBase-root ": {
          "& input": {
            // textAlign: "center",
            // fontStyle: "bold",
            color: colorTxt,
          },
        },

        "& .MuiFormLabel-root": {
          color: colorLabel,
        },
        "& .MuiFormLabel-root.Mui-focused": {
          color: colorHover,
        },
      }}
      {...props}
      //
      InputProps={{
        ...InputProps,

        startAdornment: iconStart ? (
          <InputAdornment sx={{ color: colorIcon }} position="start">
            {iconStart}
          </InputAdornment>
        ) : null,
        endAdornment: iconEnd ? (
          <InputAdornment sx={{ color: colorIcon }} position="end">
            {iconEnd}
          </InputAdornment>
        ) : null,
      }}
    />
  );
};