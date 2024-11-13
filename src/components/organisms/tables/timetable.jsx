import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useState } from "react";

const TimeTable = () => {
    const [products, setProducts] = useState("");

    const columns = [
        { field: "id", header: "Id" },
        { field: "teacherName", header: "Teacher Name" },
        { field: "subject", header: "Subject" },
        { field: "class", header: "Class" },
        { field: "date", header: "Date" },
        {
            field: "Action",
            header: "Action",
            body: () => {
                return (
                    <div className="flex space-x-2">
                        <Button
                            // label="edit"
                            // onClick={() => handleEdit(rowData)}
                            backgroundColor="#FF8A00"
                            icon={Icons.editIcon}
                        />
                        <Button
                            // label="delete"
                            // onClick={() => handleEdit(rowData)}
                            backgroundColor="#FF4D00"
                            icon={Icons.deleteIcon}
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

export default TimeTable;
