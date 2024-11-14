import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useState } from "react";
import { data } from "./data";
import ViewAll from "../../common/viewAllFunctionality"

const StudentsTable = () => {
  const [products, setProducts] = useState(data);
  const [showAll, setShowAll] = useState(false);

  // Show only the first 2 items if `showAll` is false, otherwise show all
  const displayedData = showAll ? products : products.slice(0, 2);

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
              backgroundColor="#FF8A00"
              icon={Icons.editIcon}
            />
            <Button
              backgroundColor="#004871"
              icon={Icons.reloadIcon}
            />
            <Button
              backgroundColor="#FF4D00"
              icon={Icons.deleteIcon}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table
        data={displayedData}
        columns={columns}
        tableStyle={{ minWidth: "40rem", fontSize: "1.1rem" }}
      />
    <ViewAll showAll={showAll} setShowAll={setShowAll}/>
    </>
  );
};

export default StudentsTable;
