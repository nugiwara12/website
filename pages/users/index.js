import React, { useState } from "react";
import Layout from "../../components/Layout";
import UsersList from "../../components/Users/UsersList";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UsersDetails from "../../components/Users/UsersDetails";

const Users = () => {
  const [addUser, setAddUser] = useState(false);
  return (
    <>
      <Layout>
        {addUser ? (
          <div className="p-4 bg-white shadow rounded-md">
            <div className="flex items-center mb-4">
              <ArrowBackIcon
                className="cursor-pointer text-blue-500 hover:text-blue-700 mr-2"
                onClick={() => setAddUser(false)}
              />
              <h1 className="text-md font-bold text-gray-800">Add Users</h1>
            </div>
            <UsersDetails />
          </div>
        ) : (
          <div>
            <div className="flex justify-between mb-2">
              <h1 className="font-bold mb-4">Users</h1>

              <Button
                variant="outlined"
                onClick={() => setAddUser(true)}
                startIcon={<AddCircleIcon />}
              >
                Add User
              </Button>
            </div>
            <UsersList />
          </div>
        )}
      </Layout>
    </>
  );
};

export default Users;
