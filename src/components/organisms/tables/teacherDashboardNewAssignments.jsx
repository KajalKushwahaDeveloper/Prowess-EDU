import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useState } from "react";
import { data } from "./data";
import ViewAll from "../../common/viewAllFunctionality";

const TeacherDashboardNewAssignmentsTable = () => {
    const [products, setProducts] = useState(data);
    const [showAll, setShowAll] = useState(false);

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
    const displayedData = showAll ? products : products.slice(0,2)

    return (
        <>
        <Table
            data={displayedData}
            columns={columns}
            ta
            bleStyle={{ minWidth: "40rem", fontSize: "1.1rem"}}
        />
          <ViewAll showAll={showAll} setShowAll={setShowAll}/>
    </>
    );
};

export default TeacherDashboardNewAssignmentsTable;
