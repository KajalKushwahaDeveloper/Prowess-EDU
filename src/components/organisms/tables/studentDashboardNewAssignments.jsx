import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useState, useEffect } from "react";
import ViewAll from "../../common/viewAllFunctionality";
import ViewSDNewAssignModal from "../modals/viewSDNewAssignmentsModal.jsx";

const StudentDashboardNewAssignmentsTable = ({newAssignment, selectedAssignment, setSelectedAssignment}) => {
  const [showAll, setShowAll] = useState(false);
  const [visible, setVisible] = useState(false);

  const columns = [
    { header: "Id", body: (rowData) => rowData.id || "N/A" },
    { header: "Subject Name", body: (rowData) => rowData.subject || "N/A" },
    { header: "Chapter", body: (rowData) => rowData.chapter || "N/A" },
    { 
      header: "Questions", 
      body: (rowData) => (rowData.questions && rowData.questions.length) || "N/A" 
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
