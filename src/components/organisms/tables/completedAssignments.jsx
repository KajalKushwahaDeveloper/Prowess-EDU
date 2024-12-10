import Table from "../../common/Table";
import { useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { getAssignForTeacher } from "../../../features/dashboardSharedApi/teacherDashboardAssignReducer";
import { toast } from "react-toastify";


const CompletedAssignmentsTable = () => {
    const [filteredAssignment, setFilteredAssignment] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch reports on mount
        console.log("getAssign") // Log the response to check its structure
        dispatch(getAssignForTeacher())
        .unwrap()
        .then((response) => {
            console.log("getAssign0:"); // Log the response to check its structure
            setFilteredAssignment(response?.data?.assignments || []);
            console.log("getAssign2") // Log the response to check its structure

        })
            .catch((error) => {
                toast.error(error || "Failed to fetch reports");
                console.log("getAssignerror") // Log the response to check its structure

            });
            console.log("getAssign1") // Log the response to check its structure

    }, [dispatch]);

    const columns = [
        { field: "id", header: "Id" },  // Assuming 'id' is the unique field for assignments
        { field: "subject", header: "Subject" },
        { field: "startDate", header: "Start Date" },
        { field: "endDate", header: "End Date" },
        { field: "topic", header: "Topic" },
        { field: "status", header: "Status" },
    ];

    return (
        <>
            {/* Table rendering */}
            <Table
                data={filteredAssignment}
                columns={columns}
                tableStyle={{ minWidth: "40rem", fontSize: "1.1rem"}}
            />
        </>
    );
};


export default CompletedAssignmentsTable;
