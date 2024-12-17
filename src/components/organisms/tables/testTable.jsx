import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteTest, getTestForTeacher } from "../../../features/dashboardSharedApi/teacherDashboardTestReducer";
import AddNewTestModal from "../modals/addNewTestModal";

const TestTable = ({ setModalMode, modalMode, currentStudent, setCurrentStudent }) => {
    const [filteredTest, setFilteredTest] = useState([]); // For local filtering
    const [visible, setVisible] = useState(false);
    console.log("TestTable:", filteredTest);

    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.teacherDashboardTestSharedApi);

    useEffect(() => {
        // Fetch reports on mount
        dispatch(getTestForTeacher())
            .unwrap()
            .then((response) => setFilteredTest(response?.data?.tests)) // Initialize local state
            .catch((err) => {
                toast.error(error || "Failed to fetch reports");
            });
    }, [dispatch]);

    const handleDelete = async (rowData) => {
        console.log("rowdata:", rowData);

        try {
            await dispatch(deleteTest({ id: rowData.id })).unwrap();

            // Remove the deleted row from local state
            setFilteredTest((preTest) =>
                preTest.filter((test) => test.id !== rowData.id)
            );

            toast.success("Test deleted successfully!");
        } catch (error) {
            console.error("Error deleting student:", error);
            toast.error(error || "Failed to delete Test. Please fix errors.");
        }
    };

    const handleEdit = (rowData) => {
        console.log("edit button click:", rowData);
        setVisible(true);
        setModalMode("edit");
        setCurrentStudent(rowData);
    };

  const handleReload = () => {
    dispatch(getTestForTeacher());
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
        { field: "assignedTo", header: "Assign to Student" },
        // { field: "testFile", header: "Test file" },
        { field: "level", header: "Level" },
        {
            field: "Action",
            header: "Action",
            body: (rowData) => {
                return (
                    <div className="flex space-x-2">
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

                    </div>
                );
            },
        },
    ];


    return (

        <>
            <Table
                data={filteredTest}
                columns={columns}
                tableStyle={{ minWidth: "40rem", fontSize: "1.1rem" }}
            />
            {
                visible && (
                    <AddNewTestModal
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

export default TestTable;
