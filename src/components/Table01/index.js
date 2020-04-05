import React from "react";
import { observer, inject } from "mobx-react";
import PropTypes from "prop-types";

//import Material UI
import { Grid } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import TableSortLabel from "@material-ui/core/TableSortLabel";

import percentage from "../../functions/percentage";
import totalCases from "../../functions/totalCases";
import filterItems from "../../functions/filterItems";

import Card01 from "../../components/Card01";
import DonutChart01 from "../../components/DonutChart01";
import CityBackdrop from "../../components/CityBackdrop";

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

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 20,
    //flexGrow: 1,
    margin: 0,
    maxWidth: "100%",
    borderRadius: 7,
    backgroundColor: theme.palette.secondary.dark,
    // height: "100%"
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
}));

function descendingComparator(a, b, orderBy) {
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

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const Table01 = inject("Store")(
  observer((props) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [arrayData, setArrayData] = React.useState([]);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    let dataData =
      props.Store.getAllCountryCornovirusDataObs.data.countries_stat;
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
    const classes = useStyles();
    return (
      <TableContainer
        component={Paper}
        className={classes.tableContainer}
        aria-label="sticky table"
      >
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              {tableHeaderTtextTitle.map((headCell, i) => (
                <StyledTableCell
                  key={i}
                  padding={headCell.disablePadding ? "none" : "default"}
                >
                  <TableSortLabel>{headCell}</TableSortLabel>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataData

              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((dt, i) => (
                <StyledTableRow key={i} hover role="checkbox">
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <CityBackdrop
                      value={dt.country_name}
                      cases={dt.cases}
                      deaths={dt.deaths}
                      total_recovered={dt.total_recovered}
                      new_deaths={dt.new_deaths}
                      new_cases={dt.new_cases}
                      serious_critical={dt.serious_critical}
                    />
                  </TableCell>

                  <TableCell align="right">{dt.cases}</TableCell>
                  <TableCell align="right" className={classes.tableDeath}>
                    {dt.deaths}
                  </TableCell>
                  <TableCell align="right" className={classes.recoverd}>
                    {dt.total_recovered}
                  </TableCell>
                  <TableCell align="right" className={classes.tableDeath}>
                    {dt.new_deaths}
                  </TableCell>
                  <TableCell align="right" className={classes.newCases}>
                    {dt.new_cases}
                  </TableCell>
                  <TableCell align="right">{dt.serious_critical}</TableCell>
                  <TableCell align="right" className={classes.percentage}>
                    {percentage(dt.cases, dt.deaths)}
                  </TableCell>
                </StyledTableRow>
              ))}
          </TableBody>
          {dataData.length === 0 ? (
            <p>loading pages</p>
          ) : (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50, 100, 200]}
                  //component="div"
                  count={dataData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    );
  })
);

export default inject("Store")(observer(Table01));

Table01.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
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
