import Table from "../../common/Table";
import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAssignForTeacher } from "../../../features/dashboardSharedApi/teacherDashboardAssignReducer";
import { toast } from "react-toastify";


const CompletedAssignmentsTable = () => {
    const [filteredReports, setFilteredReports] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        // Fetch reports on mount
        dispatch(getAssignForTeacher())
            .unwrap()
            .then((response) => setFilteredReports(response.assignments)) // Initialize local state
            .catch((error) => {
                toast.error(error || "Failed to fetch reports");
            });
    }, [dispatch]);

    const columns = [
        { field: "id", header: "Id" },
        { field: "subject", header: "Subject" },
        { field: "startDate", header: "Start Date" },
        { field: "endDate", header: "End Date" },
        { field: "teacher", header: "Teacher" },
        { field: "status", header: "Status" },
    ];

    return (
        <Table
            data={filteredReports}
            columns={columns}
            tableStyle={{ minWidth: "40rem", fontSize: "1.1rem"}}
        />
    );
};

export default CompletedAssignmentsTable;
