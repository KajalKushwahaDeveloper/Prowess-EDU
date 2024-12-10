import Card from "../../components/molecules/Card";
import StudentDashboardNewVideoTable from "../../components/organisms/tables/studentDashboardNewVideoTable";
import StudentDashboardNewAssignmentsTable from "../../components/organisms/tables/studentDashboardNewAssignments";
import { useSelector } from "react-redux";

function StudentDashboard() {
  const { videoData } = useSelector(
    (state) => state.studentDashboardNewVideosSharedApi
  );
  const { data } = useSelector(
    (state) => state.studentDashboardNewAssignSharedApi
  );
  
  const cardDetails = [
    {
      cardHeading: "Assigned Video",
      totalNumber: videoData?.videosCount || 0,
      cardStyle: { backgroundColor: "#EEDFF7" },
    },
    {
      cardHeading: "Assignments Tests",
      totalNumber: data?.assignmentsCount || 0,
      cardStyle: { backgroundColor: "#DFEEF7" },
    },
    {
      cardHeading: "Online Class",
      totalNumber: "1",
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
          <StudentDashboardNewVideoTable />
        </div>
      </div>
      <div>
        <h1 className="text-black font-bold text-xl mb-4">
          New Assignments
          <hr className="mt-2" />
        </h1>
        <div className="md:overflow-none overflow-x-auto mb-8">
          <StudentDashboardNewAssignmentsTable />
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
