// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Users from "../components/Users";
// import { getUsers } from "../features/user/userSlice";

// const Home = () => {
//   const { users } = useSelector((store) => store.users);
//   const dispatch = useDispatch();
//   const usersPerPage = 10;

//   // State to track the current page
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     // Check if data is in local storage
//     const cachedData = localStorage.getItem("cachedUsers");

//     if (cachedData) {
//       // Parse cached data and set it in the Redux store
//       dispatch(getUsers(JSON.parse(cachedData)));
//     } else {
//       // If not in local storage, fetch new users and store them
//       dispatch(getUsers());
//     }
//   }, [dispatch]);

//   // Function to handle the "Next" button click
//   const nextPage = () => {
//     if (users.results) {
//       const nextPageUsers = users.results.slice(
//         currentPage * usersPerPage,
//         (currentPage + 1) * usersPerPage
//       );
//       if (nextPageUsers.length > 0) {
//         setCurrentPage(currentPage + 1);
//       }
//     }
//   };

//   // Function to handle the "Previous" button click
//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;

//   return (
//     <div className="home">
//       <div className="pagination">
//         <button onClick={prevPage} disabled={currentPage === 1}>
//           Previous
//         </button>
//         <span>{`Page ${currentPage} of ${Math.ceil(
//           users.results ? users.results.length / usersPerPage : 0
//         )}`}</span>
//         <button
//           onClick={nextPage}
//           disabled={
//             indexOfLastUser >= (users.results ? users.results.length : 0)
//           }
//         >
//           Next
//         </button>
//       </div>
//       {users.results && (
//         <Users users={users.results.slice(indexOfFirstUser, indexOfLastUser)} />
//       )}
//     </div>
//   );
// };

// export default Home;

// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Users from "../components/Users";
// import { getUsers } from "../features/user/userSlice";

// const Home = () => {
//   const { users } = useSelector((store) => store.users);
//   const dispatch = useDispatch();
//   const usersPerPage = 10;

//   // State to track the current page
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     // Check if data is in local storage
//     const cachedData = localStorage.getItem("cachedUsers");

//     if (cachedData) {
//       // Parse cached data and set it in the Redux store
//       dispatch(getUsers(JSON.parse(cachedData)));
//     } else {
//       // If not in local storage, fetch new users and store them
//       dispatch(getUsers());
//     }
//   }, [dispatch]);

//   // Function to handle the "Next" button click
//   const nextPage = () => {
//     if (users.results) {
//       const nextPageUsers = users.results.slice(
//         currentPage * usersPerPage,
//         (currentPage + 1) * usersPerPage
//       );
//       if (nextPageUsers.length > 0) {
//         setCurrentPage(currentPage + 1);
//       }
//     }
//   };

//   // Function to handle the "Previous" button click
//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;

//   return (
//     <div className="home">
//       <div className="pagination">
//         <button onClick={prevPage} disabled={currentPage === 1}>
//           Previous
//         </button>
//         <span>{`Page ${currentPage} of ${Math.ceil(
//           users.results ? users.results.length / usersPerPage : 0
//         )}`}</span>
//         <button
//           onClick={nextPage}
//           disabled={
//             indexOfLastUser >= (users.results ? users.results.length : 0)
//           }
//         >
//           Next
//         </button>
//       </div>
//       {users.results && (
//         <Users users={users.results.slice(indexOfFirstUser, indexOfLastUser)} />
//       )}
//     </div>
//   );
// };

// export default Home;

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
