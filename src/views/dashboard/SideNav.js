import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function SideNav() {
  const history = useHistory();
  const [showSubmenu, setShowSubmenu] = useState(false);

  const superAdmin = [
    {
      path: "/home",
      name: "Dashboard",
    },
    {
      name: "Division",
      submenu: [
        {
          path: "/department1",
          name: "Department 1",
        },
        {
          path: "/department2",
          name: "Department 2",
        },
      ],
    },
    {
      path: "/home",
      name: "Reports",
    },
  ];

  const handleItemClick = (path) => {
    history.push(path);
  };

  const handleDivisionClick = (path) => {
    setShowSubmenu(!showSubmenu);
  };

  return (
    <div className="side-nav">
      {superAdmin.map((item, index) => (
        <Link key={index} className="titles">
          {item.name}
          {showSubmenu && item.submenu && (
            <div className="submenu">
              {item.submenu.map((subItem, subIndex) => (
                <div key={subIndex}>
                  <Link to={subItem.path}>{subItem.name}</Link>
                </div>
              ))}
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}
