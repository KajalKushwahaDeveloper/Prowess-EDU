// import { Icons } from "../../../assets/icons";
// import Button from "../../atoms/button";
// import Table from "../../common/Table";
// import { useState } from "react";
// import { data } from "./data";
// import ViewAll from "../../common/viewAllFunctionality";

// const StudentDashboardNewAssignmentsTable = () => {
//     const [products, setProducts] = useState(data);
//     const [showAll, setShowAll] = useState(false);

//     const columns = [
//         { field: "id", header: "Id" },
//         { field: "subjectName", header: "Subject Name" },
//         { field: "chapter", header: "Chapter" },
//         { field: "questions", header: "Questions" },
//         { field: "marks", header: "Marks" },
//         {
//             field: "Action",
//             header: "Action",
//             body: () => {
//                 return (
//                     <div className="flex space-x-2">
//                         <Button
//                             // label="view"
//                             // onClick={() => handleEdit(rowData)}
//                             backgroundColor="#00A943"
//                             icon={Icons.viewIcon}
//                         />

//                     </div>
//                 );
//             },
//         },
//     ];
//     const displayedData = showAll ? products : products.slice(0,2);
//     return (
//         <>
//         <Table
//             data={displayedData}
//             columns={columns}
//             tableStyle={{ minWidth: "40rem", fontSize: "2rem" }}
//         />
//               <ViewAll showAll={showAll} setShowAll={setShowAll}/>
//         </>
//     );
// };

// export default StudentDashboardNewAssignmentsTable;


import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useState, useEffect } from "react";
import { data } from "./data";
import ViewAll from "../../common/viewAllFunctionality";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getNewAssignForStudent } from "../../../features/dashboardSharedApi/studentDashboardSharedApiReducer.js";

const StudentDashboardNewAssignmentsTable = ({ setModalMode, modalMode, currentStudent, setCurrentStudent }) => {
    const [showAll, setShowAll] = useState(false);
    const [products, setProducts] = useState(data);
    const [visible, setVisible] = useState(false);
    const [filteredReports, setFilteredReports] = useState([]);

    const dispatch = useDispatch();
    // const { data, loading, error } = useSelector((state) => state.studentDashboardNewAssignSharedApi);
    // console.log("studentDashboardNewAssignmentData:", data);

    useEffect(() => {
        // Fetch reports on mount
        dispatch(getNewAssignForStudent(10))
            .unwrap()
            .then((response) => setFilteredReports(response.assignments)) // Initialize local state
            .catch((err) => {
                // toast.error(error || "Failed to fetch reports");
                toast.error("Failed to fetch reports");
            });
    }, [dispatch]);

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
    const displayedData = showAll ? products : products.slice(0, 2);
    return (
        <>
            <Table
                data={displayedData}
                columns={columns}
                tableStyle={{ minWidth: "40rem", fontSize: "2rem" }}
            />
            <ViewAll showAll={showAll} setShowAll={setShowAll} />
        </>
    );
};

export default StudentDashboardNewAssignmentsTable;
