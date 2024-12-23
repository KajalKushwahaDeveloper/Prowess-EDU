import { useState, useEffect } from "react";
import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import ViewAll from "../../common/viewAllFunctionality";
import ViewSDNewVideoModal from "../modals/viewSDNewVideoModal";
import  Spinner  from "../../atoms/Loader"; // Assuming you have a Spinner component

const StudentDashboardNewVideoTable = ({ videos, selectedVideo, setSelectedVideo }) => {
  const [showAll, setShowAll] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (videos && videos.length > 0) {
      setLoading(false); // Set loading to false when data is available
    }
  }, [videos]); // Run this when videos data changes

  const columns = [
    {
      field: "serialNo",
      header: "S.No",
      body: (rowData, options) => options.rowIndex + 1,
    },
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
      {loading ? ( // Show loader while loading
        <div className="flex justify-center items-center h-64">
          <Spinner /> {/* Replace with your actual spinner component */}
        </div>
      ) : (
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
              videoData={selectedVideo} // Pass the selected assignment
            />
          )}
        </>
      )}
    </>
  );
};

export default StudentDashboardNewVideoTable;
