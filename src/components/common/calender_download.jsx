

import Button from "../atoms/button";
import { Icons } from "../../assets/icons";
import Dropdown from "../atoms/dropdown";
import Calender from "../atoms/calender";


const Calender_Download_Component = () => {


  return (
    <>
      <div className="flex justify-between shadow-lg items-center ">
        <h2 className="font-bold text-3xl">Student Report</h2>
         {/* <h2 className="font-bold ">{parentDashboardHeading}</h2> */}
        <div className="flex justify-evenly items-center">
          <Dropdown />

          <Calender />
          <Button
            icon={Icons.downloadIcon}
          // onClick={handleDownload}
          />
        </div>
      </div>
    </>
  );
}



export default Calender_Download_Component;
