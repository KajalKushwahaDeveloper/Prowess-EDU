import { useState } from "react";
import Button from "../../components/atoms/button";
import { Icons } from "../../assets/icons";
import Pagination from "../../components/common/pagination"; // Import the reusable Pagination component
import PreviousTimeTable from "../../components/organisms/tables/previousTimeTable";
import Calender from "../../components/atoms/calender";
import CreateTimeTableModal from "../../components/organisms/modals/createTimeTableModal";
import TimeTable from "../../components/organisms/tables/timetable";

const TeacherDashboardTimeTable = () => {
    const [visible, setVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10; // Define how many students to show per page
    const studentsData = []; // Replace this with your actual data array

    const handleAddStudent = () => {
        setVisible(true);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Calculate paginated data
    const paginatedStudents = studentsData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const headingName = "Add New Student";

    return (

        <div className="admin-dashboard m-6 dashboard">
            <div className="my-4 flex items-start md:items-center justify-between flex-col sm:flex-row">
                <h1 className="text-black font-bold text-2xl mb-4">Time Table</h1>
                <div className="flex items-center justify-center">
                    <Button
                        icon={Icons.plusIcon}
                        onClick={handleAddStudent}
                        label="Create Time Table"
                    />
                </div>
            </div>
            <hr />

            <div className="mt-4">
                
                <div className="md:overflow-none overflow-x-auto mb-16">
                    <TimeTable  />
                </div>
            </div>
            {/* Previous Time Table */}
            <div className="my-4 flex items-start md:items-center justify-between flex-col sm:flex-row">
             <div>   <h1 className="text-black font-bold text-2xl mb-4">Previous Time Table</h1></div>
                <div className="flex items-center justify-center">
                    <Calender />
                </div>
            </div>
            <hr />
            <div className="mt-8">
                <div className="md:overflow-none overflow-x-auto mb-16">
                    <PreviousTimeTable  />
                </div>
            </div>
            {/* Pagination Component */}
            <div className="flex items-center justify-center">
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(studentsData.length / pageSize)}
                    onPageChange={handlePageChange}
                />
            </div>
            <CreateTimeTableModal visible={visible} setVisible={setVisible} />
        </div>
    );
}

export default TeacherDashboardTimeTable;
