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
              borderBottom: "3px solid #ffffff",
              borderLeft: "3px solid #F4F6F8",
              bgcolor: "#F4F6F8",
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
              bgcolor: "#F4F6F8",
              color: "primary.light",
              borderLeft: "3px solid #ffffff",
              borderRight: "3px solid #ffffff",
            }}
          >
            <Grid
              container
              spacing={2}
              flexDirection="column"
              alignItems={headCell.alignLeft ? "left" : "center"}
            >
              <Grid item>
                <TableSortLabel
                  hideSortIcon
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              </Grid>
              <Grid paddingLeft="16px" height="10px">
                <span
                  style={{
                    textTransform: "uppercase",
                    fontSize: "10px",
                    color: "black",
                  }}
                >
                  {orderBy === headCell.id ? order : null}
                </span>
              </Grid>
            </Grid>
          </TableCell>
        ))}

        <TableCell
          align="right"
          sx={{
            bgcolor: "#F4F6F8",
            borderTop: "3px solid #ffffff",
            borderBottom: "3px solid #ffffff",

            borderRight: "3px solid #F4F6F8",
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
