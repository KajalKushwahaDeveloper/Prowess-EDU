import { Icons } from "../../../assets/icons";
import { deleteAssign, getAssignForTeacher } from "../../../features/dashboardSharedApi/teacherDashboardAssignReducer";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AddNewAssignmentModal from "../modals/addNewAssignmentModal";

const AssignmentTable = ({ setModalMode, modalMode, currentAssignment, setCurrentAssignment }) => {
    const [visible, setVisible] = useState(false);
    // const [filteredReports, setFilteredReports] = useState([]); // For local filtering
    console.log("AssignmentTable:", currentAssignment);

    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.teacherDashboardAssignSharedApi);

    useEffect(() => {
        dispatch(getAssignForTeacher());
      }, [dispatch]);
    
    const handleDelete = async (rowData) => {
        console.log("rowdata:", rowData);

        try {
            await dispatch(deleteAssign({ id: rowData.id })).unwrap();

            // Remove the deleted row from local state
            setCurrentAssignment((preAssignments) =>
                preAssignments.filter((assignments) => assignments.id !== rowData.id)
            );

            toast.success("Assignment deleted successfully!");
        } catch (error) {
            console.error("Error deleting student:", error);
            toast.error(error || "Failed to delete Assignment. Please fix errors.");
        }
    };

    const handleEdit = (rowData) => {
        console.log("edit button click:", rowData);
        setVisible(true);
        setModalMode("edit");
        setCurrentAssignment(rowData);
    };

    const handleReload = () => {
        // Reload data from the API
        dispatch(getAssignForTeacher())
        toast.info("Data reloaded successfully!");
    };

    const columns = [
        {
            field: "serialNo",
            header: "S.No",
            body: (rowData, options) => options.rowIndex + 1,
        },
        { field: "subject", header: "Subject" },
        { field: "chapter", header: "Chapter" },
        { field: "topic", header: "Topic" },
        { field: "Class", header: "Class" },
        { field: "assignedTo", header: "Assign To" },
        { field: "assignFile", header: "Assignment file" },
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
                data={currentAssignment}
                columns={columns}
                tableStyle={{ minWidth: "40rem", fontSize: "1.1rem" }}
            />
            {
                visible && (
                    <AddNewAssignmentModal
                        visible={visible}
                        setVisible={setVisible}
                        mode={modalMode}
                        initialData={currentAssignment}
                        onHide={() => setVisible(false)}
                    />
                )
            }
        </>
    );
};
export default AssignmentTable;
