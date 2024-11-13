import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useState } from "react";
import { data } from "./data";

const TeachersTable = () => {
  const [products, setProducts] = useState( data );

  const columns = [
    { field: "id", header: "Id" },
    { field: "name", header: "Teacher name" },
    { field: "email", header: "Email" },
    { field: "phone", header: "Phone nu." },
    { field: "qualification", header: "Qualification" },
    {
        field: "Action",
        header: "Action",
        body: (rowData) => (
            <div className="flex justify-center space-x-2">
                <Button
                    // onClick={() => handleEdit(rowData)}
                    backgroundColor="#FF8A00"
                    icon="pi pi-pencil" // Use PrimeIcons for consistency
                    className="p-button-rounded p-button-warning p-1"
                />
                <Button
                    // onClick={() => handleReload(rowData)}
                    backgroundColor="#004871"
                    icon="pi pi-refresh"
                    className="p-button-rounded p-button-info p-1"
                />
                <Button
                    // onClick={() => handleDelete(rowData)}
                    backgroundColor="#FF4D00"
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger p-1"
                />
            </div>
        )
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

export default TeachersTable;