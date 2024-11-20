import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useState, useEffect } from "react";
import { getItem, deleteItem } from "../../../features/dashboardSharedApi/sharedReducer";
import ViewAll from "../../common/viewAllFunctionality"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentsTable = () => {
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);
  
  const {  studentData, loading, error, shouldReloadStudentData } = useSelector((state) => state.sharedApi);
  const tableData = studentData?.students;

  useEffect(() => {
          dispatch(getItem({ role: "student" }));
  }, [dispatch, shouldReloadStudentData]);
  
  const handleDelete = (rowData) => {
    try {
      dispatch(deleteItem({ role: "student", id: rowData.id }));
      toast.success("Student delete successfully! ");
    } catch (error) {
      console.log("error:", error);
      toast.error(error || "Failed to delete student. Please fix errors.");
    }
  };

  const columns = [
    { field: "id", header: "Id" },
    { field: "name", header: "Teacher name" },
    { field: "email", header: "Email" },
    { field: "phone", header: "Phone nu." },
    { field: "class", header: "Class" },
    {
      field: "Action",
      header: "Action",
      body: (rowData) => {
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
              onClick={() => handleDelete(rowData)}
              />
          </div>
        );
      },
    },
  ];
  
  const displayedData = showAll ? tableData : tableData?.slice(0, 2);
  return (
    <>
     <ToastContainer />
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
