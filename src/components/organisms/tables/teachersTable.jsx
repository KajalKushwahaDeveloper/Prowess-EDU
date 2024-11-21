import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useState, useEffect } from "react";
import { getItem ,deleteItem} from "../../../features/dashboardSharedApi/sharedReducer";
import { toast } from "react-toastify";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

import ViewAll from "../../common/viewAllFunctionality"
import { useDispatch, useSelector } from "react-redux";

const TeachersTable = () => {
    const dispatch = useDispatch();
    const [showAll, setShowAll] = useState(false);
    
    const { data, teacherData, loading, error, shouldReloadTeacherData } = useSelector((state) => state.sharedApi);
    const tableData = teacherData?.teachers;
    console.log("Redux Data:", data);

    useEffect(() => {
            dispatch(getItem({ role: "teacher" }));
    }, [dispatch, shouldReloadTeacherData]);


  const handleDelete = async (rowData) => {
    try {
      await dispatch(deleteItem({ role: "teacher", id: rowData.id }));
      toast.success( "Teacher delete successfully! ");
    } catch (error) {
      console.log("error:", error);
      toast.error(error || "Failed to delete teacher. Please fix errors.");
    }
  };

  const handleReload = () => {
    // Dispatch an action to trigger data reload
    dispatch(getItem({ role: "teacher" }));
    toast.info("Data reloaded successfully!");
  };

    const columns = [
        { field: "id", header: "Id" },
        { field: "name", header: "Teacher Name" },
        { field: "email", header: "Email" },
        { field: "phone", header: "Phone Number" },
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
                        onClick={handleReload}
                        backgroundColor="#004871"
                        icon="pi pi-refresh"
                        className="p-button-rounded p-button-info p-1"
                    />
                    <Button
                        onClick={() => handleDelete(rowData)}
                        backgroundColor="#FF4D00"
                        icon="pi pi-trash"
                        className="p-button-rounded p-button-danger p-1"
                    />
                </div>
            )
        },
    ];

    const displayData = showAll ? tableData : tableData?.slice(0, 2);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
         {/* <ToastContainer /> */}
            <Table
                data={displayData}
                columns={columns}
                tableStyle={{ minWidth: "40rem", fontSize: "1.1rem" }}
            />
            <ViewAll showAll={showAll} setShowAll={setShowAll} />
        </>
    );
};

export default TeachersTable;
