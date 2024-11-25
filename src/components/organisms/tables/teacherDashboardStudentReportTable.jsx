import { Icons } from "../../../assets/icons";
import { getReportsForTeacher } from "../../../features/dashboardSharedApi/teacherSharedreducer";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const TeacherDashboardStudentReportTable = () => {
    const[formData, setFormData] = useState({
        studentName: "",
        sID: "",
        subject: "",
        marks: "",
        assignmentMarks: "",
        testMarks: "",
        grade: "",
        level: "",
        recommendation: "",
        comment: ""
    });
    const [visible, setVisible] = useState(false);

    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.teacherDashboardSharedApi);
    console.log("Redux Data:", data);

    useEffect(() => {
        dispatch(getReportsForTeacher())
            .unwrap()
            .catch((err) => {
                toast.error(error || "Failed to fetch reports");
            });
    }, [dispatch]);
    
    
    const handleDelete = (rowData) => {
        try {
            dispatch(deleteItem({ role: "student", id: rowData.id }));
            toast.success("Student delete successfully! ");
        } catch (error) {
            console.log("error:", error);
            toast.error(error || "Failed to delete student. Please fix errors.");
        }
    };
    const handleEdit = (rowData) => {
        console.log("edit button click")
        setVisible(true)
        setModalMode("edit")
        setCurrentStudent(rowData)
    }
    const handleReload = () => {
        // Dispatch an action to trigger data reload
        dispatch(getItem({ role: "student" }));
        toast.info("Data reloaded successfully!");
    };
    const columns = [
        { field: "id", header: "Id" },
        { field: "studentName", header: "Student name" },
        { field: "marks", header: "Marks" },
        { field: "assignmentMarks", header: "Assignment Marks" },
        { field: "testMarks", header: "Test Marks" },
        { field: "level", header: "Level" },
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
                        // onClick={() => setVisible(true)}
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
        <Table
            data={data}
            columns={columns}
            tableStyle={{ minWidth: "40rem", fontSize: "1.1rem" }}
        />
    );
};

export default TeacherDashboardStudentReportTable;
