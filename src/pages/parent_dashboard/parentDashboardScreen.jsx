import Button from "../../components/atoms/button";
import { Icons } from "../../assets/icons";
import Calender from "../../components/atoms/calender";
import { useState, useEffect } from "react";
import { getChildReportsForParent } from "../../features/dashboardSharedApi/parentDashboardReducer";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ParentDashboardStudentReportTable from "../../components/organisms/tables/parentdashboardStudentsReportTable";
import { useDownloadCsv } from "../../hooks/useDownload";


const ParentDashboard = () => {
    const [filteredFeedback, setFilteredFeedback] = useState([]);
    const dispatch = useDispatch();
    const downloadCsv = useDownloadCsv();

    // const studentClass = JSON.parse(localStorage.getItem("data"));
    //  console.log("filteredFeedback:", filteredFeedback)

    // const { error, loading } = useSelector(
    //     (state) => state.studentDashboardFaqSharedApi
    //   );
  
    useEffect(() => {
        // Fetch reports on mount
        dispatch(getChildReportsForParent())
            .unwrap()
            .then((response) => {
                setFilteredFeedback(response?.reports || []);

            })
            .catch((error) => {
                toast.error(error || "Failed to fetch reports");

            });
        console.log("getAssign1") // Log the response to check its structure

    }, [dispatch]);

    return (
        <div className="admin-dashboard m-6 dashboard z-1">
            <div className="my-4">
                <div className="flex justify-between md:items-center items-start md:flex-row flex-col">
                    <div>
                        <h2 className="font-bold text-2xl">Student Report</h2>
                    </div>
                    <div className="flex justify-evenly items-center space-x-4"> {/* Added space-x-4 for spacing */}
                        <div className="flex flex-col justify-evenly items-center"> {/* Add flex-col to ensure label is on top */}
                            {/* <Dropdown label="Teacher" /> */}
                        </div>
                        <div className="flex justify-around items-center">
                            {/* <Calender /> */}
                            <Button
                                icon={Icons.downloadIcon}
                                onClick={() => downloadCsv(filteredFeedback, "student_reports.csv")}
                                />
                        </div>
                    </div>
                </div>
            </div>
            <hr className="mb-4"/>
            <div>
                <div className="md:overflow-none overflow-x-auto mb-16">
                    <ParentDashboardStudentReportTable filteredFeedback={filteredFeedback}/>
                </div>
            </div>
        </div>
    );
}

export default ParentDashboard;
