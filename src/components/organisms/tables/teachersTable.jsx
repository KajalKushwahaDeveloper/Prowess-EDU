import { useState, useEffect } from "react";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { getItem, deleteItem } from "../../../features/dashboardSharedApi/sharedReducer";
import { toast } from "react-toastify";
import AddNewTeacherModal from "../modals/addNewTeacherModal";
import ViewAll from "../../common/viewAllFunctionality";
import { useDispatch, useSelector } from "react-redux";
import { Icons } from "../../../assets/icons";

const TeachersTable = ({ setModalMode, modalMode, currentStudent, setCurrentStudent }) => {
    const dispatch = useDispatch();
    const [showAll, setShowAll] = useState(false);
    const [visible, setVisible] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState({}); // State to manage password visibility

    const { teacherData, loading, error, shouldReloadTeacherData } = useSelector((state) => state.sharedApi);
    const tableData = teacherData?.teachers;

    useEffect(() => {
        dispatch(getItem({ role: "teacher" }));
    }, [dispatch, shouldReloadTeacherData]);

    const handleEdit = (rowData) => {
        setVisible(true);
        setModalMode("edit");
        setCurrentStudent(rowData);
    };

    const handleDelete = async (rowData) => {
        try {
            await dispatch(deleteItem({ role: "teacher", id: rowData.id }));
            toast.success("Teacher deleted successfully!");
        } catch (error) {
            console.error("error:", error);
            toast.error(error || "Failed to delete teacher. Please fix errors.");
        }
    };

    const handleReload = () => {
        dispatch(getItem({ role: "teacher" }));
        toast.info("Data reloaded successfully!");
    };

    const togglePasswordVisibility = (id) => {
        setPasswordVisibility((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const columns = [
        {
            field: "serialNo",
            header: "S.No",
            body: (rowData, options) => options.rowIndex + 1,
        },
        { field: "name", header: "Teacher Name" },
        { field: "email", header: "Email" },
        { field: "phone", header: "Phone Number" },
        { field: "qualification", header: "Qualification" },
        {
            field: "password",
            header: "Password",
            body: (rowData) => (
                <div className="flex items-center space-x-2">
                    <span>{passwordVisibility[rowData.id] ? rowData.password : "••••••••••"}</span>
                    <i
                        className="pi pi-info-circle cursor-pointer text-blue-600"
                        onClick={() => togglePasswordVisibility(rowData.id)}
                        title={passwordVisibility[rowData.id] ? "Hide Password" : "Show Password"}
                    ></i>
                </div>
            ),
        },
        {
            field: "Action",
            header: "Action",
            body: (rowData) => (
                <div className="flex justify-center space-x-2">
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
            ),
        },
    ];

    const displayData = showAll ? tableData : tableData?.slice(0, 2);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <Table
                data={displayData}
                columns={columns}
                tableStyle={{ minWidth: "40rem", fontSize: "1.1rem" }}
            />
            <ViewAll showAll={showAll} setShowAll={setShowAll} />

            {visible && (
                <AddNewTeacherModal
                    visible={visible}
                    setVisible={setVisible}
                    mode={modalMode}
                    initialData={currentStudent}
                    onHide={() => setVisible(false)}
                />
            )}
        </>
    );
};

export default TeachersTable;
