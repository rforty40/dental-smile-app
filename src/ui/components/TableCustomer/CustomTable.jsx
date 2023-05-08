import { useEffect, useState } from "react";

import {
  Box,
  Checkbox,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

import { Delete, Edit, MoreVert } from "@mui/icons-material";

import { filter } from "lodash";

import { DataListHead } from "./DataListHead";
import { DataListToolbar } from "./DataListToolbar";
import { Link as RouterLink } from "react-router-dom";
import { CustomPopover } from "./CustomPopover";
import { DeleteConfirm } from "../FormInModal/DeleteConfirm";

//
//
//
const arrCuando = [
  "Hoy",
  "Mañana",
  "Esta semana",
  "Este mes",
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Noviembre",
  "Diciembre",
];

//funcion del ordenamiento de registro
function descendingComparator(a, b, orderBy) {
  //columna cuando de la tabla Citas
  if (orderBy === "cuando") {
    if (arrCuando.indexOf(b[orderBy]) < arrCuando.indexOf(a[orderBy])) {
      return -1;
    }
    if (arrCuando.indexOf(b[orderBy]) > arrCuando.indexOf(a[orderBy])) {
      return 1;
    }
    //
  } else {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
  }

  return 0;
}
//funcion del ordenamiento de registro
function getComparator(order, orderBy) {
  return order === "desc"
    ? //estas funciones son las que se ejecutas en applySortFilter
      (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

//aplicar ordenamiento por filtro
function applySortFilter(array, comparator, query, columnaABuscar) {
  const stabilizedThis = array.map((el, index) => [el, index]);

  //ordeamiento de los datos
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  //cuadro de busqueda recibe texto usamos funcion del lodash
  if (query) {
    const datosBuscados = filter(array, (_user) => {
      const txt_celda = _user[columnaABuscar];

      //si txt_celda existe
      if (txt_celda) {
        //si el tipo de celda es un numero
        if (typeof txt_celda === "number") {
          //lo ingresado el box search es un numero
          if (!isNaN(parseInt(query))) {
            //se muestra resultados mayores o iguales a ese numero
            return txt_celda >= query;
          }
        } else {
          //es texto

          return txt_celda.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        }
      }
    });

    //filtrar datos del resultado de la busqueda
    const datosBuscadosOrd = datosBuscados.map((el, index) => [el, index]);

    datosBuscadosOrd.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    return datosBuscadosOrd.map((el) => el[0]);
  }

  //retornar resultados ordenados
  return stabilizedThis.map((el) => el[0]);
}

//
//
//
//
//
//
//COMPONENTE TABLA PERSONALIZADA

export const CustomTable = ({
  TABLE_HEAD,
  DATALIST,
  columnaABuscarPri,
  searchWhat,
  txt_header,
  bgHeaderColor,
  withToolbar,
  txt_button,
  withBoxSearch,
  typeDatos,
  iconosEnFila = true,
  funcionBtnTbl = null,
}) => {
  //
  //hooks

  //

  //hook abrir el popOver eliminar y editar
  const [open, setOpen] = useState(null);

  //hook numero de pagina a mostrar
  const [page, setPage] = useState(0);

  //hook  orden de la columna asc or desc
  const [order, setOrder] = useState("asc");

  //hook captura de  la columna seleccionada debe ser una columna con un dato unico
  const [orderBy, setOrderBy] = useState(columnaABuscarPri);

  //hook arreglo de nombres de cada fila selecionada con el checkbox
  const [selected, setSelected] = useState([]);

  //hook text del cuadro de busqueda
  const [filterName, setFilterName] = useState("");

  //hook filas por paginas
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //hooks datos totales
  const [dataTotal, setDataTotal] = useState(DATALIST.length);

  //
  //handlers
  //

  //handler abrir el popover
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  //handler cerrar el popover
  const handleCloseMenu = () => {
    setOpen(null);
  };

  //handler del Filtro por Nombre
  const handleFilterByName = (event) => {
    //setea la pagina a 0
    setPage(0);
    //actualiza el hook con el texto del cuadro de busqueda
    setFilterName(event.target.value);
  };

  //handler cambiar el orden
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  //handle seleccionar todo
  const handleSelectAllClick = (event) => {
    //el checked esta seleccionado
    if (event.target.checked) {
      const newSelecteds = DATALIST.map((n) => n["id"]);
      //seleccionamos todos los nombres
      setSelected(newSelecteds);
      return;
    }
    //se limpia la lista de registros seleccionados si no esta seleccionado el checkbox
    setSelected([]);
  };

  //handler del checkbox de la fila
  const handleClick = (event, name) => {
    /*

    tener en cuenta que se ejecuta cada vez que se activa el checkbox de la fila, como se puedar un click para seleccionar y deseleccionar se debe controlar aquello

    el name no se encuentra en el array hook selected (-1), es decir es seleccionable

    el name se encuentra en la primera ubicacion del array (0)

    el name se encuentra en la ultima ubicacion del array (selected.length - 1)

    el name se encuentra en cualquier ubicacion del array (> 0)

    */
    const selectedIndex = selected.indexOf(name);

    //console.log(selectedIndex);

    let newSelected = [];

    //seleccionable
    //concantenamos el array hook selected con el nuevo name
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);

      //se elimina el primer elemento
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));

      //se elimina el ultimo elemento
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));

      //se corta el array antes y despues del indice seleccionado
      //y estas partes se unen
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    //actualizamos el array hook selected
    setSelected(newSelected);
  };

  //handler para actualizar el hook page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //handler para actualizar el hook page y el hook rowsPerPage
  const handleChangeRowsPerPage = (event) => {
    //console.log(event.target.value);
    setPage(0);
    const aver = parseInt(event.target.value, 10);
    //console.log(aver);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  //
  //constantes
  //
  //registros filtrados
  const filteredUsers = applySortFilter(
    DATALIST,
    getComparator(order, orderBy),
    filterName,
    orderBy
  );

  //filas vacias
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - DATALIST.length) : 0;

  //no coincidencias en la busqueda
  const isNotFound = !filteredUsers.length && !!filterName;

  //useEffect para actualizar los registros totales
  useEffect(() => {
    setDataTotal(filteredUsers.length);
  }, [filteredUsers]);

  //
  //
  //
  //

  return (
    <>
      <Box
        sx={{
          bgcolor: "white",
          width: "100%",

          padding: "20px",
          borderRadius: "10px",
        }}
        //sx={{ padding: 10 }}
      >
        {/* barra toolbar */}

        <DataListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          setFilterName={setFilterName}
          orderBy={orderBy}
          bgHeaderColor={bgHeaderColor}
          searchWhat={searchWhat}
          txt_header={txt_header}
          withToolbar={withToolbar}
          withBoxSearch={withBoxSearch}
          typeDatos={typeDatos}
          txt_button={txt_button}
          funcionBtnTbl={funcionBtnTbl}
        />

        <TableContainer sx={{ overflowX: "initial" }}>
          <Table size="small" stickyHeader>
            {/* Cabecera de las columnas */}

            <DataListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={DATALIST.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
              withToolbar={withToolbar}
            />

            {/* Cuerpo de Tabla */}

            <TableBody>
              {filteredUsers
                //
                //la razon por la que page inicia con 0
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                //

                .map((row) => {
                  const keys = Object.keys(row);

                  const filaSeleccionada = row["id"];
                  //booleana para saber si el nombre esta en el arreglo de filas seleccionadas
                  //es true si el name esta en el array
                  const selectedUser =
                    selected.indexOf(filaSeleccionada) !== -1;

                  return (
                    /*fila de la tabla*/
                    <TableRow
                      hover
                      sx={{
                        backgroundColor: "white",

                        "&.Mui-selected": {
                          backgroundColor: "#E0DAEB !important",
                        },
                      }}
                      key={row[keys[0]]}
                      tabIndex={-1}
                      role="checkbox"
                      selected={selectedUser}
                    >
                      {/* celda checkbox */}
                      {withToolbar && (
                        <TableCell
                          padding="checkbox"
                          sx={{
                            border: "3px solid",
                            borderColor: "colorTable.main",
                          }}
                        >
                          <Checkbox
                            checked={selectedUser}
                            onChange={(event) =>
                              handleClick(event, filaSeleccionada)
                            }
                          />
                        </TableCell>
                      )}
                      {/* celdas de los datos */}

                      {keys.slice(1).map((key, index) => {
                        if (key === "paciente" || key === "nombre") {
                          return (
                            <TableCell
                              sx={{
                                border: "3px solid",
                                borderColor: "colorTable.main",
                              }}
                              key={`${row[keys[0]]}${index}`}
                              align="left"
                            >
                              <Link
                                component={RouterLink}
                                to="/agenda"
                                style={{ textDecoration: "none" }}
                              >
                                <Typography
                                  sx={{
                                    cursor: "pointer",

                                    color: "secondary.main",
                                    fontSize: "15px",
                                    fontWeight: "bold",
                                    borderRadius: "5px",
                                  }}
                                >
                                  {row[key]}
                                </Typography>
                              </Link>
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell
                              sx={{
                                height: "10px",
                                border: "3px solid",
                                borderColor: "colorTable.main",
                                color: "black",
                                fontSize: "14px",
                                fontWeight: "bold",
                              }}
                              key={`${row[keys[0]]}${index}`}
                              align="left"
                            >
                              {row[key]}
                            </TableCell>
                          );
                        }
                      })}

                      {iconosEnFila ? (
                        <TableCell align="right">
                          <Box display="flex" flexDirection="row">
                            <IconButton sx={{ color: "primary.main" }}>
                              <Edit />
                            </IconButton>

                            <IconButton sx={{ color: "primary.main" }}>
                              <Delete />
                            </IconButton>
                          </Box>
                        </TableCell>
                      ) : (
                        <TableCell
                          sx={{
                            border: "3px solid",
                            borderColor: "colorTable.main",
                          }}
                          align="right"
                        >
                          <IconButton
                            size="large"
                            color="inherit"
                            onClick={handleOpenMenu}
                          >
                            <MoreVert />
                          </IconButton>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}

              {/* filas vacias */}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

            {isNotFound && (
              <TableBody>
                <TableRow>
                  {/* <TableCell> */}
                  <TableCell align="center" colSpan={9} sx={{ py: 3 }}>
                    <Box
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="h6" paragraph>
                        Sin resultados
                      </Typography>

                      <Typography variant="body2">
                        No se encontraron resultados para &nbsp;
                        <strong>&quot;{filterName}&quot;</strong>.
                        <br /> Intente verificar errores tipográficos o usar
                        palabras completas.
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataTotal}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      <CustomPopover
        stateOpen={open}
        setStateOpen={setOpen}
        handleCloseMenu={handleCloseMenu}
        funcionBtnTbl={funcionBtnTbl}
        typeDatos={typeDatos}
      />
    </>
  );
};
