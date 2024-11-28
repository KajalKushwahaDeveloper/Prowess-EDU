import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useState, useEffect } from "react";
import { getVideosForTeacher, deleteVideo } from "../../../features/dashboardSharedApi/videosSharedApi";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import AddNewVideoModal from "../modals/addNewVideomodal";

const TodayTopicVideoTable = ({ setModalMode, modalMode, currentStudent, setCurrentStudent }) => {
    const [products, setProducts] = useState({ setModalMode, modalMode, currentStudent, setCurrentStudent });
    const [visible, setVisible] = useState(false);
    const [filteredReports, setFilteredReports] = useState([]); // For local filtering
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.teacherDashboardVideoSharedApi);

    useEffect(() => {
        // Fetch reports on mount
        dispatch(getVideosForTeacher())
            .unwrap()
            .then((response) => setFilteredReports(response.videos)) // Initialize local state
            .catch((err) => {
                toast.error(error || "Failed to fetch Data");
            });
    }, [dispatch]);

    const handleDelete = async (rowData) => {
        try {
            await dispatch(deleteVideo({ role: "student", id: rowData.id })).unwrap();

            // Remove the deleted row from local state
            setFilteredReports((prevReports) =>
                prevReports.filter((report) => report.id !== rowData.id)
            );

            toast.success(error || "Videos deleted successfully!");
        } catch (error) {
            console.error("Error deleting student:", error);
            toast.error(error || "Failed to delete student. Please fix errors.");
        }
    };

    const handleEdit = (rowData) => {
        console.log("edit button click");
        setVisible(true);
        setModalMode("edit");
        setCurrentStudent(rowData);
    };

    const handleReload = () => {
        // Reload data from the API
        dispatch(getVideosForTeacher())
            .unwrap()
            .then((response) => {
                setFilteredReports(response.reports); // Ensure you're setting the correct data
                toast.info("Data reloaded successfully!");
            })
            .catch((err) => toast.error("Failed to reload data"));
    };
    

    const columns = [
        { field: "id", header: "Id" },
        { field: "subjectName", header: "Subject Name" },
        { field: "chapter", header: "Chapter" },
        { field: "topic", header: "Topic" },
        { field: "class", header: "Class" },
        { field: "file", header: "File" },
        {
            field: "Action",
            header: "Action",
            body: () => {
                return (
                    <div className="flex space-x-2">
                        <Button
                            backgroundColor="#FF8A00"
                            icon={Icons.editIcon}
                            onClick={() => handleEdit(rowData)}
                        />
                        <Button
                            backgroundColor="#004871"
                            icon={Icons.reloadIcon}
                            onClick={handleReload}
                        />
                        <Button
                            backgroundColor="#FF4D00"
                            icon={Icons.deleteIcon}
                            onClick={() => handleDelete(rowData)}
                        />
                    </div>
                );
            },
        },
    ];

    return (
        <>
        <Table
            data={filteredReports}
            columns={columns}
            tableStyle={{ minWidth: "40rem", fontSize: "1.1rem"}}
        />
        {
            visible && (
                <AddNewVideoModal
                    visible={visible}
                    setVisible={setVisible}
                    mode={modalMode}
                    initialData={currentStudent}
                    onHide={() => setVisible(false)}
                />
            )
        }
    </>
    );
};

export default TodayTopicVideoTable;
