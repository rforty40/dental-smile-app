import { Box, Icon, IconButton, Typography } from "@mui/material";
import { useMemo, useState } from "react";

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
  tipoBtn = "button",
  propsXS,
}) => {
  const [colorTextBtn, setColorTextBtn] = useState(colort);

  return (
    <Box
      component="button"
      type={tipoBtn}
      onClick={onClick}
      onMouseEnter={() => {
        setColorTextBtn(colorth);
      }}
      onMouseLeave={() => {
        setColorTextBtn(colort);
      }}
      sx={{
        cursor: "pointer",
        paddingRight: "0px",
        height: altura,
        textTransform: "none",
        fontWeight: "bold",
        borderRadius: "10px",
        backgroundColor: colorf,
        boxShadow: "none",
        border: "none",
        ":hover": {
          border: "none",
          backgroundColor: colorh,
          transition: "background-color 200ms linear",

          boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
        },
        ...propsXS,
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        sx={{ paddingLeft: "10px", paddingRight: "7px" }}
        columnGap="10px"
      >
        <Typography
          sx={{
            color: colorTextBtn,
            fontSize: "16px",
            fontStyle: "italic",
            fontWeight: fontW,
          }}
        >
          {txt_b}
        </Typography>
        <Icon
          sx={{
            color: colorTextBtn,
          }}
        >
          {iconB}
        </Icon>
      </Box>
    </Box>
  );
};
