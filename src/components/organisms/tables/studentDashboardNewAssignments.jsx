import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useState, useEffect } from "react";
import ViewAll from "../../common/viewAllFunctionality";
import ViewSDNewAssignModal from "../modals/viewSDNewAssignmentsModal.jsx";
import Spinner from "../../atoms/Loader"; // Assuming you have a Spinner component

const StudentDashboardNewAssignmentsTable = ({
  loading,
  newAssignment,
  selectedAssignment,
  setSelectedAssignment,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [visible, setVisible] = useState(false);

  const columns = [
    {
      field: "serialNo",
      header: "S.No",
      body: (rowData, options) => options.rowIndex + 1,
    },
    { header: "Subject Name", body: (rowData) => rowData.subject || "N/A" },
    { header: "Chapter", body: (rowData) => rowData.chapter || "N/A" },
    {
      header: "Questions",
      body: (rowData) =>
        (rowData.questions && rowData.questions.length) || "N/A",
    },
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
      {loading ? ( // Show loader while loading
        <div className="flex justify-center items-center h-64">
          <Spinner /> {/* Replace with your actual spinner component */}
        </div>
      ) : (
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
      )}
    </>
  );
};

export default StudentDashboardNewAssignmentsTable;
