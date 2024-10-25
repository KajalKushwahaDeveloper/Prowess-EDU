import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useState } from "react";

const WeakAreaTable = () => {
    const [products, setProducts] = useState("");

    const columns = [
        { field: "id", header: "Id" },
        { field: "subject", header: "Subject" },
        { field: "chapter", header: "Chapter" },
        { field: "topic", header: "Topic" },
        { field: "class", header: "Class" },
        { field: "assignToStudent", header: "Assign to Student" },
        { field: "assignmentFile", header: "Assignment file" },
        { field: "level", header: "Level" },
        {
            field: "Action",
            header: "Action",
            body: () => {
                return (
                    <div className="flex space-x-2">
                            <div className="flex space-x-2">
                        <Button
                            label="edit"
                            // onClick={() => handleEdit(rowData)}
                            backgroundColor="#FF8A00"
                            icon={Icons.editIcon}
                        />
                        <Button
                            label="delete"
                            // onClick={() => handleEdit(rowData)}
                            backgroundColor="#FF4D00"
                            icon={Icons.deleteIcon}
                        />
                    </div>

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

export default WeakAreaTable;