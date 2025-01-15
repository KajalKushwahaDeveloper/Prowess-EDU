import { useState } from "react";
import Button from "../../components/atoms/button";
import { Icons } from "../../assets/icons";
import TeachersTable from "../../components/organisms/tables/teachersTable";
import AddNewTeacherModal from "../../components/organisms/modals/addNewTeacherModal";
import Pagination from "../../components/common/pagination"; // Import the reusable Pagination component
import { useDispatch , useSelector} from "react-redux";
import  Spinner  from "../../components/atoms/Loader";

function AdminDashboardTeachers() {
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [currentStudent, setCurrentStudent] = useState(null); // For editing
  const pageSize = 10; // Define how many students to show per page
  const studentsData = [];
  const { error,loading } = useSelector(
    (state) => state.sharedApi
  );
  const handleAddTeacher = () => {
    setVisible(true);
  };

  // Calculate paginated data
  const paginatedStudents = studentsData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (

    <div className="admin-dashboard m-6 dashboard">
      <div className="my-4 flex justify-between md:items-center items-start md:flex-row flex-col">
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
          <hr className="mb-2"/>
        </h1>
        <div className="md:overflow-none overflow-x-auto mb-16">
          <TeachersTable students={paginatedStudents} setModalMode={setModalMode} modalMode={modalMode} currentStudent={currentStudent} setCurrentStudent={setCurrentStudent}/>
        </div>
      </div>
      {/* Pagination Component */}
  
      <AddNewTeacherModal visible={visible} setVisible={setVisible} setModalMode={setModalMode} modalMode={modalMode} currentStudent={currentStudent} setCurrentStudent={setCurrentStudent} />
    </div>
    // )}
    // </>
  );
}

export default AdminDashboardTeachers;
