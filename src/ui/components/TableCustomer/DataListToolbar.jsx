import { styled, alpha } from "@mui/material/styles";
import {
  Toolbar,
  Tooltip,
  Button,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Box,
  TableHead,
  Fab,
  Icon,
} from "@mui/material";

import {
  Close,
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
  height: 80,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

/** cuadro de busqueda */
const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  height: 40,
  width: 320,
  backgroundColor: "colorTable.main",
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),

  "&.Mui-focused": {
    width: 380,
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
  setFilterName,
  orderBy,
  bgHeaderColor = "primary.main",
  searchWhat,
  txt_header,
  withToolbar,
  withBoxSearch,
  typeButton,
  txt_button,
  funcionBtnTbl,
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
            color: bgHeaderColor === "primary.main" ? "white" : "black",
          }),
        }}
      >
        {/** caso de filas seleccionadas */}

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Typography
            className="text-shadow"
            variant="h5"
            sx={{
              color: bgHeaderColor === "primary.main" ? "white" : "black",
            }}
          >
            {txt_header}
          </Typography>
          <Typography
            // display={!showBusqText && "none"}

            visibility={!showBusqText && "hidden"}
            variant="p"
            fontSize="12px"
            sx={{
              color:
                bgHeaderColor === "primary.main" ? "colorTable.main" : "black",
            }}
          >
            Buscando por{" "}
            <span style={{ textTransform: "capitalize" }}>{orderBy}</span>
          </Typography>
        </Box>

        {numSelected > 0 ? (
          <Box display="flex" gap="15px" alignItems="center">
            <Typography component="div" variant="subtitle1">
              {numSelected} {numSelected > 1 ? "seleccionados" : "seleccionado"}
            </Typography>
            <IconButton>
              <DeleteSharp
                sx={{
                  color: bgHeaderColor === "primary.main" ? "white" : "black",
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
                      backgroundColor:
                        bgHeaderColor === "primary.main"
                          ? "colorTable.main"
                          : "primary.main",
                      ":hover": {
                        width: 380,
                        backgroundColor:
                          bgHeaderColor === "primary.main"
                            ? "white"
                            : "secondary.main",
                        boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
                      },
                      input: {
                        color:
                          bgHeaderColor === "primary.main" ? "black" : "white",
                        "&::placeholder": { opacity: 1 },
                      },
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
                    // startAdornment={
                    //   <IconButton>
                    //     <SearchOutlined />
                    //   </IconButton>
                    // }
                    endAdornment={
                      <IconButton
                        sx={{
                          visibility:
                            filterName.length > 0 ? "visible" : "hidden",
                        }}
                        onClick={() => setFilterName("")}
                      >
                        <Close
                          sx={{
                            color:
                              bgHeaderColor === "primary.main"
                                ? "black"
                                : "white",
                          }}
                        />
                      </IconButton>
                    }
                  />
                </Box>
              )}

              {typeButton && typeButton === "PersonAddAlt" && (
                <Fab
                  onClick={funcionBtnTbl}
                  variant="extended"
                  className="button"
                  sx={{
                    height: "40px",
                    textTransform: "none",
                    fontWeight: "bold",

                    backgroundColor:
                      bgHeaderColor === "primary.main"
                        ? "colorTable.main"
                        : "primary.main",
                    boxShadow: "none",
                    ":hover": {
                      backgroundColor:
                        bgHeaderColor === "primary.main"
                          ? "white"
                          : "secondary.main",
                      boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
                    },
                  }}
                >
                  <span
                    style={{
                      color:
                        bgHeaderColor === "primary.main" ? "black" : "white",
                    }}
                  >
                    {txt_button}
                  </span>
                  <PersonAddAlt
                    sx={{
                      ml: 1,
                      color:
                        bgHeaderColor === "primary.main" ? "black" : "white",
                    }}
                  />
                </Fab>
              )}

              {typeButton && typeButton === "PostAdd" && (
                <PostAdd
                  sx={{
                    color: bgHeaderColor === "primary.main" ? "white" : "black",
                  }}
                  fontSize="large"
                />
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
