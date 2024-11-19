import { useState } from "react";
import Button from "../../components/atoms/button";
import { Icons } from "../../assets/icons";
import ParentTable from "../../components/organisms/tables/parentTable";
import AddNewParentModal from "../../components/organisms/modals/addNewParentModal";
import Pagination from "../../components/common/pagination"; // Import the reusable Pagination component

function AdminDashboardParent() {
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
      <div className="my-4 flex justify-between md:items-center items-start md:flex-row flex-col">
        <h1 className="text-black font-bold text-2xl mb-4">Parent</h1>
        <Button
          icon={Icons.plusIcon}
          onClick={handleAddTeacher}
          label="Add new Parent"
        />
      </div>
      <hr />
      <div className="mt-4">
        <h1 className="text-black font-bold text-xl mb-4">
          Parent list
          <hr className="mb-2"/>
        </h1>
        <div className="md:overflow-none overflow-x-auto mb-16">
          <ParentTable />
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
      <AddNewParentModal visible={visible} setVisible={setVisible} />
    </div>
  );
}

export default AdminDashboardParent;
