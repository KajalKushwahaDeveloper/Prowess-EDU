import ParentDashboardStudentReportTable from "../../components/organisms/tables/parentdashboardStudentsReportTable";
import Button from "../../components/atoms/button";
import { Icons } from "../../assets/icons";
import Dropdown from "../../components/molecules/dropdown";
import Calender from "../../components/atoms/calender";

function ParentDashboard() {

    return (
        <div className="admin-dashboard m-6 dashboard z-1">
            <div className="my-4">
                <div className="flex justify-between md:items-center items-start md:flex-row flex-col">
                    <div><h2 className="font-bold text-3xl md:text-2xl">Student Report</h2></div>
                    <div className="flex justify-evenly items-center space-x-4"> {/* Added space-x-4 for spacing */}
                        <div className="flex flex-col justify-evenly items-center"> {/* Add flex-col to ensure label is on top */}
                            <Dropdown label="Teacher"/>
                        </div>
                        <div className="flex justify-around items-center">
                        <Calender />
                        <Button
                            icon={Icons.downloadIcon}
                        // onClick={handleDownload}
                        />
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div>
                <div className="md:overflow-none overflow-x-auto mb-16">
                    <ParentDashboardStudentReportTable />
                </div>
            </div>
        </div>
    );
}

export default ParentDashboard;
