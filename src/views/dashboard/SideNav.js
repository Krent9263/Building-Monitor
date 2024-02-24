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
      path: "/divisions",
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
    }
  ];

  const handleItemClick = (path) => {
    history.push(path); // Navigate to the specified path
  };

  const handleDivisionClick = (path) => {
    setShowSubmenu(!showSubmenu); // Toggle the visibility of submenu
  };

  return (
    <div className="side-nav">
      {superAdmin.map((item, index) => (
        <div key={index} className="titles" onClick={() => handleDivisionClick(item.path)}>
          {item.name}
          {showSubmenu && item.submenu && (
            <div className="submenu">
              {item.submenu.map((subItem, subIndex) => (
                <div key={subIndex}>
                  <Link to={subItem.path} onClick={() => handleItemClick(subItem.path)}>
                    {subItem.name}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
