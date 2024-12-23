import "primeicons/primeicons.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "primeicons/primeicons.css";
// import Dashboard from "./Dashboard";

function Header({ isOpen, toggleSidebar }) {
  const user = JSON.parse(localStorage.getItem("data"));
  console.log("userName:", user.name);
  
  return (
    <div>

      <div className="w-full h-[90px] bg-white flex flex-row justify-between shadow-lg shadow-zinc-200 fixed top-0 z-50">
        <div className="flex items-center justify-start">
          <div className="flex justify-between items-center p-4 md:hidden">
            <button
              onClick={toggleSidebar}
              className="text-black text-2xl focus:outline-none"
            >
              <i className={`pi ${isOpen ? "pi-times" : "pi-bars"}`}></i>
            </button>
          </div>
          <div className=" pt-5 pl-4">
            <img src={logo} className="w-12" />
          </div>
        </div>
        <div className="flex mr-4 mt-3">
          <Link to="">
            <i className="pi pi-bell mx-5 pt-5 text-xl"></i>
          </Link>

          <div className="w-10 h-10 border-[2px] border-black rounded-full  mx-5 mt-3 pt-5 flex items-center justify-center ">
            <Link to="">
              <i className="pi pi-user text-2xl mb-3"></i>
            </Link>
          </div>

          <div className="pt-3  md:block">
            <h1 className="text-lg font-semibold">{user.name}</h1>
            
            <p className="text-zinc-500 text-xs">Master admin</p>
          </div>
        </div>
      </div>
      {/* <Dashboard /> */}
    </div>
  );
}

export default Header;
