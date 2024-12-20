import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteTimeTable } from "../../../features/dashboardSharedApi/teacherTimeTableReducer";

const TimeTable = ({ timeTable, mode = "add", setCurrentTimeTable }) => {
    const { data, loading, error } = useSelector((state) => state.teacherDashboardTimeTableSharedApi);
    const dispatch = useDispatch();
    const handleDelete = async (rowData) => {
        console.log("timeTablerowdata:", rowData);

        try {
            await dispatch(deleteTimeTable({ id: rowData.id })).unwrap();

            // Remove the deleted row from local state
            setCurrentTimeTable((preTimeTable) =>
                preTimeTable.filter((timeTable) => timeTable.id !== rowData.id)
            );

            toast.success("Time Table deleted successfully!");
        } catch (error) {
            console.error("Error deleting Time Table:", error);
            toast.error(error || "Failed to delete Time Table. Please fix errors.");
        }
    };
    const columns = [
        {
            field: "serialNo",
            header: "S.No",
            body: (rowData, options) => options.rowIndex + 1,
        },
        { field: "teacherName", header: "Teacher Name" },
        { field: "subject", header: "Subject" },
        { field: "Class", header: "Class" },
        { field: "date", header: "Date" },
        {
            field: "Action",
            header: "Action",
            body: (rowData) => {
                return (
                    <div className="flex space-x-2">
                        <Button icon={Icons.editIcon} backgroundColor="#FF8A00" />
                        <Button icon={Icons.deleteIcon} backgroundColor="#FF4D00" onClick={() => handleDelete(rowData)} />
                    </div>
                );
            },
        },
    ];

    return (
        <Table
            data={timeTable}
            columns={columns}
            tableStyle={{ minWidth: "40rem", fontSize: "1.1rem" }}
        />
    );
};

export default TimeTable;
