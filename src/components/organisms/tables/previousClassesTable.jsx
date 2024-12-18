import { useDispatch } from "react-redux";
import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { deleteOnlineClass, getOnlineClassesForTeacher } from "../../../features/dashboardSharedApi/teacherDashboardSharedApiReducer"
import CreateOnlineClassModal from "../modals/createOnlineClassModal";

const PreviousClassesTable = ({ onlineClass, setOnlineClass, visible,
    setVisible, modalMode,  currentClass }) => {
    // const [visible, setVisible] = useState(false);

    const dispatch = useDispatch();
    const studentData = JSON.parse(localStorage.getItem("data"));

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

    const handleDelete = async (rowData) => {
        console.log("Deleting rowData:", rowData.id); // Log to check the rowData
        try {
            await dispatch(deleteOnlineClass({ id: rowData.id })).unwrap();
            setOnlineClass((prevReports) =>
                prevReports.filter((report) => report.id !== rowData.id)
            );
            toast.success("Student deleted successfully!");
        } catch (error) {
            console.error("Error deleting student:", error);
            toast.error(error || "Failed to delete student. Please fix errors.");
        }
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
        { field: "date", header: "Date" },
        { field: "studentJoined", header: "Student joined", body: (rowData) => rowData.onlineClassStatus && rowData.onlineClassStatus.length || "N/A" },
        {
            field: "Action",
            header: "Action",
            body: (rowData) => {
                return (
                    <div className="flex space-x-2">

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
                data={onlineClass}
                columns={columns}
                tableStyle={{ minWidth: "40rem", fontSize: "1.1rem" }}
            />
            {
                visible && (
                    <CreateOnlineClassModal
                        visible={visible}
                        setVisible={setVisible}
                        mode={modalMode}
                        initialData={currentClass}
                        onHide={() => setVisible(false)}
                    />
                )
            }
        </>
    );
};

export default PreviousClassesTable;
