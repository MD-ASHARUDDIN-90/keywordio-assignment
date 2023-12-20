import * as React from "react";
import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  IconButton,
  Icon,
  TableSortLabel,
} from "@mui/material";
import { Chart } from "chart.js";
import { ArcElement, CategoryScale, DoughnutController } from "chart.js";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import TableChartIcon from "@mui/icons-material/TableChart";

Chart.register(ArcElement, CategoryScale, DoughnutController);

const rows = [
  { Group: "Male", Clicks: 785, Cost: 251, Conversion: 809, Revenue: 742 },
  { Group: "Female", Clicks: 852, Cost: 660, Conversion: 487, Revenue: 407 },
  { Group: "Unknown", Clicks: 931, Cost: 899, Conversion: 933, Revenue: 849 },
];

export default function App() {
  const [view, setView] = useState("chart");
  const [metric, setMetric] = useState("Clicks");

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("Clicks");

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedRows = rows.sort(
    (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1) * (order === "asc" ? 1 : -1)
  );

  const data = React.useMemo(() => {
    if (metric) {
      return {
        labels: rows.map((row) => row.Group),
        datasets: [
          {
            data: rows.map((row) => row[metric]),
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      };
    }
    return null;
  }, [metric]);

  const [total, setTotal] = useState(
    rows.reduce((acc, row) => acc + row.Clicks, 0)
  );

  return (
    <Box
      sx={{
        backgroundColor: "white",
        minHeight: "70vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          flexWrap: "wrap",
        }}
      >
        <p style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Ad Insights</p>
        {view === "chart" && (
          <Select
            value={metric}
            onChange={(e) => {
              setMetric(e.target.value);
              if (e.target.value === "Clicks") {
                setTotal(rows.reduce((acc, row) => acc + row.Clicks, 0));
              } else if (e.target.value === "Cost") {
                setTotal(rows.reduce((acc, row) => acc + row.Cost, 0));
              } else if (e.target.value === "Conversion") {
                setTotal(rows.reduce((acc, row) => acc + row.Conversion, 0));
              } else {
                setTotal(rows.reduce((acc, row) => acc + row.Revenue, 0));
              }
            }}
          >
            <MenuItem value='Clicks'>Clicks</MenuItem>
            <MenuItem value='Cost'>Cost</MenuItem>
            <MenuItem value='Conversion'>Conversion</MenuItem>
            <MenuItem value='Revenue'>Revenue</MenuItem>
          </Select>
        )}
      </Box>

      {view === "table" ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Group</TableCell>
                <TableCell align='right'>
                  <TableSortLabel
                    active={orderBy === "Clicks"}
                    direction={orderBy === "Clicks" ? order : "asc"}
                    onClick={() => handleSortRequest("Clicks")}
                  >
                    Clicks
                  </TableSortLabel>
                </TableCell>{" "}
                <TableCell align='right'>
                  <TableSortLabel
                    active={orderBy === "Cost"}
                    direction={orderBy === "Cost" ? order : "asc"}
                    onClick={() => handleSortRequest("Cost")}
                  >
                    Cost
                  </TableSortLabel>
                </TableCell>{" "}
                <TableCell align='right'>
                  <TableSortLabel
                    active={orderBy === "Conversion"}
                    direction={orderBy === "Conversion" ? order : "asc"}
                    onClick={() => handleSortRequest("Conversion")}
                  >
                    Conversion
                  </TableSortLabel>
                </TableCell>{" "}
                <TableCell align='right'>
                  <TableSortLabel
                    active={orderBy === "Revenue"}
                    direction={orderBy === "Revenue" ? order : "asc"}
                    onClick={() => handleSortRequest("Revenue")}
                  >
                    Revenue
                  </TableSortLabel>
                </TableCell>{" "}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRows.map((row) => (
                <TableRow key={row.Group}>
                  <TableCell component='th' scope='row'>
                    {row.Group}
                  </TableCell>
                  <TableCell align='right'>{row.Clicks}</TableCell>
                  <TableCell align='right'>USD {row.Cost}</TableCell>
                  <TableCell align='right'>{row.Conversion}</TableCell>
                  <TableCell align='right'>USD {row.Revenue}</TableCell>
                </TableRow>
              ))}
              <TableRow sx={{ backgroundColor: "rgb(220, 220, 220 , 0.5)" }}>
                <TableCell component='th' scope='row'>
                  Total
                </TableCell>
                <TableCell align='right'>
                  {rows.reduce((acc, row) => acc + row.Clicks, 0)}
                </TableCell>
                <TableCell align='right'>
                  USD {rows.reduce((acc, row) => acc + row.Cost, 0)}
                </TableCell>
                <TableCell align='right'>
                  {rows.reduce((acc, row) => acc + row.Conversion, 0)}
                </TableCell>
                <TableCell align='right'>
                  USD {rows.reduce((acc, row) => acc + row.Revenue, 0)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "80%",
            padding: ".5rem",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              minHeight: "20%", // specify a minimum height for the parent container
              height: "50vh", // set height as a percentage of the viewport height
            }}
          >
            <Doughnut data={data} options={{ maintainAspectRatio: false }} />
          </div>
          <div>
            {data.labels.map((item, index) => {
              const percentage = (
                (data.datasets[0].data[index] / total) *
                100
              ).toFixed(0);
              const color = data.datasets[0].backgroundColor[index];
              return (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      height: "3vh",
                      width: "5vw",
                      borderRadius: "1rem",
                      background: color,
                      marginRight: "10px",
                    }}
                  ></div>
                  <div>
                    {percentage}% {item}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div style={{ position: "relative", top: ".5rem", right: "2rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "0.1rem",
          }}
        >
          <TableChartIcon onClick={() => setView("table")} />

          <Switch
            checked={view === "chart"}
            onChange={() => setView(view === "table" ? "chart" : "table")}
            name='view'
            color='primary'
          />

          <DonutSmallIcon onClick={() => setView("chart")} />
        </div>
      </div>
    </Box>
  );
}
