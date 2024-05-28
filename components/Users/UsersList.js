import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { format } from "date-fns";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin7Fill } from "react-icons/ri";

import axios from "axios";

export default function UserList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("/api/users")
      .then((response) => {
        console.log("Data", response);
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const editRecord = (row) => {
    console.log("Row", row);
  };

  const deleteRecord = (row) => {
    console.log("Row", row);
  };

  const dateFormatter = (dateString) => {
    const parsedData = new Date(dateString);
    return format(parsedData, "MMMM d, yyy h:mm a");
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="right" style={{ minWidth: 70 }}>
                ID
              </TableCell>
              <TableCell align="right" style={{ minWidth: 170 }}>
                Name
              </TableCell>
              <TableCell align="right" style={{ minWidth: 170 }}>
                Email
              </TableCell>
              <TableCell align="right" style={{ minWidth: 170 }}>
                Type
              </TableCell>
              <TableCell align="right" style={{ minWidth: 170 }}>
                Create_At
              </TableCell>
              <TableCell align="center" style={{ minWidth: 170 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableCell key={index} align="right">
                      {row.id}
                    </TableCell>
                    <TableCell key={index} align="right">
                      {row.name}
                    </TableCell>
                    <TableCell key={index} align="right">
                      {row.email}
                    </TableCell>
                    <TableCell key={index} align="right">
                      {row.type}
                    </TableCell>
                    <TableCell key={index} align="right">
                      {dateFormatter(row.created_at)}
                    </TableCell>
                    <TableCell key={index} align="right">
                      <div className="flex justify-center space-x-3">
                        <div
                          className="cursor-pointer bg-green-600 text-white rounded-full p-2 flex items-center justify-center w-8 h-8"
                          onClick={() => editRecord(row)}
                        >
                          <FaEdit />
                        </div>
                        <div
                          className="cursor-pointer bg-red-600 text-white rounded-full p-2 flex items-center justify-center w-8 h-8"
                          onClick={() => deleteRecord(row)}
                        >
                          <RiDeleteBin7Fill />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
