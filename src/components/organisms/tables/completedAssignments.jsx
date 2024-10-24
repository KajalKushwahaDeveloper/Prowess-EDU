import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useState } from "react";

const CompletedAssignmentsTable = () => {
    const [products, setProducts] = useState("");

    const columns = [
        { field: "id", header: "Id" },
        { field: "subject", header: "Subject" },
        { field: "startDate", header: "Start Date" },
        { field: "endDate", header: "End Date" },
        { field: "teacher", header: "Teacher" },
        { field: "status", header: "Status" },
    ];

    return (
        <Table
            data={products}
            columns={columns}
            tableStyle={{ minWidth: "40rem", fontSize: "1.2rem" }}
        />
    );
};

export default CompletedAssignmentsTable;
