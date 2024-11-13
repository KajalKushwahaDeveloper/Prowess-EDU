import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useState } from "react";
import { data } from "./data";

const StudentDashboardNewAssignmentsTable = () => {
    const [products, setProducts] = useState(data);

    const columns = [
        { field: "id", header: "Id" },
        { field: "subjectName", header: "Subject Name" },
        { field: "chapter", header: "Chapter" },
        { field: "questions", header: "Questions" },
        { field: "marks", header: "Marks" },
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

                    </div>
                );
            },
        },
    ];

    return (
        <Table
            data={products}
            columns={columns}
            tableStyle={{ minWidth: "40rem", fontSize: "2rem" }}
        />
    );
};

export default StudentDashboardNewAssignmentsTable;
