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
  // console.log(props);
  return (
    <TextField
      variant="outlined"
      sx={{
        // backgroundColor: "#F0F0F0",
        boxShadow: "1px 1.5px 1.5px rgba(0, 0, 0, 0.5)",
        ":hover": {
          boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
        },
        "& .MuiInputLabel-root.Mui-disabled ": {
          opacity: "0.3",
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
        "& input[type=number]": {
          "-moz-appearance": "textfield",
        },
        "& input[type=number]::-webkit-outer-spin-button": {
          "-webkit-appearance": "none",
          margin: 0,
        },
        "& input[type=number]::-webkit-inner-spin-button": {
          "-webkit-appearance": "none",
          margin: 0,
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
