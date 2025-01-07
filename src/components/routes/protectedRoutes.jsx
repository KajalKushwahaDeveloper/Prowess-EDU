import { useState } from "react";
import { useOutlet } from "react-router-dom";
import Header from "../organisms/Header"; // Header component
import DashboardSidebar from "../organisms/sideBar"; // Sidebar component
import {
  adminLinks,
  studentLinks,
  teacherLinks,
  parentLinks,
} from "../../assets/icons";

const SharedLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const outlet = useOutlet(); // Returns the child route element

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const userData = JSON.parse(localStorage.getItem("data"));
  const userRole = userData?.type; // Get the type from user data
  
  let links;
  
  switch (userRole) {
    case 1: // student
      links = studentLinks;
      break;
    case 2: // parent
      links = parentLinks;
      break;
    case 3: // teacher
      links = teacherLinks;
      break;
    case 4: // admin
      links = adminLinks;
      break;
    default:
      links = []; // No links for unknown types
  }
  
  console.log("Selected links:", links); // For debugging
  
  return (
    <div className="layout">
      <Header
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        setIsOpen={setIsOpen}
      />
      <div className="main-content">
        <DashboardSidebar links={links} />
        <div className="content">
          {outlet} {/* Render the matched child route */}
        </div>
      </div>
    </div>
  );
};

export default SharedLayout;
