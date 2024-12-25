import { useState } from "react";
import Button from "../../components/atoms/button";
import { Icons } from "../../assets/icons";
import CreateReportModal from "../../components/organisms/modals/createReportModal";
import Pagination from "../../components/common/pagination";
import TeacherDashboardStudentReportTable from "../../components/organisms/tables/teacherDashboardStudentReportTable";

const TeacherDashboardStudents = () => {
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalMode, setModalMode] = useState("add"); // Default to "add"
  const [currentStudent, setCurrentStudent] = useState(null);
  const [filteredReports, setFilteredReports] = useState([]); // For local filtering

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


  return (
    <div className="admin-dashboard m-6 dashboard">
      <div className="my-4 flex items-start md:items-center justify-between flex-col sm:flex-row pb-2">
        <h1 className="text-black font-bold text-2xl mb-2">Students Report</h1>
        <div className="flex items-center justify-center">
          <Button
            icon={Icons.plusIcon}
            onClick={handleAddStudent}
            label="Create Report"
          />
        </div>
      </div>
      <hr />

      <div className="mt-8">
        <h1 className="text-black font-bold text-xl mb-4">
          Students Report
          <hr className="mt-2" />
        </h1>
        <div className="md:overflow-none overflow-x-auto mb-16">
          <TeacherDashboardStudentReportTable filteredReports={filteredReports} setFilteredReports={setFilteredReports} students={paginatedStudents} setModalMode={setModalMode} modalMode={modalMode} currentStudent={currentStudent} setCurrentStudent={setCurrentStudent} />
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
      <CreateReportModal visible={visible} setVisible={setVisible} setModalMode={setModalMode} modalMode={modalMode} currentStudent={currentStudent} setCurrentStudent={setCurrentStudent}/>
    </div>
  );
}

export default TeacherDashboardStudents;
