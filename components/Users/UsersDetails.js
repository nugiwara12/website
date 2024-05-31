import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import axios from "axios";

const schema = yup
  .object({
    name: yup.string().required("Please Enter Your Name"),
    email: yup.string().email().required("Please Enter Yout Email"),
  })
  .required();

const UsersDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [urole, setUrole] = useState("User");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    Object.assign(data, { role: urole });
    console.log(data);

    axios.post("/api/users", data).then((response) => {
      console.log("Data", response);
      setData(response.data);
      setLoading(false);

      if (response.data.message === "success") {
        toast.success("Data Added Successfully!", {
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
    });
  };

  const handleChange = (event) => {
    setUrole(event.target.value);
  };

  return (
    <>
      <ToastContainer />
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
        <div class="flex justify-end mt-4">
          <Button type="submit" variant="outlined">
            Save
          </Button>
        </div>
      </form>
    </>
  );
};

export default UsersDetails;
