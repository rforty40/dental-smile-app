import { Box, Fab, IconButton, Typography } from "@mui/material";
import { useState } from "react";

export const ButtonCustom = ({
  altura = "45px",
  colorf,
  colorh,
  colort,
  colorth = colort,
  txt_b = "",
  iconB,
  onClick,
  fontW = "normal",
  propsXS,
}) => {
  const [colorTextBtn, setColorTextBtn] = useState(colort);

  return (
    <Box
      onClick={onClick}
      onMouseEnter={() => {
        //console.log("Enter en mi boton");
        setColorTextBtn(colorth);
      }}
      onMouseLeave={() => {
        //console.log("Leave en mi boton");
        setColorTextBtn(colort);
      }}
      variant="extended"
      className="button"
      sx={{
        cursor: "pointer",
        paddingRight: "0px",
        height: altura,
        textTransform: "none",
        fontWeight: "bold",
        borderRadius: "10px",
        backgroundColor: colorf,
        boxShadow: "none",
        ":hover": {
          border: "none",
          backgroundColor: colorh,
          transition: "background-color 200ms linear",

          boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
        },
        ...propsXS,
      }}
    >
      <Box display="flex" flexDirection="row" alignItems="center">
        <Typography
          sx={{
            paddingLeft: "8px",
            color: colorTextBtn,
            fontSize: "16px",
            fontStyle: "italic",
            fontWeight: fontW,
          }}
        >
          {txt_b}
        </Typography>
        <IconButton
          sx={{
            color: colorTextBtn,
          }}
        >
          {iconB}
        </IconButton>
      </Box>
    </Box>
  );
};
