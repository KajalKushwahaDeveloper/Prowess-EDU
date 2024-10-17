import { useState } from "react";
import { useOutlet } from "react-router-dom";
import Header from "../organisms/Header"; // Header component
import DashboardSidebar from "../organisms/sideBar"; // Sidebar component
import { adminLinks, studentLinks, teacherLinks } from "../../assets/icons";

const SharedLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
  const outlet = useOutlet(); // Returns the child route element
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const links = adminLinks;
//   let links;
//   switch (userRole) {
//     case "admin":
//       links = adminLinks;
//       break;
//     case "student":
//       links = studentLinks;
//       break;
//     case "teacher":
//       links = teacherLinks;
//       break;
//     default:
//       links = []; // No links for unknown roles
//   }
  return (
    <div className="layout">
          <Header isOpen={isOpen} toggleSidebar={toggleSidebar}  setIsOpen={setIsOpen}/>
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
