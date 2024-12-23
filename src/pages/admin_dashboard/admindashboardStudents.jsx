import { useState } from "react";
import Button from "../../components/atoms/button";
import { Icons } from "../../assets/icons";
import StudentsTable from "../../components/organisms/tables/studentTable";
import Modal from "../../components/common/modal";
import AddNewStudentModal from "../../components/organisms/modals/addNewStudentModal";
import Pagination from "../../components/common/pagination"; // Import the reusable Pagination component
import { useDispatch , useSelector} from "react-redux";
import  Spinner  from "../../components/atoms/Loader";

function AdminDashboardStudent() {
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [currentStudent, setCurrentStudent] = useState(null); // For editing
  const { error,loading } = useSelector(
    (state) => state.studentDashboardFaqSharedApi
  );
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
    <>
    {loading ? ( // Show loader while loading
        <div className="flex justify-center items-center h-45">
        <Spinner /> {/* Replace with your actual spinner component */}
      </div>
    ) : (
    <div className="admin-dashboard m-6 dashboard">
      <div className="my-4 flex justify-between md:items-center items-start md:flex-row flex-col">
        <h1 className="text-black font-bold text-2xl mb-4">Students</h1>
        <div className="flex items-center justify-center">
          <Button
            icon={Icons.plusIcon}
            onClick={handleAddStudent}
            backgroundColor="#00A943"
            label="Add new Student"
          />
        </div>
      </div>
       <hr className="mb-4"/>

      <div className="mt-4">
        <h1 className="text-black font-bold text-xl mb-4">
          Student list
          <hr />
        </h1>
        <div className="md:overflow-none overflow-x-auto mb-16">
          <StudentsTable students={paginatedStudents} setModalMode={setModalMode} modalMode={modalMode} currentStudent={currentStudent} setCurrentStudent={setCurrentStudent}/>
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
      <AddNewStudentModal visible={visible} setVisible={setVisible} setModalMode={setModalMode} modalMode={modalMode} currentStudent={currentStudent} setCurrentStudent={setCurrentStudent}/>
    </div>
    )}
    </>
  );
}

export default AdminDashboardStudent;
