import { useState, useEffect } from "react";
import Dropdown from "../../components/molecules/dropdown";
import Calender from "../../components/atoms/calender";
import Card from "../../components/molecules/Card";
import { Icons } from "../../assets/icons";
import { useDispatch } from "react-redux";
import { getNewTestForStudent } from "../../features/dashboardSharedApi/studentDashboardSharedApiReducer";
import { toast } from "react-toastify";
import CompletedTestTable from "../../components/organisms/tables/completeTestTable";
import DownloadTestModal from "../../components/organisms/modals/downloadTestModal";

const StudentDashboardTest = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [filteredTest, setFilteredTest] = useState([]);
    const dispatch = useDispatch();
    const studentClass = JSON.parse(localStorage.getItem("data"));

    console.log();

    useEffect(() => {
        // Fetch reports on mount
        console.log("getAssign") // Log the response to check its structure
        dispatch(getNewTestForStudent(studentClass?.Class))
            .unwrap()
            .then((response) => {
                setFilteredTest(response?.tests || []);
            })
            .catch((error) => {
                toast.error(error || "Failed to fetch reports");
            });

    }, [dispatch]);

    const handleCardClick = (chapter) => {
        setSelectedChapter(chapter);
        setIsModalVisible(true);
    };

    return (
        <div className="admin-dashboard m-6 dashboard z-1">
            <div className="my-4">
                <div className="flex justify-between md:items-center items-start md:flex-row flex-col">
                    <h2 className="font-bold text-2xl">Test</h2>
                    <div className="flex justify-evenly items-center space-x-4">
                        <Dropdown label="Teacher" />
                        <Calender />
                    </div>
                </div>
            </div>
            <hr className="mb-6" />
            <div>
                <h2 className="font-bold text-xl mb-4">New Tests</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ">
                    {filteredTest.map((currentData, index) => (
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
                <CompletedTestTable filteredTest={filteredTest} />
            </div>

            {/* Test Modal */}

            <DownloadTestModal
                visible={isModalVisible}
                setVisible={setIsModalVisible}
                newAssignment={selectedChapter}
                filteredTest={filteredTest}
            />
        </div>
    );
}

export default StudentDashboardTest;
