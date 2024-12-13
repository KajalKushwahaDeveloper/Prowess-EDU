import { useState, useEffect } from "react";
import Dropdown from "../../components/molecules/dropdown";
import Calender from "../../components/atoms/calender";
import Card from "../../components/molecules/Card";
import CompletedClassesTable from "../../components/organisms/tables/completedClasses";
import { Icons } from "../../assets/icons";
import JoinClassModal from "../../components/organisms/modals/joinClassModal";
import { useDispatch } from "react-redux";
import { getOnlineClassesForStudent } from "../../features/dashboardSharedApi/studentDashboardSharedApiReducer";
import { toast } from "react-toastify";

const OnlineClass = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [onlineClass, setOnlineClass] = useState([]);
    const dispatch = useDispatch();
    const studentClass = JSON.parse(localStorage.getItem("data"));

    console.log("setSelectedChapter:", selectedChapter);

    useEffect(() => {
        // Fetch reports on mount
        dispatch(getOnlineClassesForStudent({ classId: `${studentClass?.Class}-${studentClass?.section}` }))
            .unwrap()
            .then((response) => {
                console.log("response:", response);
                setOnlineClass(response?.data?.onlineClasses || []);
            })
            .catch((error) => {
                toast.error(error || "Failed to fetch reports");
            });
    }, [dispatch]);

    // // Check and remove expired classes
    // useEffect(() => {
    //     console.log("HELLO");
        
    //     const interval = setInterval(() => {
    //         const currentTime = new Date(); // Get current time
    //         console.log("setInterval");
    
    //         const updatedClasses = onlineClass.filter((classData) => {
    //             // Parse date and time into a valid Date object
    //             const [day, month, year] = classData.date.split("-"); // Split date
    //             const [hours, minutes] = classData.time.split(":"); // Split time
    
    //             // Create a Date object for the class time
    //             const classTime = new Date(year, month - 1, day, hours, minutes);
    
    //             // Add 30 minutes to classTime
    //             const expiryTime = new Date(classTime.getTime() + 30 * 60000);
    //             console.log("classTime:", classTime);
    //             console.log("expiryTime:", expiryTime);
    //             console.log("currentTime:", currentTime);
                
    //             // Keep classes that have not expired
    //             return currentTime < expiryTime;
    //         });
    
    //         setOnlineClass(updatedClasses); // Update state with remaining classes
    //     }, 1000 * 60); // Check every minute
    
    //     return () => clearInterval(interval); // Cleanup interval on unmount
    // }, [onlineClass]);
    

    const handleCardClick = (classData) => {
        console.log("Clicked class data:", classData); // Debug log
        setSelectedChapter(classData); // Pass the clicked class data
        setIsModalVisible(true);
    };

    return (
        <div className="admin-dashboard m-6 dashboard z-1">
            <div className="my-4">
                <div className="flex justify-between md:items-center items-start md:flex-row flex-col">
                    <h2 className="font-bold text-xl md:text-2xl">Online Class</h2>
                    <div className="flex justify-evenly items-center space-x-4">
                        <Dropdown label="Teacher" />
                        <Calender />
                    </div>
                </div>
            </div>
            <hr className="mb-6" />
            <div>
                <h2 className="font-bold text-xl mb-4">Upcoming Classes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-6 md:gap-6 sm:gap-6">
                    {onlineClass.map((classData, index) => (
                        <div key={index} onClick={() => handleCardClick(classData)}>
                            <Card
                                cardHeading={classData.subject}
                                totalNumber={classData.chapter}
                                cardStyle={{ backgroundColor: "#DFEEF7" }}
                                iconClass={Icons.viewIcon}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <hr className="my-6" />
            <div>
                <h2 className="font-bold text-xl mb-8">Completed classes</h2>
                <CompletedClassesTable onlineClass={onlineClass} />
            </div>

            {/* Assignment Modal */}
            <JoinClassModal
                visible={isModalVisible}
                setVisible={setIsModalVisible}
                onlineClass={onlineClass}
                setOnlineClass={setOnlineClass}
                selectedClass={selectedChapter}
            />
        </div>
    );
};

export default OnlineClass;
