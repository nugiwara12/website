import React from "react";
import Layout from "../../components/Layout";
import UsersList from "../../components/Users/UsersList";

const Users = () => {
  return (
    <>
      <Layout>
        <h1 className="font-bold mb-4">Users</h1>

        <UsersList />
      </Layout>
    </>
  );
};

export default Users;
