import PropTypes from "prop-types";
// @mui
import {
  Checkbox,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
  Grid,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";

// ----------------------------------------------------------------------

export const DataListHead = ({
  order,
  orderBy,
  rowCount,
  headLabel,
  numSelected,
  onRequestSort,
  onSelectAllClick,
  withToolbar,
}) => {
  // funcion que retorna funcion
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/**checkbox */}
        {withToolbar && (
          <TableCell
            sx={{
              // borderBottom: "3px solid white",
              // borderLeft: "3px solid colorTable.main",
              borderRight: "3px solid white",
              bgcolor: "colorTable.main",
            }}
            padding="checkbox"
          >
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
        )}
        {/** headers */}

        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              // color: "#939EA8",
              padding: "0",
              margin: "0",
              bgcolor: "colorTable.main",
              color: "primary.light",
              borderLeft: "3px solid white",
              borderRight: "3px solid white",
            }}
          >
            <Grid
              display="grid"
              padding="5px"
              container
              flexDirection="column"
              // alignItems={headCell.alignLeft ? "start" : "center"}
              justifyItems={headCell.alignLeft ? "start" : "center"}
            >
              <Grid item sx={{ width: "80%" }}>
                <TableSortLabel
                  hideSortIcon
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  {headCell.label}
                </TableSortLabel>
              </Grid>
              <Grid item sx={{ width: "20%" }}>
                <span
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    color: "black",
                  }}
                >
                  {orderBy === headCell.id ? (
                    order
                  ) : (
                    <span style={{ visibility: "hidden" }}>"aaaaaa"</span>
                  )}
                </span>
              </Grid>
            </Grid>
          </TableCell>
        ))}

        <TableCell
          align="right"
          sx={{
            height: "10px",
            bgcolor: "colorTable.main",
            // borderTop: "3px solid white",
            // borderBottom: "3px solid white",
            borderLeft: "3px solid white",
            // borderRight: "3px solid colorTable.main",
          }}
        >
          {/* <Grid container spacing={2} flexDirection="column">
            <TableSortLabel hideSortIcon>Acciones</TableSortLabel>
            <span style={{ visibility: "hidden" }}>-------</span>
          </Grid> */}
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
