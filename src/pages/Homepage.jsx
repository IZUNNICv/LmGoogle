import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Layout from "../layout/Layout";
import LoginForm from "./auth/Login";

const Homepage = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};
export default Homepage;
