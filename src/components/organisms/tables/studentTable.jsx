import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import ViewAll from "../../common/viewAllFunctionality";
import Pagination from "../../common/pagination";
import {
  getItem,
  deleteItem,
} from "../../../features/dashboardSharedApi/sharedReducer";
import { paginate, calculateTotalPages } from "../../../utils/pagination";
import AddNewStudentModal from "../modals/addNewStudentModal";
import A_D_ViewStudentInfoModal from "../modals/viewStudentListADModal";
import ClassFilterDropdown from "../../molecules/filterClassDropdown";

const StudentsTable = ({
  setModalMode,
  modalMode,
  currentStudent,
  setCurrentStudent,
}) => {
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleShowDetailsModal, setVisibleShowdetailsModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedClassSection, setSelectedClassSection] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;

  const { studentData, loading, error, shouldReloadStudentData } = useSelector(
    (state) => state.sharedApi
  );
  const tableData = studentData?.students || [];

  useEffect(() => {
    dispatch(getItem({ role: "student" }));
  }, [dispatch, shouldReloadStudentData]);

  // Filter students dynamically based on selected class-section
  const filteredStudents = selectedClassSection
    ? tableData.filter((student) => {
        const [selectedClass, selectedSection] = selectedClassSection.split("-");
        return (
          String(student.Class) === selectedClass &&
          String(student.section) === selectedSection
        );
      })
    : tableData;

  const handleDelete = (rowData) => {
    try {
      dispatch(deleteItem({ role: "student", id: rowData.id }));
      toast.success("Student deleted successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error || "Failed to delete student. Please fix errors.");
    }
  };

  const handleEdit = (rowData) => {
    setVisible(true);
    setModalMode("edit");
    setCurrentStudent(rowData);
  };

  const handleView = (rowData) => {
    setSelectedStudent(rowData);
    setVisibleShowdetailsModal(true);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDropdownChange = (value) => {
    setSelectedClassSection(value);
    setCurrentPage(1); // Reset to the first page when the filter changes
  };

  const columns = [
    { field: "sID", header: "Id" },
    { field: "RegNo", header: "Reg No." },
    { field: "name", header: "Student Name" },
    { field: "email", header: "Email" },
    { field: "parentPhone", header: "Phone No." },
    {
      header: "Class",
      body: (rowData) =>
        rowData.Class && rowData.section
          ? `${rowData.Class}-${rowData.section}`
          : "N/A",
    },
    {
      field: "password",
      header: "Password",
      body: (rowData) => (
        <div className="flex items-center space-x-2">
          <span>••••••••••</span>
        </div>
      ),
    },
    {
      field: "Action",
      header: "Action",
      body: (rowData) => (
        <div className="flex space-x-2">
          <Button
            backgroundColor="#FF8A00"
            icon={Icons.editIcon}
            onClick={() => handleEdit(rowData)}
          />
          <Button
            backgroundColor="#FF4D00"
            icon={Icons.deleteIcon}
            onClick={() => handleDelete(rowData)}
          />
          <Button
            backgroundColor="#00A943"
            icon={Icons.viewIcon}
            onClick={() => handleView(rowData)}
          />
        </div>
      ),
    },
  ];

  const displayedData = showAll
    ? filteredStudents
    : paginate(filteredStudents, currentPage, pageSize);

  const totalPages = calculateTotalPages(filteredStudents, pageSize);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-black font-bold text-xl">Student List</h2>
        <ClassFilterDropdown
          name="classSectionDropdown"
          value={selectedClassSection}
          onChange={handleDropdownChange}
          customClass="w-60"
          placeholder="Select Class-Section"
        />
      </div>
      <hr />
      <Table
        data={displayedData}
        columns={columns}
        tableStyle={{ minWidth: "40rem", fontSize: "1.1rem" }}
      />
      <ViewAll showAll={showAll} setShowAll={setShowAll} />
      {!showAll && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      {visible && (
        <AddNewStudentModal
          visible={visible}
          setVisible={setVisible}
          mode={modalMode}
          initialData={currentStudent}
          onHide={() => setVisible(false)}
        />
      )}
      {visibleShowDetailsModal && (
        <A_D_ViewStudentInfoModal
          visible={visibleShowDetailsModal}
          setVisible={setVisibleShowdetailsModal}
          onHide={() => setVisibleShowdetailsModal(false)}
          selectedStudent={selectedStudent}
        />
      )}
    </>
  );
};

export default StudentsTable;
