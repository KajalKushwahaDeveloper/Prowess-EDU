import { useState, useEffect } from "react";
import Card from "../../components/molecules/Card";
import CreateOnlineClassModal from "../../components/organisms/modals/createOnlineClassModal";
import PreviousClassesTable from "../../components/organisms/tables/previousClassesTable";
import { Icons } from "../../assets/icons";
import Button from "../../components/atoms/button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getOnlineClassesForTeacher } from "../../features/dashboardSharedApi/teacherDashboardSharedApiReducer";

const TeacherDashboardOnlineClass = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [onlineClass, setOnlineClass] = useState(null);
    const [modalMode, setModalMode] = useState("add");
    const [currentClass, setCurrentClass] = useState(null);
    const studentData = JSON.parse(localStorage.getItem("data"));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOnlineClassesForTeacher(studentData?.id))
            .unwrap()
            .then((response) => {
                setOnlineClass(response?.onlineClasses);
            })
            .catch(() => {
                toast.error("Failed to fetch questions");
            });
    }, [dispatch]);

    
    const handleAddClass = (chapter) => {
        console.log("Add class clicked", chapter); 
        setSelectedChapter(chapter);
        setIsModalVisible(true);
        setCurrentStudent(null);
    };

    return (
        <div className="admin-dashboard m-6 dashboard z-1">
            <div className="my-4">
                <div className="flex justify-between md:items-center items-start md:flex-row flex-col">
                    <h2 className="font-bold text-xl md:text-2xl">Online Classes</h2>
                    <div className="flex justify-evenly items-center space-x-4">
                        <Button
                            icon={Icons.plusIcon}
                            onClick={handleAddClass}
                            label="Create New class"
                        />
                    </div>
                </div>
            </div>
            <hr className="mb-6" />
            <div className="mt-8">
                <div className="flex justify-between md:items-center items-start md:flex-row flex-col ">
                    <h2 className="font-bold text-2xl">Upcoming Classes </h2>
                </div>

                <hr />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-6 md:gap-6 sm:gap-6">
                    {onlineClass?.map((currentData, index) => (
                        <div key={index} onClick={() => handleCardClick(currentData.chapter)}>
                            <Card
                                cardHeading={`${currentData.subject} ${currentData.Class}`}
                                totalNumber={`Chapter ${currentData.chapter} ${currentData.topic}`}
                                cardStyle={{ backgroundColor: "#EEDFF7" }}
                                iconClass={Icons.editIcon}
                                date_time={`${currentData.date} ${currentData.time}`}
                                totalNumberClass={currentData.totalNumberClass}
                                iconBorderClass={currentData.iconBorderClass}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="font-bold text-xl text-xl my-4">Previous Classes</h2>
                <hr className="mb-8" />
                <PreviousClassesTable onlineClass={onlineClass} setOnlineClass={setOnlineClass} setModalMode={setModalMode} modalMode={modalMode} setCurrentClass={setCurrentClass} setVisible={setIsModalVisible} currentClass={currentClass} />
            </div>

            {/* Assignment Modal */}

            <CreateOnlineClassModal
                visible={isModalVisible}
                setVisible={setIsModalVisible}
                newChapter={selectedChapter}
                setModalMode={setModalMode}
                modalMode={modalMode}
                initialData={currentClass}
            />
        </div>
    );
}

export default TeacherDashboardOnlineClass;
