import '../assets/index.scss';
import React, { useEffect, useState } from "react";
import {Button } from "react-bootstrap";


function Home() {


  const logout = async () => {
    await window.localStorage.clear()
    window.location.href = "/";
  }

  return (
    <div className=''>HARU
      <Button   onClick={logout} >
        Logout
      </Button>
    </div>


  );
}

export default Home;