import { useState } from "react";
import { Link } from "react-router-dom";

function DashboardSidebar({ links = [] }) {
  console.log("links:", links.path);

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className=''>
        <div className="flex justify-between items-center p-4 md:hidden">
          <button onClick={toggleSidebar} className="text-black text-2xl focus:outline-none">
            <i className={`pi ${isOpen ? '' : 'pi-bars'}`}></i>
          </button>
        </div>

        <div
          className={`flex flex-col fixed inset-y-0 left-0 top-[90px] bg-[#004871] w-[250px] transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
        >
          <div className="flex justify-end md:hidden p-4">
            <button onClick={toggleSidebar} className="text-white text-2xl focus:outline-none">
              <i className="pi pi-times"></i>
            </button>
          </div>

          <nav className="flex flex-col h-screen justify-between text-white text-xl">
            {/* Render Links */}
            <div className="flex flex-col gap-3 mt-4">
              {links.map((link, index) => {
                console.log("linkkkk",link.path); // Log the path here
                return (
                  <Link key={index} to={link.path} className="hover:bg-[#0069A4] hover:text-white duration-300 p-3">
                    <i className={`pi ${link.icon} mx-5`}></i>{link.name}
                  </Link>
                );
              })}
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
    </>
  );
}

export default DashboardSidebar;
