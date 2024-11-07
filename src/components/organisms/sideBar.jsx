import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";  // Import your Header component

function DashboardSidebar({ links = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Pass isOpen and toggleSidebar to Header */}
      <Header isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex flex-col fixed inset-y-0 left-0 top-[90px] bg-[#004871] w-[250px] transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        {/* <div className="flex justify-end md:hidden p-4">
          <button onClick={toggleSidebar} className="text-black text-2xl focus:outline-none">
            <i className="pi pi-times"></i>
          </button>
        </div> */}

        <nav className="flex flex-col h-screen justify-between text-white text-lg">
          {/* Render Links */}
          <div className="flex flex-col gap-3 mt-4">
            {links.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="hover:bg-[#0069A4] hover:text-white duration-300 py-3 "
              >
                <i className={`pi ${link.icon} mx-3`}></i>{link.name}
              </Link>
            ))}
          </div>

          {/* Logout */}
          <div className="hover:bg-[#0069A4] hover:text-white duration-300 py-3">
            <Link to="/logout">
              <i className="pi pi-sign-out mx-5"></i>Log out
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default DashboardSidebar;