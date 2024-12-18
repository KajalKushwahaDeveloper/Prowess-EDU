import { useState, useEffect } from "react";
import Button from "../../components/atoms/button";
import { Icons } from "../../assets/icons";
import Pagination from "../../components/common/pagination"; // Import the reusable Pagination component
import AddNewAssignmentModal from "../../components/organisms/modals/addNewAssignmentModal";
import AssignmentTable from "../../components/organisms/tables/assignmentTable";
import TestTable from "../../components/organisms/tables/testTable";
import AddNewTestModal from "../../components/organisms/modals/addNewTestModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteAssign, getAssignForTeacher } from "../../features/dashboardSharedApi/teacherDashboardAssignReducer";


const TeacherDashboardAssignment = () => {
  const [assignmentVisible, setAssignmentVisible] = useState(false);
  const [testVisible, setTestVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("Assignment");
  const [modalMode, setModalMode] = useState("add"); // Default to "add"
  const [currentAssignment, setCurrentAssignment] = useState(null); // State to manage active tab
  // const [assignmentId, setAssignmentId] = useState(null); // State to manage active tab

  const pageSize = 10; // Define how many students to show per page
  const studentsData = []; // Replace this with your actual data array
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.teacherDashboardAssignSharedApi);
const assignmentId = JSON.parse(localStorage.getItem("data"))



      useEffect(() => {
          // Fetch reports on mount
          dispatch(getAssignForTeacher())
              .unwrap()
              .then((response) => setCurrentAssignment(response?.data?.assignments)
          
          ) // Initialize local state
              .catch((err) => {
                  toast.error(error || "Failed to fetch reports");
              });
      }, [dispatch]);

  const handleCreateAssignment = () => {
    setAssignmentVisible(true);
  };
  const handleCreateTest = () => {
    setTestVisible(true);
  }
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
      <div className="my-8 flex items-start md:items-center justify-between flex-col sm:flex-row border-b-2 pb-2">
        <h1 className="text-black font-bold text-2xl mb-4">Assignment & Test</h1>
        <div className="flex items-center justify-center">
          {
            activeTab === "Test"
              ? <Button
                icon={Icons.plusIcon}
                onClick={handleCreateTest}
                label="Create Test"
              />
              : <Button
                icon={Icons.plusIcon}
                onClick={handleCreateAssignment}
                label="Create Assignment"
              />
          }
        </div>
      </div>

      {/* Tab Header */}
      <div className="w-full mx-auto p-2 ">
        <div className="flex space-x-6 border-b-2 pb-2">
          <button
            onClick={() => setActiveTab("Assignment")}
            className={`text-xl font-semibold ${activeTab === "Assignment" ? "text-[#004871]  border-[#004871]" : "text-gray-500"}`}
          >
            Assignment
          </button>
          <button
            onClick={() => setActiveTab("Test")}
            className={`text-xl font-semibold ${activeTab === "Test" ? "text-[#004871]  border-[#004871]" : "text-gray-500"}`}
          >
            Test
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="w-full mx-auto p-6 bg-gray-50">
        {activeTab === "Assignment" && <AssignmentTable setModalMode={setModalMode} modalMode={modalMode} currentAssignment={currentAssignment} setCurrentAssignment={setCurrentAssignment} />}


        {activeTab === "Test" && <TestTable setModalMode={setModalMode} modalMode={modalMode} currentStudent={currentStudent} setCurrentStudent={setCurrentStudent} />}
      </div>

      {/* Pagination Component */}
      <div className="flex items-center justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(studentsData.length / pageSize)}
          onPageChange={handlePageChange}
        />
      </div>
      {
        assignmentVisible && <AddNewAssignmentModal visible={assignmentVisible} setVisible={setAssignmentVisible} setModalMode={setModalMode} modalMode={modalMode} initialData={currentAssignment} setCurrentAssignment={setCurrentAssignment} assignmentId={assignmentId.id} />
      }
      {
        testVisible && <AddNewTestModal visible={testVisible} setVisible={setTestVisible} setModalMode={setModalMode} modalMode={modalMode} initialData={currentStudent} setCurrentStudent={setCurrentStudent} />
      }

    </div>
  );
}

export default TeacherDashboardAssignment;