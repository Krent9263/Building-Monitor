import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "../views/Login";
import Home from "../views/Home";
import AuthRoute from "../routes/components/AuthRoute";
import PrivateRoute from "../routes/components/PrivateRoute";
import QRScreen from "../views/QRScreen";
import Reports from "../views/Reports";

export default function Routing() {
  // const [loading, setLoading] = useState(false)
  const userContext = useContext(UserContext);
  const { refreshUser, user, loading } = userContext.data;

  useEffect(() => {
    refreshUser();
  }, []);

  console.log("user:", user);

  return (
    <div className="content">
      <Router>
        {loading ? (
          <></>
        ) : (
          <Switch>
            <AuthRoute path="/" exact component={Login} />
            <PrivateRoute path="/home" exact component={Home} />
            <PrivateRoute path="/qrscreen" exact component={QRScreen} />
            <PrivateRoute path="/reports" exact component={Reports} />
          </Switch>
        )}
      </Router>
    </div>
  );
}
