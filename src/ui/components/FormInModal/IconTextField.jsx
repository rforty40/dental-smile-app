import { InputAdornment, TextField } from "@mui/material";

export const IconTextField = ({
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
          color: "btnHoverInForm.main !important",
        },
        "& .Mui-focused.MuiInputBase-root ": {
          boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
        },

        ...propsXS,
        "& .MuiInputBase-root ": {
          "& input": {
            // textAlign: "center",
            // fontStyle: "bold",
            color: "black",
          },
        },

        "& .MuiFormLabel-root": {
          color: "#602A90",
        },
        "& .MuiFormLabel-root.Mui-focused": {
          color: "btnHoverInForm.main",
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
      InputProps={{
        ...InputProps,

        startAdornment: iconStart ? (
          <InputAdornment position="start">{iconStart}</InputAdornment>
        ) : null,
        endAdornment: iconEnd ? (
          <InputAdornment position="end">{iconEnd}</InputAdornment>
        ) : null,
      }}
    />
  );
};
