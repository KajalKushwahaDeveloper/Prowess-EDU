import { useState } from "react";
import Button from "../../components/atoms/button";
import { Icons } from "../../assets/icons";
import TeachersTable from "../../components/organisms/tables/teachersTable";
import Modal from "../../components/common/modal";
import AddNewTeacherModal from "../../components/organisms/modals/addNewTeacherModal";
import Pagination from "../../components/common/pagination"; // Import the reusable Pagination component

function AdminDashboardTeachers() {
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Define how many students to show per page
  const studentsData = [];

  const handleAddTeacher = () => {
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
      <div className="my-4 flex items-center justify-between flex-col sm:flex-row">
        <h1 className="text-black font-bold text-2xl mb-4">Teachers</h1>
        <Button
          icon={Icons.plusIcon}
          onClick={handleAddTeacher}
          label="Add new Teacher"
        />
      </div>
      <hr />
      <div className="mt-4">
        <h1 className="text-black font-bold text-xl mb-4">
          Teacher list
          <hr />
        </h1>
        <div className="md:overflow-none overflow-x-auto mb-16">
          <TeachersTable />
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

export default AdminDashboardTeachers;
