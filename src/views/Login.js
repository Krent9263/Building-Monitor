import React, { useState } from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import SDC from "../assets/images/SDC.png";

const LoginForm = () => {
  const [email, setEmail] = useState("@deped.com.ph");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "example@deped.com" && password === "password") {
      alert("Login successful!");
    } else {
      alert("Invalid email or password");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container fluid className="login">
      <div className="login-form">
        <Row>
          <div className="img-holder mt-3">
            <img src={SDC} alt="" className="img-sdc" />
          </div>
          <div className="text-center lgn-txt">
            <p>Login</p>
          </div>
          <Form onSubmit={handleSubmit}>
            <div className="form-holder">
              <Form.Label>EMAIL</Form.Label>
              <Form.Control
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
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
