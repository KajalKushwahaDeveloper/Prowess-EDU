import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useState } from "react";

const ParentDashboardStudentReportTable = ({filteredFeedback}) => {

    const columns = [
        { field: "sID", header: "Id" },
        { field: "teacherName", header: "Teacher name" },
        { field: "subject", header: "Subject" },
        { field: "grade", header: "Grade" },
        { field: "recommendation", header: "Recommendation" },
        { field: "comment", header: "Comments" },
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
            data={filteredFeedback}
            columns={columns}
            tableStyle={{ minWidth: "40rem", fontSize: "1.1rem" }}
        />
    );
};

export default ParentDashboardStudentReportTable;
