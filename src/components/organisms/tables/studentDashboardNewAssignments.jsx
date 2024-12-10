import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useState, useEffect } from "react";
import ViewAll from "../../common/viewAllFunctionality";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getNewAssignForStudent } from "../../../features/dashboardSharedApi/studentDashboardSharedApiReducer.js";
import ViewSDNewAssignModal from "../modals/viewSDNewAssignmentsModal.jsx";

const StudentDashboardNewAssignmentsTable = () => {
  const [showAll, setShowAll] = useState(false);
  const [newAssignment, setNewAssigment] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const dispatch = useDispatch();

  const studentClass = JSON.parse(localStorage.getItem("data"));

  console.log("newAssignment:", newAssignment);

  useEffect(() => {
    // Fetch reports on mount
    dispatch(getNewAssignForStudent(studentClass?.Class))
      .unwrap()
      .then((response) => setNewAssigment(response?.assignments))
      .catch((error) => {
        toast.error(error || "Failed to fetch reports");
      });
  }, [dispatch]);

  const columns = [
    { header: "Id", body: (rowData) => rowData.id || "N/A" },
    { header: "Subject Name", body: (rowData) => rowData.subject || "N/A" },
    { header: "Chapter", body: (rowData) => rowData.chapter || "N/A" },
    { header: "Questions", body: (rowData) => rowData.questions || "N/A" },
    { header: "Marks", body: (rowData) => rowData.marks || "N/A" },
    {
      field: "Action",
      header: "Action",
      body: (rowData) => {
        return (
          <div className="flex space-x-2">
            <Button
              onClick={() => {
                setSelectedAssignment(rowData); // Set the selected assignment
                setVisible(true); // Show the modal
              }}
              backgroundColor="#00A943"
              icon={Icons.viewIcon}
            />
          </div>
        );
      },
    },
  ];
  const displayedData = showAll ? newAssignment : newAssignment?.slice(0, 2);
  return (
    <>
      <Table
        data={displayedData}
        columns={columns}
        tableStyle={{ minWidth: "40rem", fontSize: "2rem" }}
      />
      <ViewAll showAll={showAll} setShowAll={setShowAll} />
      {visible && (
        <ViewSDNewAssignModal
          setVisible={setVisible}
          visible={visible}
          assignmentData={selectedAssignment} // Pass the selected assignment
        />
      )}
    </>
  );
};

export default StudentDashboardNewAssignmentsTable;
