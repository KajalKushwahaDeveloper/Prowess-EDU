import Card from "../../components/molecules/Card";
import StudentDashboardNewVideoTable from "../../components/organisms/tables/studentDashboardNewVideoTable";
import StudentDashboardNewAssignmentsTable from "../../components/organisms/tables/studentDashboardNewAssignments";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getNewVideosForStudent } from "../../features/dashboardSharedApi/studentDashboardvideosReducer";
import { getNewAssignForStudent } from "../../features/dashboardSharedApi/studentDashboardSharedApiReducer";

function StudentDashboard() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [newAssignment, setNewAssigment] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const dispatch = useDispatch();

  const { error } = useSelector(
    (state) => state.studentDashboardNewVideosSharedApi
  );
  const studentClass = JSON.parse(localStorage.getItem("data"));
console.log("newAssignment:",newAssignment);

  useEffect(() => {
    // Fetch reports on mount
    dispatch(getNewVideosForStudent({ classId: `${studentClass?.Class}-${studentClass?.section}`}))
      .unwrap()
      .then((response) => setVideos(response?.videos)) // Initialize local state
      .catch((err) => {
        toast.error(error || "Failed to fetch reports");
      });
  }, [dispatch]);

  useEffect(() => {
    // Fetch reports on mount
    dispatch(getNewAssignForStudent(`${studentClass?.Class}-${studentClass?.section}`))
      .unwrap()
      .then((response) => setNewAssigment(response?.assignments))
      .catch((error) => {
        toast.error(error || "Failed to fetch reports");
      });
  }, [dispatch]);

  const cardDetails = [
    {
      cardHeading: "Assigned Video",
      totalNumber: videos?.length || 0, // Use videos.length to get the number of videos
      cardStyle: { backgroundColor: "#EEDFF7" },
    },
    {
      cardHeading: "Assignments Tests",
      totalNumber: newAssignment?.length || 0, // Use newAssignment.length to get the number of assignments
      cardStyle: { backgroundColor: "#DFEEF7" },
    },
    {
      cardHeading: "Online Class",
      totalNumber: "1", // Static value for online class
      cardStyle: { backgroundColor: "#B2DCF4" },
    },
  ];
  return (
    <div className="admin-dashboard m-6 dashboard z-1">
      <div className="my-4">
        <h1 className="text-black font-bold text-2xl mb-4">Dashboard</h1>
        <hr />
      </div>
     
      <div className=" flex  items-center  justify-center flex-col  gap-0 mb-8 md:flex md:flex-col md:items-center md:justify-start md:gap-0 md:mb-8 lg:flex lg:flex-row lg:gap-6">
        {cardDetails.map((currentData, index) => {
          return (
            <>
              <Card
                key={index}
                totalNumber={currentData.totalNumber}
                cardHeading={currentData.cardHeading}
                cardStyle={currentData.cardStyle}
              />
            </>
          );
        })}
      </div>
      <div>
        <h1 className="text-black font-bold text-xl mb-4">
          New Video
          <hr className="mt-2" />
        </h1>
        <div className="md:overflow-none overflow-x-auto mb-8">
          <StudentDashboardNewVideoTable videos={videos} selectedVideo={selectedVideo} setSelectedVideo={setSelectedVideo} />
        </div>
      </div>
      <div>
        <h1 className="text-black font-bold text-xl mb-4">
          New Assignments
          <hr className="mt-2" />
        </h1>
        <div className="md:overflow-none overflow-x-auto mb-8">
          <StudentDashboardNewAssignmentsTable newAssignment={newAssignment} selectedAssignment={selectedAssignment} setSelectedAssignment={setSelectedAssignment} />
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
