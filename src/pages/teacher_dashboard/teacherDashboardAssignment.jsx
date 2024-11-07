import { useState } from "react";
import Button from "../../components/atoms/button";
import { Icons } from "../../assets/icons";
import StudentsTable from "../../components/organisms/tables/studentTable";
import Modal from "../../components/common/modal";
import AddNewTeacherModal from "../../components/organisms/modals/addNewStudentModal";
import Pagination from "../../components/common/pagination"; // Import the reusable Pagination component
import TeacherDashboardStudentReportTable from "../../components/organisms/tables/teacherDashboardStudentReportTable";
import TodayTopicVideoTable from "../../components/organisms/tables/todaysTopicVideo";
import AddNewVideoModal from "../../components/organisms/modals/addNewVideomodal";

const TeacherDashboardAssignment = () => {
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
        <h1 className="text-black font-bold text-2xl mb-4">Assignment & Test</h1>
        <div className="flex items-center justify-center">
          <Button
            icon={Icons.plusIcon}
            onClick={handleAddStudent}
            label="Create Assignment"
          />
        </div>
      </div>
      <hr />

      <div className="mt-4">
        <h1 className="text-black font-bold text-xl mb-4">
        Assignment
          <hr />
        </h1>
        <div className="md:overflow-none overflow-x-auto mb-16">
          <TodayTopicVideoTable students={paginatedStudents} />
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
      <AddNewVideoModal visible={visible} setVisible={setVisible} />
    </div>
  );
}

export default TeacherDashboardAssignment;