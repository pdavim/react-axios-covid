import React from "react";
import { observer, inject } from "mobx-react";

import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import TableFooter from "@material-ui/core/TableFooter";

import percentage from "../../functions/percentage";
import totalCases from "../../functions/totalCases";
import filterItems from "../../functions/filterItems";

import CityBackdrop from "../../components/CityBackdrop";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Honeycomb", 408, 3.2, 87, 6.5),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Jelly Bean", 375, 0.0, 94, 0.0),
  createData("KitKat", 518, 26.0, 65, 7.0),
  createData("Lollipop", 392, 0.2, 98, 0.0),
  createData("Marshmallow", 318, 0, 81, 2.0),
  createData("Nougat", 360, 19.0, 9, 37.0),
  createData("Oreo", 437, 18.0, 63, 4.0),
];

const tableHeaderTtextTitle = [
  "nº",
  "Country",
  "Cases",
  "Deaths",
  "Total Recoverd",
  "New Deaths",
  "New Cases",
  "Critical Cases",
  "C/D %",
];

const headCells = [
  {
    id: "country_name",
    numeric: false,
    disablePadding: true,
    label: "Country",
  },
  { id: "cases", numeric: true, disablePadding: false, label: "Cases" },
  { id: "deaths", numeric: true, disablePadding: false, label: "Deaths" },
  {
    id: "total_recovered",
    numeric: true,
    disablePadding: false,
    label: "Total Recoverd",
  },
  {
    id: "new_deaths",
    numeric: true,
    disablePadding: false,
    label: "New Deaths",
  },
  { id: "new_cases", numeric: true, disablePadding: false, label: "New Cases" },
  {
    id: "serious_critical",
    numeric: true,
    disablePadding: false,
    label: "Critical Cases",
  },
  { id: "precentage", numeric: true, disablePadding: false, label: "C/D %" },
];

function descendingComparator(a, b, orderBy) {
  //parseNumber(a);
  //parseNumber(b);
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const parseNumber = (value, locale = "us-US") => {
  const example = Intl.NumberFormat(locale).format("1.1");
  const cleanPattern = new RegExp(`[^-+0-9${example.charAt(1)}]`, "g");
  const cleaned = value.replace(cleanPattern, "");
  const normalized = cleaned.replace(example.charAt(1), ".");

  return parseInt(normalized);
};

const stableSort = (array, comparator) => {
  //const stabilizedThis = array.map((el, index) => [el, index]);
  const stabilizedThis = array.map((el, index) => {
    /*   console.log("Elemnts");
    console.log(el); */
    let data = [
      {
        country_name: el.country_name,
        cases: parseNumber(el.cases),
        deaths: parseNumber(el.deaths),
        region: el.region,
        total_recovered: parseNumber(el.total_recovered),
        new_deaths: parseNumber(el.new_deaths),
        new_cases: parseNumber(el.new_cases),
        serious_critical: parseNumber(el.serious_critical),
        active_cases: parseNumber(el.active_cases),
      },
    ];

    /*   console.log(el.country_name);
    console.log(data[0]);
    console.log(el); */
    return [data[0], index];
    if (el.country_name) {
      console.log("Sort by name");
    } else {
      console.log("Sort by number");

      return [parseNumber(el), index];
    }
  });
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell padding="checkbox">
          <TableSortLabel>Nº </TableSortLabel>
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Per Country Data
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.secondary.dark,
    paddingTop: 20,
    //flexGrow: 1,
    margin: 0,
    maxWidth: "100%",
    borderRadius: 7,
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: "100%",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  listOfCities: {
    display: "flex",
    paddingBottom: 20,
    paddingLeft: 5,
    paddingRight: 0,
  },
  table: {
    alignContent: "center",
    alignItems: "center",
    color: "white",
  },
  tableDeath: {
    color: "red",
  },
  tableContainer: {
    maxHeight: 440,
  },
  newCases: {
    color: "orange",
    fontWeight: 900,
  },
  percentage: {
    color: "blue",
    fontWeight: 900,
  },
  recoverd: {
    color: "green",
    fontWeight: 900,
  },
  chartHeader: {
    color: "white",
    textAlign: "center",
    fontWeight: 600,
    fontSize: 18,
    paddingBottom: 10,
    paddingTop: 10,
  },
  chart: {
    //backgroundColor: "rgb(255,255,255,0.1)",
    color: "white",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 1,
    marginRight: 1,
    borderRadius: 8,
  },
  text: {
    color: "white",
    textAlign: "left",
    fontWeight: 400,
    fontSize: 14,
  },
  topGrid: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  paperGrid: {
    //padding: 1
  },
  paperCardCharts: {
    background: "rgb(32,32,32,0.6)",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 1,
    marginRight: 1,

    //height: 50
  },
  paperCard: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(255,255,255,0.1)",
    marginLeft: 1,
    marginRight: 1,
    height: 50,
  },
  paperCard2: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(255,25,25,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50,
  },
  paperCard3: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(243,186,45,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50,
  },
  paperCard4: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(125,11,159,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50,
  },
  paperCard5: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(25,25,255,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50,
  },
  paperCard6: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(50,204,100,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50,
  },
  paperCard7: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(25,255,25,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50,
  },
  paperCard8: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(204,102,102,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50,
  },
  paperCard9: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(255,0,150,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50,
  },
  paperCard10: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(150,150,150,0.3)",
    marginLeft: 1,
    marginRight: 1,
    height: 50,
  },
  paperCard11: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    background: "rgb(15,15,15,0.4)",
    marginLeft: 1,
    marginRight: 1,
    height: 50,
  },
  textCard: {
    color: "white",
    fontWeight: 400,
    fontSize: 14,
  },
  textContent: {
    color: "white",
    textAlign: "left",
    fontWeight: 900,
    fontSize: 18,
  },
  paper: {
    position: "absolute",
    // width: 100,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3)
  },
  textChartTitle: {
    color: "white",
    textAlign: "center",
    fontWeight: 900,
    fontSize: 18,
    textTransform: "Capitalize",
  },
  textChartTitlept: {
    textAlign: "center",
    color: "#E1E1E1",
    fontSize: 18,
    fontWeight: 700,
    textTransform: "Capitalize",
    fontStyle: "italic",
  },
  tableContainerFooter: {
    background: "white",
    width: "100%",
  },
}));

const EnhancedTable = inject("Store")(
  observer((props) => {
    const classes = useStyles();
    const [order, setOrder] = React.useState("desc");
    const [orderBy, setOrderBy] = React.useState("cases");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    // const [page, setPage] = React.useState(0);
    //const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [arrayData, setArrayData] = React.useState([]);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    /*  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }; */

    let dataData =
      props.Store.getAllCountryCornovirusDataObs.data.countries_stat;

    console.log("dataData");
    console.log(dataData);

    let totalData = totalCases(dataData);

    let dataDataLength = dataData.length;
    let casesData = totalData.totalCases;
    let deathsData = totalData.totalDeaths;
    let criticalData = totalData.totalCritical;
    let nDeathsData = totalData.tNewDeaths;
    let nCases = totalData.tNewCases;
    let nTotalRecovers = totalData.tRecovers;
    let nActiveCases = totalData.tActiveCases;
    let nTotalCountries = dataData.length;
    let nTotalCasesPer1mPopulation = (
      totalData.tTotalCasesPer1mPopulation / dataDataLength
    ).toFixed(2);

    let totalPercentage = percentage(casesData, deathsData);

    let p = parseFloat(deathsData);
    let q = parseFloat(totalData.totalCases);
    let r = parseFloat(criticalData);

    const seriesDonut = [q, r, p];
    const donuntSeries = [q, p];
    const donuntSeriesCritical = [p, r];
    const donuntSeriesCasesCritical = [q, r];

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = tableHeaderTtextTitle.map((n) => n.name);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };

    const handleClick = (event, name) => {
      console.log("onlcick", name);
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(newSelected);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleChangeDense = (event) => {
      setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    console.log("parse number", parseNumber("12,3"));
    console.log("parse number", typeof parseNumber("12,3"));

    const corpus = {
      "1.123": {
        expected: 1.123,
        locale: "en-US",
      },
      "1,123": {
        expected: 1123,
        locale: "en-US",
      },
      "1.123": {
        expected: 1.123,
        locale: "pt-PT",
      },
      "1,123": {
        expected: 1123,
        locale: "pt-PT",
      },
    };

    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, tableHeaderTtextTitle.length - page * rowsPerPage);
    console.log("table02", dataData);
    return (
      <TableContainer
        component={Paper}
        className={classes.tableContainer}
        aria-label="sticky table"
      >
        <Table
          //className={classes.table}
          //  aria-labelledby="tableTitle"
          //size={dense ? "small" : "medium"}
          className={classes.table}
          size="small"
          aria-label="a dense table"
          stickyHeader
        >
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={tableHeaderTtextTitle.length}
          />
          <TableBody>
            {stableSort(dataData, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <StyledTableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.country_name}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox" component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      <CityBackdrop
                        value={row.country_name}
                        cases={row.cases}
                        deaths={row.deaths}
                        total_recovered={row.total_recovered}
                        new_deaths={row.new_deaths}
                        new_cases={row.new_cases}
                        serious_critical={row.serious_critical}
                      />
                    </TableCell>
                    <TableCell align="right">{row.cases}</TableCell>
                    <TableCell align="right" className={classes.tableDeath}>
                      {row.deaths}
                    </TableCell>
                    <TableCell align="right" className={classes.recoverd}>
                      {row.total_recovered}
                    </TableCell>
                    <TableCell align="right" className={classes.tableDeath}>
                      {row.new_deaths}
                    </TableCell>
                    <TableCell align="right" className={classes.newCases}>
                      {row.new_cases}
                    </TableCell>
                    <TableCell align="right">{row.serious_critical}</TableCell>
                    <TableCell align="right" className={classes.percentage}>
                      {percentage(row.cases, row.deaths)}
                    </TableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
        <TableFooter className={classes.tableContainerFooter}>
          <TableRow className={classes.tableContainerFooter}>
            <TablePagination
              className={classes.tableContainerFooter}
              rowsPerPageOptions={[10, 25, 100, 200, 250]}
              //component="div"
              count={dataData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </TableContainer>
    );
  })
);

export default EnhancedTable;

//Table Stylling Material UI
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "rgb(225,225,225)",
    color: theme.palette.secondary.dark,
    fontWeight: 700,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);
