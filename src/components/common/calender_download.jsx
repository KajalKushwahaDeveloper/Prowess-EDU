// import { Calendar } from "primereact/calendar";
import Calender from "../atoms/dropdown";
import  Button  from "../atoms/button";
import  Dropdown  from "../atoms/dropdown";

const Calender_Download_Component = () => {
  return (
    // <>
    //   <div>
    //     <Calender />
    //   </div>
    // </>

    <div className="p-fluid p-m-4">
        {/* Header */}
        <div className="p-col-12 p-md-3">
          <h2>Student Report</h2>
        </div>

      <div className="p-grid p-align-center">
        {/* Dropdown for Teacher Selection */}
        <div className="p-col-12 p-md-3">
          <Dropdown  />
        </div>

        {/* Calendar Input */}
        <div className="p-col-12 p-md-3">
            <Calender />
        </div>

        {/* Download Button */}
        <div className="p-col-12 p-md-1 p-d-flex p-jc-center">
          <Button icon="pi pi-download" className="p-button-primary" />
        </div>
      </div>
      <hr/>
    </div>
  );
};

export default Calender_Download_Component;
