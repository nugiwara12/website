import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { format } from "date-fns";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ToastContainer, toast, Bounce } from "react-toastify";
import UsersDetails from "./UsersDetails";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { confirmAlert } from "react-confirm-alert"; // Import

import axios from "axios";

export default function UserList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [data, setData] = useState([]);
  const [alldata, setAllData] = useState([]);
  const [rows, setRows] = useState(null);

  const [loading, setLoading] = useState(true);
  const [addUser, setAddUser] = useState(false);
  const handleAddUserClose = () => {
    setAddUser(false);
  };
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getData();
  }, [addUser]);

  useEffect(() => {
    searchData(searchQuery);
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  const searchData = (searchQuery) => {
    let filterData = data;
    if (searchQuery) {
      filterData = data.filter(
        (usr) =>
          usr.id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
          usr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          usr.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          usr.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setData(filterData);
    } else {
      setData(alldata);
    }
  };

  const getData = () => {
    axios
      .get("/api/users")
      .then((response) => {
        console.log("Data", response);
        setData(response.data);
        setAllData(response.data);
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
    setRows(row);
    setAddUser(true);
  };

  const addRecord = (row) => {
    setRows(null);
    setAddUser(true);
  };

  const deleteRecord = async (row) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure you want to delete this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteRow(row),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const deleteRow = async (row) => {
    try {
      console.log("row", row);
      const config = {
        method: "delete",
        url: `/api/users?id=${row.id}`, // Pass ID as a query parameter
      };

      const response = await axios.request(config);
      console.log("Data", response.data);
      toast.success("Data Deleted!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      getData(); // Refresh data after deletion
    } catch (err) {
      console.error("Error", err);
      toast.error("Failed To Delete Data.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const dateFormatter = (dateString) => {
    const parsedData = new Date(dateString);
    return format(parsedData, "MMMM d, yyy h:mm a");
  };

  return (
    <>
      <ToastContainer />
      {addUser ? (
        <UsersDetails handleAddUserClose={handleAddUserClose} rows={rows} />
      ) : (
        <>
          {" "}
          <h1 className="font-bold mb-4">Users</h1>
          <div className="flex justify-between mb-2">
            <div className="relative flex items-center w-2xl h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
              <div className="grid place-items-center h-full w-12 text-gray-300">
                <PersonSearchIcon />
              </div>
              <input
                className="peer h-full w-full outline-none text-sm text-gray-700 pr-10"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search something.."
              />
              {searchQuery && (
                <button
                  className="absolute right-2 grid place-items-center h-full w-8 text-gray-400 hover:text-gray-600"
                  onClick={clearSearch}
                >
                  ✕
                </button>
              )}
            </div>

            <Button
              variant="outlined"
              onClick={() => addRecord()}
              startIcon={<AddCircleIcon />}
            >
              Add User
            </Button>
          </div>
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
                      Role
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
                    .map((row) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell align="right">{row.id}</TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.email}</TableCell>
                        <TableCell align="right">{row.role}</TableCell>
                        <TableCell align="right">
                          {dateFormatter(row.created_at)}
                        </TableCell>
                        <TableCell align="right">
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
                    ))}
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
        </>
      )}
    </>
  );
}
