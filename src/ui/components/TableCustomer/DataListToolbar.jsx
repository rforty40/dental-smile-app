import { styled, alpha } from "@mui/material/styles";
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Box,
  TableHead,
} from "@mui/material";

import {
  DeleteOutline,
  DeleteSharp,
  PersonAdd,
  PersonAddAlt,
  PostAdd,
  SearchOutlined,
} from "@mui/icons-material";
import { useState } from "react";
// component

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

/** cuadro de busqueda */
const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  height: 50,
  width: 280,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": {
    width: 300,
    boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
  },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

export const DataListToolbar = ({
  numSelected,
  filterName,
  onFilterName,
  orderBy,
  bgHeaderColor = "primary.main",
  searchWhat,
  txt_header,
  withToolbar,
  withButton,
  withBoxSearch,
  typeButton,
}) => {
  /*
  
  */
  // console.log({ numSelected, filterName, onFilterName });
  // numSelected = 4;

  const [showBusqText, setShowBusqText] = useState(false);
  return (
    withToolbar && (
      // <TableHead>
      <StyledRoot
        sx={{
          backgroundColor: bgHeaderColor,

          ...(numSelected > 0 && {
            color: bgHeaderColor === "primary.main" ? "#ffffff" : "black",
          }),
        }}
      >
        {/** caso de filas seleccionadas */}
        <Typography
          className="text-shadow"
          variant="h6"
          sx={{
            color: bgHeaderColor === "primary.main" ? "#ffffff" : "black",
          }}
        >
          {txt_header}
        </Typography>

        {numSelected > 0 ? (
          <Box display="flex" gap="15px" alignItems="center">
            <Typography component="div" variant="subtitle1">
              {numSelected} {numSelected > 1 ? "seleccionados" : "seleccionado"}
            </Typography>
            <IconButton>
              <DeleteSharp
                sx={{
                  color: bgHeaderColor === "primary.main" ? "#ffffff" : "black",
                }}
                fontSize="medium"
              />
            </IconButton>
          </Box>
        ) : (
          <>
            <Box display="flex" gap="30px" alignItems="center">
              {withBoxSearch && (
                <Box display="flex" flexDirection="column" gap="3px">
                  <StyledSearch
                    sx={{
                      backgroundColor: "#ffffff",
                    }}
                    onClick={() => {
                      setShowBusqText(true);
                    }}
                    onBlur={() => {
                      setShowBusqText(false);
                    }}
                    value={filterName}
                    onChange={onFilterName}
                    placeholder={searchWhat}
                    startAdornment={
                      <IconButton>
                        <SearchOutlined />
                      </IconButton>
                    }
                  />
                  <Typography
                    display={!showBusqText && "none"}
                    variant="p"
                    fontSize="14px"
                    sx={{
                      color:
                        bgHeaderColor === "primary.main" ? "#ffffff" : "black",
                    }}
                  >
                    Buscando por{" "}
                    <span style={{ textTransform: "capitalize" }}>
                      {orderBy}
                    </span>
                  </Typography>
                </Box>
              )}

              {withButton && (
                <IconButton>
                  {typeButton === "PersonAddAlt" && (
                    <PersonAddAlt
                      sx={{
                        color:
                          bgHeaderColor === "primary.main"
                            ? "#ffffff"
                            : "black",
                      }}
                      fontSize="large"
                    />
                  )}

                  {typeButton === "PostAdd" && (
                    <PostAdd
                      sx={{
                        color:
                          bgHeaderColor === "primary.main"
                            ? "#ffffff"
                            : "black",
                      }}
                      fontSize="large"
                    />
                  )}
                </IconButton>
              )}
            </Box>
          </>
        )}

        {/* {numSelected > 0 && (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteSharp />
            </IconButton>
          </Tooltip>
        )} */}
      </StyledRoot>
      // </TableHead>
    )
  );
};
