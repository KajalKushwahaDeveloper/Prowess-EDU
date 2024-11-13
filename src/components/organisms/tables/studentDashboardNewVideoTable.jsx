import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useState } from "react";
import { data } from "./data";

const StudentDashboardNewVideoTable = () => {
    const [products, setProducts] = useState(data);

    const columns = [
        { field: "id", header: "Id" },
        { field: "subjectName", header: "Subject Name" },
        { field: "teacherName", header: "Teacher Name" },
        { field: "chapter", header: "Chapter" },
        { field: "topic", header: "Topic" },
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
            tableStyle={{ minWidth: "40rem", fontSize: "1.1rem"}}
        />
    );
};

export default StudentDashboardNewVideoTable;
