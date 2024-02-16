import "../assets/index.scss";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Header from "./Components/Header";

function Home() {

  return (
    <Container fluid className="dashboard">
      <div class="grid-container">
        <div class="item1">
          <Header />
        </div>
        <div class="item2">Menu</div>
        <div class="item3">Main</div>
        <div class="item4">Right</div>
      </div>

      
    </Container>
  );
}

export default Home;
