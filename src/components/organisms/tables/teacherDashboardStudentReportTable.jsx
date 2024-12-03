import { Icons } from "../../../assets/icons";
import { getReportsForTeacher, deleteReport } from "../../../features/dashboardSharedApi/teacherSharedreducer";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CreateReportModal from "../modals/createReportModal";

const TeacherDashboardStudentReportTable = ({ setModalMode, modalMode, currentStudent, setCurrentStudent }) => {
    const [visible, setVisible] = useState(false);
    const [filteredReports, setFilteredReports] = useState([]); // For local filtering

    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.teacherDashboardSharedApi);

    useEffect(() => {
        // Fetch reports on mount
        dispatch(getReportsForTeacher())
            .unwrap()
            .then((response) => setFilteredReports(response.reports)) // Initialize local state
            .catch((err) => {
                toast.error(error || "Failed to fetch reports");
            });
    }, [dispatch]);

    const handleDelete = async (rowData) => {
        try {
            await dispatch(deleteReport({ role: "student", id: rowData.id })).unwrap();

            // Remove the deleted row from local state
            setFilteredReports((prevReports) =>
                prevReports.filter((report) => report.id !== rowData.id)
            );

            toast.success("Student deleted successfully!");
        } catch (error) {
            console.error("Error deleting student:", error);
            toast.error(error || "Failed to delete student. Please fix errors.");
        }
    };

    const handleEdit = (rowData) => {
        setVisible(true);
        setModalMode("edit");
        setCurrentStudent(rowData);
    };

    const handleReload = () => {
        // Reload data from the API
        dispatch(getReportsForTeacher())
            .unwrap()
            .then((response) => {
                setFilteredReports(response.reports); // Ensure you're setting the correct data
                toast.info("Data reloaded successfully!");
            })
            .catch((err) => toast.error("Failed to reload data"));
    };
    

    const columns = [
        { field: "sID", header: "Id" },
        { field: "studentName", header: "Student name" },
        { field: "marks", header: "Marks" },
        { field: "assignmentMarks", header: "Assignment Marks" },
        { field: "testMarks", header: "Test Marks" },
        { field: "level", header: "Level" },
        {
            field: "Action",
            header: "Action",
            body: (rowData) => {
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
                data={filteredReports} // Use locally filtered data
                columns={columns}
                tableStyle={{ minWidth: "40rem", fontSize: "1.1rem" }}
            />
            {
                visible && (
                    <CreateReportModal
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

export default TeacherDashboardStudentReportTable;
