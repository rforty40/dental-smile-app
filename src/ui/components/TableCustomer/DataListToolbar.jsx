import { styled, alpha } from "@mui/material/styles";
import {
  Toolbar,
  IconButton,
  Typography,
  OutlinedInput,
  Box,
} from "@mui/material";

import { Close, DeleteSharp, PersonAddAlt, PostAdd } from "@mui/icons-material";
import { useState } from "react";
import { ButtonCustom } from "../FormInModal/ButtonCustom";
import { usePacienteStore, useUiStore } from "../../../hooks";
import { DeleteConfirm } from "../FormInModal/DeleteConfirm";

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
  selected,
  setSelected,
  filterName,
  onFilterName,
  setFilterName,
  orderBy,
  bgHeaderColor = "primary.main",
  searchWhat,
  txt_header,
  withToolbar,
  withBoxSearch,
  typeDatos,
  txt_button,
  funcionBtnTbl,
}) => {
  const { changeTitleFormReg, startDeletingPaciente } = usePacienteStore();

  const handleAdd = () => {
    switch (typeDatos) {
      case "pacientes":
        changeTitleFormReg("Registro de paciente");
        funcionBtnTbl();
        break;

      default:
        break;
    }
  };

  const [showBusqText, setShowBusqText] = useState(false);

  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const handleOpenDialogDel = () => {
    setOpenDialogDelete(true);
  };

  const deleteVarious = () => {
    console.log("deleteVarious");
    console.log(selected);
    startDeletingPaciente(selected);
    // for (const i of selected) {
    //   setTimeout(() => {
    //     console.log(i);
    //     startDeletingPaciente(i);
    //   }, 1500);
    // }
    setSelected([]);
    console.log(selected);
  };

  return (
    withToolbar && (
      <>
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
              visibility={!showBusqText && "hidden"}
              variant="p"
              fontSize="12px"
              sx={{
                color:
                  bgHeaderColor === "primary.main"
                    ? "colorTable.main"
                    : "black",
              }}
            >
              Buscando por
              <span style={{ textTransform: "capitalize" }}>
                {" " + orderBy}
              </span>
            </Typography>
          </Box>

          {numSelected > 0 ? (
            <Box display="flex" gap="15px" alignItems="center">
              <Typography component="div" variant="subtitle1">
                {numSelected}{" "}
                {numSelected > 1 ? "seleccionados" : "seleccionado"}
              </Typography>
              <IconButton onClick={handleOpenDialogDel}>
                <DeleteSharp
                  sx={{
                    color: bgHeaderColor === "primary.main" ? "white" : "black",
                  }}
                  fontSize="medium"
                />
              </IconButton>

              <DeleteConfirm
                message={
                  <>
                    ¿Está segura que desea eliminar
                    {numSelected > 1
                      ? ` los ${numSelected} registros seleccionados?`
                      : ` el registro seleccionado?`}
                  </>
                }
                stateOpen={openDialogDelete}
                setStateOpen={setOpenDialogDelete}
                funcionDelete={deleteVarious}
              />
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
                            bgHeaderColor === "primary.main"
                              ? "black"
                              : "white",
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

                {typeDatos && typeDatos === "pacientes" && (
                  <ButtonCustom
                    altura={"40px"}
                    colorf={
                      bgHeaderColor === "primary.main"
                        ? "white"
                        : "primary.main"
                    }
                    colorh={
                      bgHeaderColor === "primary.main"
                        ? "btnHoverInForm.main"
                        : "secondary.main"
                    }
                    colort={
                      bgHeaderColor === "primary.main" ? "black" : "white"
                    }
                    txt_b={txt_button}
                    colorth="white"
                    fontW="bold"
                    iconB={<PersonAddAlt />}
                    onClick={handleAdd}
                  />
                )}

                {typeDatos && typeDatos === "citas" && (
                  <PostAdd
                    sx={{
                      color:
                        bgHeaderColor === "primary.main" ? "white" : "black",
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
      </>
      // </TableHead>
    )
  );
};
