import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useState, useEffect } from "react";
import {
  deleteItem,
  getItem,
} from "../../../features/dashboardSharedApi/sharedReducer";
import ViewAll from "../../common/viewAllFunctionality";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ParentTable = () => {
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);

  const { parentData, loading, error, shouldReloadParentData } = useSelector(
    (state) => state.sharedApi
  );
  const tableData = parentData?.parents;

  useEffect(() => {
    dispatch(getItem({ role: "parent" }));
  }, [dispatch, shouldReloadParentData]);

  const handleDelete = (rowData) => {
    try {
      dispatch(deleteItem({ role: "parent", id: rowData.id }));
      toast.success("Parent delete successfully! ");
    } catch (error) {
      console.log("error:", error);
      toast.error(error || "Failed to delete parent. Please fix errors.");
    }
  };

  const columns = [
    { field: "id", header: "Id" },
    { field: "name", header: "Name" },
    { field: "email", header: "Email" },
    { field: "phone", header: "Phone nu." },
    { field: "address", header: "Address" },
    { field: "gender", header: "Gender" },
    { field: "childName", header: "Child Name" },
    { field: "childClass", header: "Class" },
    { field: "childSection", header: "Section" },
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
            onClick={() => handleDelete(rowData)}
            backgroundColor="#FF4D00"
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger p-1"
          />
        </div>
      ),
    },
  ];
  const displayData = showAll ? tableData : tableData?.slice(0, 2);

  return (
    <>
      <ToastContainer />
      <Table
        data={displayData}
        columns={columns}
        tableStyle={{ minWidth: "40rem", fontSize: "1.1rem" }}
      />
      <ViewAll showAll={showAll} setShowAll={setShowAll} />
    </>
  );
};

export default ParentTable;
