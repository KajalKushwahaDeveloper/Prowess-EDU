import { useState } from "react";
import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { data } from "./data";
import ViewAll from "../../common/viewAllFunctionality";

const StudentDashboardNewVideoTable = () => {
    const [products, setProducts] = useState(data);
    const [showAll, setShowAll] = useState(false);

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
    const displayedData = showAll ? products : products.slice(0, 2)
    return (
        <>
            <Table
                data={displayedData}
                columns={columns}
                tableStyle={{ minWidth: "40rem", fontSize: "1.1rem" }}
            />
            <ViewAll showAll={showAll} setShowAll={setShowAll} />
        </>
    );
};

export default StudentDashboardNewVideoTable;
