import React from "react";
import { AppBar, Toolbar, Typography, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Card, Box, Stack } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";


function BookingDecision() {
  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "code", label: "Email", minWidth: 100 },
    {
      id: "population",
      label: "Pickup",
      minWidth: 170,
    },
    {
      id: "size",
      label: "Drop",
      minWidth: 170,
    },
    {
      id: "density",
      label: "Dual Trip",
      minWidth: 170,
    },
    {
      id: "density",
      label: "Number of People",
      minWidth: 170,
    },
    {
      id: "density",
      label: "Document",
      minWidth: 170,
    },
    {
      id: "density",
      label: "Action",
      minWidth: 170,
    },
  ];

  function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
  }

  const rows = [
    createData("India", "IN", 1324171354, 3287263),
    createData("China", "CN", 1403500365, 9596961),
    createData("Italy", "IT", 60483973, 301340),
    createData("United States", "US", 327167434, 9833520),
    createData("Canada", "CA", 37602103, 9984670),
    createData("Australia", "AU", 25475400, 7692024),
    createData("Germany", "DE", 83019200, 357578),
    createData("Ireland", "IE", 4857000, 70273),
    createData("Mexico", "MX", 126577691, 1972550),
    createData("Japan", "JP", 126317000, 377973),
    createData("France", "FR", 67022000, 640679),
    createData("United Kingdom", "GB", 67545757, 242495),
    createData("Russia", "RU", 146793744, 17098246),
    createData("Nigeria", "NG", 200962417, 923768),
    createData("Brazil", "BR", 210147125, 8515767),
  ];
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
 

  return (
    <>
      <h3 style={{color:'lightblue', textAlign : 'center'}}>Booking Requests</h3>
      <Paper sx={{ width: "90%" , borderStyle:'solid', borderColor:'lightblue', marginRight :'auto' , marginLeft : 'auto'}}>
        <TableContainer sx={{ maxHeight: 440}}>
          <Table stickyHeader aria-label="sticky table" >
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth , color:'lightblue', backgroundColor: '#121212' , fontWeight:'bolder'}}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody sx = {{ width : '80%'}}>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} style={{color:'white' , backgroundColor: '#121212'}}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{color:'lightblue', backgroundColor: '#121212'}}
        />
      </Paper>
    </>
  );
}
export default BookingDecision;
