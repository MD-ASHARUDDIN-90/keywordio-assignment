import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import TableSortLabel from "@mui/material/TableSortLabel";
import { grey } from "@mui/material/colors";

const rows = [
  {
    Campaign: "Conditioner",
    Clicks: 463,
    Cost: 542,
    Conversion: 781,
    Revenue: 876,
  },
  {
    Campaign: "Cosmetics",
    Clicks: 740,
    Cost: 211,
    Conversion: 816,
    Revenue: 92,
  },
  {
    Campaign: "Facewash",
    Clicks: 856,
    Cost: 688,
    Conversion: 730,
    Revenue: 623,
  },
  {
    Campaign: "Facewash2",
    Clicks: 608,
    Cost: 427,
    Conversion: 448,
    Revenue: 39,
  },
  {
    Campaign: "Serums",
    Clicks: 949,
    Cost: 916,
    Conversion: 34,
    Revenue: 68,
  },
  {
    Campaign: "Shampoos",
    Clicks: 455,
    Cost: 723,
    Conversion: 454,
    Revenue: 400,
  },
];

export default function BasicTable() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("Campaign");

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedRows = rows.sort(
    (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1) * (order === "asc" ? 1 : -1)
  );

  // Calculate totals
  const totals = {
    Campaign: "Total",
    Clicks: sortedRows.reduce((total, row) => total + row.Clicks, 0),
    Cost: sortedRows.reduce((total, row) => total + row.Cost, 0),
    Conversion: sortedRows.reduce((total, row) => total + row.Conversion, 0),
    Revenue: sortedRows.reduce((total, row) => total + row.Revenue, 0),
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        height: "70vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "flex-start",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        <p style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Ad Insights</p>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "Campaign"}
                  direction={orderBy === "Campaign" ? order : "asc"}
                  onClick={() => handleSortRequest("Campaign")}
                >
                  Campaign
                </TableSortLabel>
              </TableCell>
              <TableCell align='right'>
                <TableSortLabel
                  active={orderBy === "Clicks"}
                  direction={orderBy === "Clicks" ? order : "asc"}
                  onClick={() => handleSortRequest("Clicks")}
                >
                  Clicks
                </TableSortLabel>
              </TableCell>
              <TableCell align='right'>
                <TableSortLabel
                  active={orderBy === "Cost"}
                  direction={orderBy === "Cost" ? order : "asc"}
                  onClick={() => handleSortRequest("Cost")}
                >
                  Cost
                </TableSortLabel>
              </TableCell>
              <TableCell align='right'>
                <TableSortLabel
                  active={orderBy === "Conversion"}
                  direction={orderBy === "Conversion" ? order : "asc"}
                  onClick={() => handleSortRequest("Conversion")}
                >
                  Conversion
                </TableSortLabel>
              </TableCell>
              <TableCell align='right'>
                <TableSortLabel
                  active={orderBy === "Revenue"}
                  direction={orderBy === "Revenue" ? order : "asc"}
                  onClick={() => handleSortRequest("Revenue")}
                >
                  Revenue
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row) => (
              <TableRow
                key={row.Campaign}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row.Campaign}
                </TableCell>
                <TableCell align='right'>{row.Clicks}</TableCell>
                <TableCell align='right'>USD {row.Cost}</TableCell>
                <TableCell align='right'>{row.Conversion}</TableCell>
                <TableCell align='right'>USD {row.Revenue}</TableCell>
              </TableRow>
            ))}
            <TableRow sx={{ backgroundColor: "rgb(220, 220, 220 , 0.5)" }}>
              <TableCell component='th' scope='row'>
                {totals.Campaign}
              </TableCell>
              <TableCell align='right'>{totals.Clicks}</TableCell>
              <TableCell align='right'>USD {totals.Cost}</TableCell>
              <TableCell align='right'>{totals.Conversion}</TableCell>
              <TableCell align='right'> USD{totals.Revenue}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
