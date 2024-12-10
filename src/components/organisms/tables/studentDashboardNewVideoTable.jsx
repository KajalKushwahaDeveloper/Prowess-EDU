import { useState, useEffect } from "react";
import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import ViewAll from "../../common/viewAllFunctionality";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getNewVideosForStudent } from "../../../features/dashboardSharedApi/studentDashboardvideosReducer";
import ViewSDNewVideoModal from "../modals/viewSDNewVideoModal";

const StudentDashboardNewVideoTable = () => {
  const [showAll, setShowAll] = useState(false);
  const [videos, setVideos] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const dispatch = useDispatch();
  const { loading, error } = useSelector(
    (state) => state.studentDashboardNewVideosSharedApi
  );
  const studentClass = JSON.parse(localStorage.getItem("data"));

  useEffect(() => {
    // Fetch reports on mount
    dispatch(getNewVideosForStudent({ classId: studentClass?.Class }))
      .unwrap()
      .then((response) => setVideos(response?.videos)) // Initialize local state
      .catch((err) => {
        toast.error(error || "Failed to fetch reports");
        // toast.error("Failed to fetch reports");
      });
  }, [dispatch]);

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
                setSelectedAssignment(rowData); // Set the selected assignment
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
          assignmentData={selectedAssignment} // Pass the selected assignment
        />
      )}
    </>
  );
};

export default StudentDashboardNewVideoTable;
