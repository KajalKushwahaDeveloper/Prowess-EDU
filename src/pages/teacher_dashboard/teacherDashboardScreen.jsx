import Card from "../../components/molecules/Card";
import TeacherDashboardNewAssignmentsTable from "../../components/organisms/tables/teacherDashboardNewAssignments";
import TeacherDashboardNewVideoTable from "../../components/organisms/tables/teacherDashboardNewVideoTable";

function TeacherDashboard() {
    const cardDetails = [
        {
            cardHeading: "Total added Video",
            totalNumber: "45",
            cardStyle: { backgroundColor: "#EEDFF7" },
        },
        {
            cardHeading: "Total Assignments",
            totalNumber: "58",
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
                    <TeacherDashboardNewVideoTable/>
                </div>
            </div>
            <div>
                <h1 className="text-black font-bold text-xl mb-4">
                    New Assignments
                    <hr className="mt-2" />
                </h1>
                <div className="md:overflow-none overflow-x-auto mb-8">
                    <TeacherDashboardNewAssignmentsTable/>
                </div>
            </div>
        </div>
    );
}

export default TeacherDashboard;
