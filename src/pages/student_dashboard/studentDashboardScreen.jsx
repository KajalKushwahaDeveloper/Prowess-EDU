import Button from "../../components/atoms/button";
import { Icons } from "../../assets/icons";
import Card from "../../components/molecules/Card";
import StudentDashboardNewVideoTable from "../../components/organisms/tables/studentDashboardNewVideoTable";
import StudentDashboardNewAssignmentsTable from "../../components/organisms/tables/studentDashboardNewAssignments";

function StudentDashboard() {
    const cardDetails = [
        {
            cardHeading: "Assigned Video",
            totalNumber: "6",
            cardStyle: { backgroundColor: "#EEDFF7" },
        },
        {
            cardHeading: "Assignments Tests",
            totalNumber: "3",
            cardStyle: { backgroundColor: "#DFEEF7" },
        },
        {
            cardHeading: "Online Class",
            totalNumber: "1",
            cardStyle: { backgroundColor: "#B2DCF4" },
        },
    ];
    const handleAddTeacher = () => {

        setAddTeacherModalVisible(true);
    };
    const handleAddStudent = () => {

        setAddStudentModalVisible(true);
    };

    return (
        <div className="admin-dashboard m-6 dashboard z-1">
            <div className="my-4">
                <h1 className="text-black font-bold text-3xl mb-4">Dashboard</h1>
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
                <h1 className="text-black font-bold text-2xl mb-4">
                    New Video
                    <hr />
                </h1>
                <div className="md:overflow-none overflow-x-auto mb-16">
                    <StudentDashboardNewVideoTable />
                </div>
            </div>
            <div>
                <h1 className="text-black font-bold text-2xl mb-4">
                    New Assignments
                    <hr />
                </h1>
                <div className="md:overflow-none overflow-x-auto mb-16">
                    <StudentDashboardNewAssignmentsTable />
                </div>
            </div>
        </div>
    );
}

export default StudentDashboard;
