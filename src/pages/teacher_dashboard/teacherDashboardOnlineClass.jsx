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
    const [onlineClass, setOnlineClass] = useState([]);
    const [modalMode, setModalMode] = useState("add");
    const [currentClass, setCurrentClass] = useState(null);
    const studentData = JSON.parse(localStorage.getItem("data"));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOnlineClassesForTeacher(studentData?.id))
            .unwrap()
            .then((response) => {
                setOnlineClass(response?.onlineClasses || []);
            })
            .catch(() => {
                toast.error("Failed to fetch classes");
            });
    }, [dispatch]);
console.log("onlineClass:",studentData?.id);

    const handleAdd = (newClass) => {
        setOnlineClass((prevClasses) => [newClass, ...prevClasses]); // Add new class at the beginning
        setIsModalVisible(false); // Close the modal
    };

    const handleUpdate = (updatedClass) => {
        setOnlineClass((prevClasses) =>
            prevClasses.map((classItem) =>
                classItem.id === updatedClass.id ? updatedClass : classItem
            )
        );
        setIsModalVisible(false); // Close the modal
    };

    const handleEdit = (rowData) => {
        setModalMode("edit");
        setCurrentClass(rowData);
        setIsModalVisible(true);
    };

    return (
        <div className="admin-dashboard m-6 dashboard z-1">
            <div className="my-4">
                <div className="flex justify-between md:items-center items-start md:flex-row flex-col">
                    <h2 className="font-bold text-xl md:text-2xl">Online Classes</h2>
                    <div className="flex justify-evenly items-center space-x-4">
                        <Button
                            icon={Icons.plusIcon}
                            onClick={() => {
                                setModalMode("add");
                                setCurrentClass(null);
                                setIsModalVisible(true);
                            }}
                            label="Create New Class"
                        />
                    </div>
                </div>
            </div>
            <hr className="mb-6" />
            <div className="mt-8">
                <h2 className="font-bold text-2xl">Upcoming Classes</h2>
                <hr />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-6 md:gap-6 sm:gap-6">
                    {onlineClass?.map((currentData, index) => (
                        <div key={index} onClick={() => handleEdit(currentData)}>
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
                <h2 className="font-bold text-xl my-4">Previous Classes</h2>
                <hr className="mb-8" />
                <PreviousClassesTable
                    onlineClass={onlineClass}
                    setOnlineClass={setOnlineClass}
                    setModalMode={setModalMode}
                    modalMode={modalMode}
                    setCurrentClass={setCurrentClass}
                    setVisible={setIsModalVisible}
                    currentClass={currentClass}
                />
            </div>
            {isModalVisible && (
                <CreateOnlineClassModal
                    visible={isModalVisible}
                    setVisible={setIsModalVisible}
                    mode={modalMode}
                    initialData={currentClass}
                    onAdd={handleAdd}
                    onUpdate={handleUpdate}
                    onlineClassId= {studentData.id}
                />
            )}
        </div>
    );
};

export default TeacherDashboardOnlineClass;
