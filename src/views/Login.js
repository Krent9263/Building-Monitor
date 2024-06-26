import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import SDC from "../assets/images/SDC.png";
import { UserContext } from "../context/UserContext";
import Auth from "../api/Auth";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [username, setUsername] = useState("","deped.com.ph");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const userContext = useContext(UserContext);
  const { user, refreshUser } = userContext.data;

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    const response = await new Auth().login(data);
    if (response.ok) {
      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("userAccountId", response?.data?.userAccountId);
      localStorage.setItem("firstName", response?.data?.firstName);
      localStorage.setItem("roleId", response?.data?.roleId);
      refreshUser();
    } else {
      toast.error("Invalid credentials");
    }
  };

  console.log("user:", user);

  return (
    <Container fluid className="login">
      <div className="login-form">
        <Row>
          <div className="img-holder mt-5">
            <img src={SDC} alt="" className="img-sdc" />
          </div>
          {/* <div className="lgn-txt">
            <p>Login</p>
          </div> */}
          <Form onSubmit={handleLogin} className="mt-4">
            <div className="form-holder">
              <Form.Label>USERNAME</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={username}
                onChange={handleEmailChange}
              />

              <Form.Label className="mt-3">PASSWORD</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={handlePasswordChange}
              />
              <Form.Check
                type="checkbox"
                label="Show Password"
                onChange={() => setShowPassword(!showPassword)}
              />
            </div>
            <div className="btn-holder">
              <Button type="submit" className="login-btn">
                Login
              </Button>
            </div>
          </Form>
        </Row>
      </div>
    </Container>
  );
};

export default LoginForm;
