import Card from "../../components/molecules/Card";
import TeacherDashboardNewAssignmentsTable from "../../components/organisms/tables/teacherDashboardNewAssignments";
import TeacherDashboardNewVideoTable from "../../components/organisms/tables/teacherDashboardNewVideoTable";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getVideosForTeacher } from "../../features/dashboardSharedApi/videosSharedApi";
import { getAssignForTeacher } from "../../features/dashboardSharedApi/teacherDashboardAssignReducer";

function TeacherDashboard() {
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [newAssignment, setNewAssigment] = useState([]);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const dispatch = useDispatch();
  
    const { error } = useSelector(
      (state) => state.studentDashboardNewVideosSharedApi
    );
  
    useEffect(() => {
      // Fetch reports on mount
      dispatch(getVideosForTeacher())
        .unwrap()
        .then((response) => setVideos(response?.videos)) // Initialize local state
        .catch((err) => {
          toast.error(error || "Failed to fetch reports");
        });
    }, [dispatch]);
  
    useEffect(() => {
      // Fetch reports on mount
      dispatch(getAssignForTeacher())
        .unwrap()
        .then((response) => setNewAssigment(response?.data?.assignments))
        .catch((error) => {
          toast.error(error || "Failed to fetch reports");
        });
    }, [dispatch]);

    const cardDetails = [
        {
            cardHeading: "Total added Video",
             totalNumber: videos?.length || 0,
            cardStyle: { backgroundColor: "#EEDFF7" },
        },
        {
            cardHeading: "Total Assignments",
            totalNumber: newAssignment?.length || 0,
            cardStyle: { backgroundColor: "#DFEEF7" },
        },
        {
            cardHeading: "Setup Online Class",
            totalNumber: "15",
            cardStyle: { backgroundColor: "#B2DCF4" },
        },
    ];

    return (
        <div className="admin-dashboard m-6 dashboard z-1">
            <div className="my-4">
                <h1 className="text-black font-bold text-2xl mb-4">Dashboard</h1>
                <hr />
            </div>
            {/* <div className="flex flex-row items-center justify-start gap-6 md:flex-col md:gap-0 md:mb-8"> */}
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
                    <TeacherDashboardNewVideoTable videos={videos}/>
                </div>
            </div>
            <div>
                <h1 className="text-black font-bold text-xl mb-4">
                    New Assignments
                    <hr className="mt-2" />
                </h1>
                <div className="md:overflow-none overflow-x-auto mb-8">
                    <TeacherDashboardNewAssignmentsTable newAssignment={newAssignment}/>
                </div>
            </div>
        </div>
    );
}

export default TeacherDashboard;
