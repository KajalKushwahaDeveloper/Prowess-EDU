import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useState } from "react";

const StudentsTable = () => {
  const [products, setProducts] = useState("");

  const columns = [
    { field: "id", header: "Id" },
    { field: "name", header: "Teacher name" },
    { field: "email", header: "Email" },
    { field: "phone", header: "Phone nu." },
    { field: "class", header: "Class" },
    {
      field: "Action",
      header: "Action",
      body: () => {
        return (
          <div className="flex space-x-2">
            <Button
              label="Edit"
              // onClick={() => handleEdit(rowData)}
              backgroundColor="#FF8A00"
              icon={Icons.plusIcon}
            />
            <Button
              label="reload"
              // onClick={() => handleDelete(rowData)}
              backgroundColor="#004871"
              icon={Icons.reloadIcon}
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

export default StudentsTable;