import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useState } from "react";

const ParentDashboardStudentReportTable = () => {
    const [products, setProducts] = useState("");

    const columns = [
        { field: "id", header: "Id" },
        { field: "teacherName", header: "Teacher name" },
        { field: "subject", header: "Subject" },
        { field: "grade", header: "Grade" },
        { field: "recommendation", header: "Recommendation" },
        { field: "comments", header: "Comments" },
        {
            field: "Action",
            header: "Action",
            body: () => {
                return (
                    <div className="flex space-x-2">
                        <Button
                            label="view"
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
            tableStyle={{ minWidth: "40rem", fontSize: "1.2rem" }}
        />
    );
};

export default ParentDashboardStudentReportTable;
