import { useState, useEffect } from "react";
// import Dropdown from "../../components/molecules/dropdown";
import Calender from "../../components/atoms/calender";
import Card from "../../components/molecules/Card";
import { Icons } from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { getNewTestForStudent } from "../../features/dashboardSharedApi/studentDashboardSharedApiReducer";
import { toast } from "react-toastify";
import CompletedTestTable from "../../components/organisms/tables/completeTestTable";
import DownloadTestModal from "../../components/organisms/modals/downloadTestModal";
import  Spinner  from "../../components/atoms/Loader"; // Assuming you have a Spinner component

const StudentDashboardTest = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null); // Store the specific test data
    const [filteredTest, setFilteredTest] = useState([]);
    const dispatch = useDispatch();
    const studentClass = JSON.parse(localStorage.getItem("data"));
    const { videoData, loading, error } = useSelector(
        (state) => state.studentDashboardNewAssignSharedApi
      );
    useEffect(() => {
        // Fetch reports on mount
        dispatch(getNewTestForStudent(`${studentClass?.Class}-${studentClass?.section}`))
            .unwrap()
            .then((response) => {
                setFilteredTest(response?.tests || []);
            })
            .catch((error) => {
                toast.error(error || "Failed to fetch reports");
            });
    }, [dispatch]);

    const handleCardClick = (test) => {
        setSelectedTest(test); // Store the specific test data
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
                    <h2 className="font-bold text-2xl">Test</h2>
                    <div className="flex justify-evenly items-center space-x-4">
                        {/* <Dropdown label="Teacher" /> */}
                        <Calender />
                    </div>
                </div>
            </div>
            <hr className="mb-6" />
            <div>
                <h2 className="font-bold text-xl mb-4">New Tests</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {filteredTest.map((currentData, index) => (
                        <div key={index} onClick={() => handleCardClick(currentData)}>
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
                testData={selectedTest} // Pass the specific test data
            />
        </div>
        )}
        </>
    );
};

export default StudentDashboardTest;
