import { Box, IconButton, TextField } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";

export const TxtFieFormTratam = ({ dataId, dataTxt, fnDelete, fnUpdate }) => {
  return (
    <Box display="flex" flexDirection="row" columnGap="5px">
      <TextField
        fullWidth
        hiddenLabel
        variant="filled"
        value={dataTxt}
        onChange={({ target }) => {
          fnUpdate(dataId, target.value);
        }}
      />
      <IconButton
        onClick={() => {
          fnDelete(dataId);
        }}
        sx={{
          ":hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        <CloseOutlined style={{ fontSize: "20px", color: "#d32f2f" }} />
      </IconButton>
    </Box>
  );
};
