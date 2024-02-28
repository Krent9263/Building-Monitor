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
import Divisions from "../views/division/Divisions";
import Offices from "../views/office/Offices";
import Qrcodegen from "../views/QRCODE/Qrcodegen";
import Employee from "../views/employee/Employee";
import Reports from "../views/reports/Reports";

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
            <PrivateRoute path="/divisions" exact component={Divisions} />
            <PrivateRoute path="/divisions/:divisionId/office/" exact component={Offices} />
            <PrivateRoute path="/divisions/:divisionId/office/:officeId/employee" exact component={Employee} />
            <PrivateRoute path="/office/:divisionId" exact component={Offices} />
            <PrivateRoute path="/divisions/office/employees" exact component={Employee} />
            <PrivateRoute path="/reports" exact component={Reports} />
            <PrivateRoute path="/qrcode" exact component={Qrcodegen}/>
          </Switch>
        )}
      </Router>
    </div>
  );
}
