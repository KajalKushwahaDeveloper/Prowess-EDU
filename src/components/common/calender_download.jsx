

import Button from "../atoms/button";
import { Icons } from "../../assets/icons";
import Dropdown from "../molecules/dropdown";
import Calender from "../atoms/calender";


const Calender_Download_Component = () => {


  return (
    <>
      <div className="flex justify-between items-center ">
        <h2 className="font-bold text-3xl">Student Report</h2>
        <div className="flex justify-evenly items-center space-x-4"> {/* Added space-x-4 for spacing */}
          <div className="flex flex-col"> {/* Add flex-col to ensure label is on top */}
            <Dropdown label="Select Teacher" />
          </div>
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
