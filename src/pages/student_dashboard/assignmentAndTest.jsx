import { useState, useEffect } from "react";
import Dropdown from "../../components/molecules/dropdown";
import Calender from "../../components/atoms/calender";
import Card from "../../components/molecules/Card";
import CompletedAssignmentsTable from "../../components/organisms/tables/completedAssignments";
import { Icons } from "../../assets/icons";
import DownloadAssignmentModal from "../../components/organisms/modals/downloadAssignmentModal";
import { useDispatch } from "react-redux";
import { getNewAssignForStudent } from "../../features/dashboardSharedApi/studentDashboardSharedApiReducer";
import { toast } from "react-toastify";

const AssignmentAndTest = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [filteredAssignment, setFilteredAssignment] = useState([]);
    const dispatch = useDispatch();
    const studentClass = JSON.parse(localStorage.getItem("data"));

    console.log("filteredAssignment:", filteredAssignment.subject);

    useEffect(() => {
        // Fetch reports on mount
        console.log("getAssign") // Log the response to check its structure
        dispatch(getNewAssignForStudent(`${studentClass?.Class}-${studentClass?.section}`))
            .unwrap()
            .then((response) => {
                console.log("getAssign0:"); // Log the response to check its structure
                setFilteredAssignment(response?.assignments || []);
                console.log("getAssign2") // Log the response to check its structure

            })
            .catch((error) => {
                toast.error(error || "Failed to fetch reports");
                console.log("getAssignerror") // Log the response to check its structure

            });
        console.log("getAssign1") // Log the response to check its structure

    }, [dispatch]);

    const handleCardClick = (chapter) => {
        setSelectedChapter(chapter);
        setIsModalVisible(true);
    };

    return (
        <div className="admin-dashboard m-6 dashboard z-1">
            <div className="my-4">
                <div className="flex justify-between md:items-center items-start md:flex-row flex-col">
                    <h2 className="font-bold text-2xl">Assignment </h2>
                    <div className="flex justify-evenly items-center space-x-4">
                        <Dropdown label="Teacher" />
                        <Calender />
                    </div>
                </div>
            </div>
            <hr className="mb-6" />
            <div>
                <h2 className="font-bold text-xl mb-4">New Assignments</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ">
                    {filteredAssignment.map((currentData, index) => (
                        <div key={index} onClick={() => handleCardClick(currentData.chapter)}>
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
                filteredAssignment={filteredAssignment}
            />
        </div>
    );
}

export default AssignmentAndTest;
