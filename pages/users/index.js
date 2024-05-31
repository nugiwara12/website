import React, { useState } from "react";
import Layout from "../../components/Layout";
import UsersList from "../../components/Users/UsersList";

const Users = () => {
  return (
    <>
      <Layout>
        <UsersList />
      </Layout>
    </>
  );
};

export default Users;
