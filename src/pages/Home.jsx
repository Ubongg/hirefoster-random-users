import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "country", label: "Country", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "phone", label: "Phone", minWidth: 170 },
];

const Home = () => {
  const { users } = useSelector((store) => store.users);

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
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "100vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="left"
                  style={{
                    minWidth: column.minWidth,
                    // background: "skyblue",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    color: "#0066b2",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.results &&
              users.results
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={user.login.uuid}
                    >
                      <TableCell align="left">
                        <Link
                          to={`/users/${user.login.uuid}`}
                          style={{
                            textDecoration: "none",
                            color: "black",
                          }}
                        >{`${user.name.first} ${user.name.last}`}</Link>
                      </TableCell>
                      <TableCell align="left">
                        {user.location.country}
                      </TableCell>
                      <TableCell align="left">{user.email}</TableCell>
                      <TableCell align="left">{user.phone}</TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={users.results ? users.results.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Home;
