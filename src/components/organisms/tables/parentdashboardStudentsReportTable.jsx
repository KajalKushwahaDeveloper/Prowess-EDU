import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useState } from "react";
import ViewPDStudentReportModal from "../../organisms/modals/viewPDStudentReportModal";

const ParentDashboardStudentReportTable = ({ filteredFeedback }) => {
  const [visible, setVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleView = (rowData) => {
    console.log("click", rowData);
    setSelectedStudent(rowData)
    setVisible(true);
  };
  const columns = [
    { field: "sID", header: "Id" },
    { field: "studentName", header: "Name" },
    { field: "teacherName", header: "Teacher name" },
    { field: "subject", header: "Subject" },
    { field: "grade", header: "Grade" },
    { field: "recommendation", header: "Recommendation" },
    { field: "comment", header: "Comments" },
    {
      field: "Action",
      header: "Action",
      body: (rowData) => {
        return (
          <div className="flex space-x-2">
            <Button
              // label="view"
              onClick={() => handleView(rowData)}
              backgroundColor="#00A943"
              icon={Icons.viewIcon}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table
        data={filteredFeedback}
        columns={columns}
        tableStyle={{ minWidth: "40rem", fontSize: "1.1rem" }}
      />
      <div>{visible && <ViewPDStudentReportModal visible={visible} setVisible={setVisible} selectedStudent={selectedStudent} />}</div>
    </>
  );
};

export default ParentDashboardStudentReportTable;
