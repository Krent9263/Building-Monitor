import React from "react";
import Routes from "../src/routes/Routes";
import UserContextProvider from "./context/UserContext";
import { ToastContainer } from 'react-toastify';



export default function App() {
  return (
    <UserContextProvider >
    <Routes/>
    <ToastContainer />
  </UserContextProvider>
  );
}
