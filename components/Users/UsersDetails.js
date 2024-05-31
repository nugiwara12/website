import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const schema = yup
  .object({
    name: yup.string().required("Please Enter Your Name"),
    email: yup.string().email().required("Please Enter Your Email"),
  })
  .required();

const UsersDetails = ({ handleAddUserClose, rows }) => {
  const [urole, setUrole] = useState("User");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (rows) {
      setUrole(rows.role);
      reset({
        id: rows.id,
        name: rows.name,
        email: rows.email,
      });
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      data.role = urole; // Assign the selected role to the data
      console.log("Submitted Data:", data);

      if (rows) {
        const response = await axios.put("/api/users", data);
        console.log("Response Data:", response);

        if (response.data.message === "success") {
          toast.success("Data Updated Successfully!", {
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
          handleAddUserClose(); // Close the add user dialog
        } else {
          toast.error("Failed to add data.", {
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
      } else {
        const response = await axios.post("/api/users", data);
        console.log("Response Data:", response);

        if (response.data.message === "success") {
          toast.success("Data Added!", {
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
          handleAddUserClose(); // Close the add user dialog
        } else {
          toast.error("Failed to add data.", {
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
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while adding data.", {
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

  const handleChange = (event) => {
    setUrole(event.target.value);
  };

  return (
    <>
      <div className="flex items-center mb-4">
        <ArrowBackIcon
          className="cursor-pointer text-blue-500 hover:text-blue-700 mr-2"
          onClick={() => handleAddUserClose()}
        />
        <h1 className="text-md font-bold text-gray-800">Add Users</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <TextField
              fullWidth
              size="small"
              label="Name"
              {...register("name")}
              variant="outlined"
            />
            <p className="text-red-500 text-md ml-1 mt-2">
              {errors.name?.message}
            </p>
          </div>
          <div>
            <TextField
              fullWidth
              size="small"
              label="Email"
              {...register("email")}
              variant="outlined"
            />
            <p className="text-red-500 text-md ml-1 mt-2">
              {errors.email?.message}
            </p>
          </div>
          <div>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                size="small"
                value={urole}
                label="Role"
                onChange={handleChange}
              >
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Visitors">Visitors</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button type="submit" variant="outlined">
            Save
          </Button>
        </div>
      </form>
    </>
  );
};

export default UsersDetails;
