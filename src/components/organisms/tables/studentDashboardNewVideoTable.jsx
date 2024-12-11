import { useState, useEffect } from "react";
import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import ViewAll from "../../common/viewAllFunctionality";
import ViewSDNewVideoModal from "../modals/viewSDNewVideoModal";

const StudentDashboardNewVideoTable = ({videos, selectedVideo, setSelectedVideo}) => {
  const [showAll, setShowAll] = useState(false);
  const [visible, setVisible] = useState(false);

  const columns = [
    { header: "Id", body: (rowData) => rowData.id || "N/A" },
    {
      field: "subject",
      header: "Subject Name",
      body: (rowData) => rowData.subject || "N/A",
    },
    {
      header: "Teacher Name",
      body: (rowData) => rowData.teacherDetail?.name || "N/A",
    },
    { header: "Chapter", body: (rowData) => rowData.chapter || "N/A" },
    { header: "Topic", body: (rowData) => rowData.topic || "N/A" },
    {
      header: "Action",
      body: (rowData) => {
        return (
          <div className="flex space-x-2">
            <Button
              backgroundColor="#00A943"
              icon={Icons.viewIcon}
              onClick={() => {
                setSelectedVideo(rowData); // Set the selected assignment
                setVisible(true); // Show the modal
              }}
            />
          </div>
        );
      },
    },
  ];

  const displayedData = showAll ? videos : videos?.slice(0, 2);
  return (
    <>
      <Table
        data={displayedData}
        columns={columns}
        tableStyle={{ minWidth: "40rem", fontSize: "1.1rem" }}
      />
      <ViewAll showAll={showAll} setShowAll={setShowAll} />
      {visible && (
        <ViewSDNewVideoModal
          setVisible={setVisible}
          visible={visible}
          assignmentData={selectedVideo} // Pass the selected assignment
        />
      )}
    </>
  );
};

export default StudentDashboardNewVideoTable;
