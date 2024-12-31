import { useState, useEffect } from "react";
// import Dropdown from "../../components/molecules/dropdown";
import Calender from "../../components/atoms/calender";
import Card from "../../components/molecules/Card";
import CompletedAssignmentsTable from "../../components/organisms/tables/completedAssignments";
import { Icons } from "../../assets/icons";
import DownloadAssignmentModal from "../../components/organisms/modals/downloadAssignmentModal";
import { getNewAssignForStudent } from "../../features/dashboardSharedApi/studentDashboardSharedApiReducer";
import { toast } from "react-toastify";
import { useDispatch , useSelector} from "react-redux";
import  Spinner  from "../../components/atoms/Loader"; // Assuming you have a Spinner component

const AssignmentAndTest = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [filteredAssignment, setFilteredAssignment] = useState([]);
    const dispatch = useDispatch();
    const studentClass = JSON.parse(localStorage.getItem("data"));

    console.log("filteredAssignment:", filteredAssignment.subject);
    const { error,loading } = useSelector(
        (state) => state.studentDashboardNewAssignSharedApi
      );
    useEffect(() => {
        // Fetch reports on mount
        dispatch(getNewAssignForStudent(`${studentClass?.Class}-${studentClass?.section}`))
            .unwrap()
            .then((response) => {
                setFilteredAssignment(response?.assignments || []);

            })
            .catch((error) => {
                toast.error(error || "Failed to fetch reports");

            });
        console.log("getAssign1") // Log the response to check its structure

    }, [dispatch]);

    const handleCardClick = (assignmentData) => {
        console.log("Clicked assignment data:", assignmentData); // Log the clicked data
        setSelectedChapter(assignmentData);
        setIsModalVisible(true);
    };


    return (
        <>
        {loading ? ( // Show loader while loading
            <div className="flex justify-center items-center h-45">
            <Spinner /> {/* Replace with your actual spinner component */}
          </div>
        ) : (
        <div className="admin-dashboard m-6 dashboard z-1">
            <div className="my-4">
                <div className="flex justify-between md:items-center items-start md:flex-row flex-col">
                    <h2 className="font-bold text-2xl">Assignment </h2>
                    <div className="flex justify-evenly items-center space-x-4">
                        {/* <Dropdown label="Teacher" /> */}
                        <Calender />
                    </div>
                </div>
            </div>
            <hr className="mb-6" />
            <div>
                <h2 className="font-bold text-xl mb-4">New Assignments</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {filteredAssignment.map((currentData, index) => (
                        <div key={index} onClick={() => handleCardClick(currentData)}>  {/* Pass the full data */}
                            <Card
                                cardHeading={currentData.subject}
                                totalNumber={`Chapter ${currentData.chapter}`}
                                cardStyle={{ backgroundColor: "#DFEEF7" }}
                                iconClass={Icons.viewIcon}
                            />
                        </div>
                    ))}

                </div>
            </div>
      
            <hr className="my-6" />
            <div>
                <CompletedAssignmentsTable filteredAssignment={filteredAssignment} />
            </div>

            {/* Assignment Modal */}

            <DownloadAssignmentModal
                visible={isModalVisible}
                setVisible={setIsModalVisible}
                newAssignment={selectedChapter}
            />
              </div>
              )}
              </>
    );
}

export default AssignmentAndTest;
