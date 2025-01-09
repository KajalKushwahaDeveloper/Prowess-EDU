import { useState, useEffect } from "react";
import Button from "../../components/atoms/button";
import { Icons } from "../../assets/icons";
import StudentsTable from "../../components/organisms/tables/studentTable";
import AddNewStudentModal from "../../components/organisms/modals/addNewStudentModal";
import Pagination from "../../components/common/pagination";
import AddClassesModal from "../../components/organisms/modals/addClassesModal";
import Dropdown from "../../components/molecules/classDropdown";
import { getClassSection } from "../../features/dashboardSharedApi/classSectionReducer";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function AdminDashboardStudent() {
  const [visibleStudentModal, setVisibleStudentModal] = useState(false);
  const [visibleClassModal, setVisibleClassModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalMode, setModalMode] = useState("add");
  const [currentStudent, setCurrentStudent] = useState(null);
  const [classData, setClassData] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedClassSection, setSelectedClassSection] = useState(null);

  const dispatch = useDispatch();
  const pageSize = 10;

  // Fetch class-section data on mount
  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await dispatch(getClassSection()).unwrap();
        // Ensure the dropdown options are formatted as "Class-Section"
        const formattedData = response.map(
          (item) => `${item.Class}-${item.section}`
        );
        setClassData(formattedData || []);
      } catch (error) {
        toast.error(error || "Failed to fetch class data");
      }
    };
    fetchClassData();
  }, [dispatch]);

  // Handle class-section filtering
  const handleDropdownChange = (selectedValue) => {
    setSelectedClassSection(selectedValue);

    if (selectedValue) {
      const filtered = studentsData.filter(
        (student) => `${student.Class}-${student.section}` === selectedValue
      );
      setFilteredStudents(filtered);
      setCurrentPage(1); // Reset pagination
    } else {
      setFilteredStudents(studentsData); // Show all students if no filter is selected
    }
  };

  // Handle pagination changes
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Get paginated data for display
  const paginatedStudentsToDisplay = filteredStudents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="admin-dashboard m-6 dashboard">
      {/* Header */}
      <div className="my-4 flex justify-between items-center flex-wrap">
        <h1 className="text-black font-bold text-2xl">Students</h1>
        <div className="flex gap-4">
          <Button
            icon={Icons.plusIcon}
            onClick={() => setVisibleStudentModal(true)}
            backgroundColor="#00A943"
            label="Add New Student"
          />
          <Button
            icon={Icons.plusIcon}
            onClick={() => setVisibleClassModal(true)}
            label="Add Class"
          />
        </div>
      </div>
      <hr className="mb-4" />

      {/* Class-Section Filter */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-black font-bold text-xl">Student List</h2>
        <Dropdown
          name="classSectionDropdown"
          onChange={(e) => handleDropdownChange(e.value)} // Pass the selected value
          customClass="w-full max-w-md"
          disabled={false}
          options={classData.map((item) => ({ label: item, value: item }))} // Convert to label-value pairs
        />
      </div>
      <hr />

      {/* Students Table */}
      <div className="mt-4">
        <div className="overflow-x-auto">
          <StudentsTable
            students={paginatedStudentsToDisplay}
            setModalMode={setModalMode}
            modalMode={modalMode}
            currentStudent={currentStudent}
            setCurrentStudent={setCurrentStudent}
            selectedClassSection={selectedClassSection}
          />
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredStudents.length / pageSize)}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Modals */}
      <AddNewStudentModal
        visible={visibleStudentModal}
        setVisible={setVisibleStudentModal}
        setModalMode={setModalMode}
        modalMode={modalMode}
        currentStudent={currentStudent}
        setCurrentStudent={setCurrentStudent}
      />
      <AddClassesModal
        visible={visibleClassModal}
        setVisible={setVisibleClassModal}
      />
    </div>
  );
}

export default AdminDashboardStudent;
