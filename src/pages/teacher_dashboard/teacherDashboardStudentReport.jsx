import { useState } from "react";
import Button from "../../components/atoms/button";
import { Icons } from "../../assets/icons";
import AddNewTeacherModal from "../../components/organisms/modals/addNewStudentModal";
import Pagination from "../../components/common/pagination"; // Import the reusable Pagination component
import TeacherDashboardStudentReportTable from "../../components/organisms/tables/teacherDashboardStudentReportTable";

const TeacherDashboardStudents = () => {
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
      <div className="my-8 flex items-start md:items-center justify-between flex-col sm:flex-row border-b-2 pb-2">
        <h1 className="text-black font-bold text-2xl mb-4">Students Report</h1>
        <div className="flex items-center justify-center">
          <Button
            icon={Icons.plusIcon}
            onClick={handleAddStudent}
            label="Create Report"
          />
        </div>
      </div>
      <hr />

      <div className="mt-4">
        <h1 className="text-black font-bold text-xl mb-4">
          Students Report
          <hr />
        </h1>
        <div className="md:overflow-none overflow-x-auto mb-16">
          <TeacherDashboardStudentReportTable students={paginatedStudents} />
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
      <AddNewTeacherModal visible={visible} setVisible={setVisible} />
    </div>
  );
}

export default TeacherDashboardStudents;
