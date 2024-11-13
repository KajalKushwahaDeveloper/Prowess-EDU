import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useState } from "react";

const TeacherDashboardStudentReportTable = () => {
    const [products, setProducts] = useState("");

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
                            // label="view"
                            // onClick={() => handleEdit(rowData)}
                            backgroundColor="#00A943"
                            icon={Icons.viewIcon}
                        />
                        <Button
                            // label="edit"
                            // onClick={() => handleEdit(rowData)}
                            backgroundColor="#FF8A00"
                            icon={Icons.editIcon}
                        />
                    </div>
                );
            },
        },
    ];

    return (
        <Table
            data={products}
            columns={columns}
            tableStyle={{ minWidth: "40rem", fontSize: "1.1rem"}}
        />
    );
};

export default TeacherDashboardStudentReportTable;
