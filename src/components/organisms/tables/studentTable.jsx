import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useState, useEffect } from "react";
import {
  getItem,
  deleteItem,
} from "../../../features/dashboardSharedApi/sharedReducer";
import ViewAll from "../../common/viewAllFunctionality";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AddNewStudentModal from "../modals/addNewStudentModal";
import A_D_ViewStudentInfoModal from "../modals/viewStudentListADModal";

const StudentsTable = ({
  setModalMode,
  modalMode,
  currentStudent,
  setCurrentStudent,
  selectedClassSection,
}) => {
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);
  const [visible, setVisible] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({});
  const [visibleShowDetailsModal, setVisibleShowdetailsModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

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
        if (!student.Class || !student.section) return false; // Skip invalid entries
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

  const handView = (rowData) => {
    setSelectedStudent(rowData);
    setVisibleShowdetailsModal(true);
  };

  const togglePasswordVisibility = (id) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const columns = [
    {
      field: "sID",
      header: "Id",
    },
    {
      field: "RegNo",
      header: "Reg No.",
    },
    { field: "name", header: "Student Name" },
    { field: "email", header: "Email" },
    { field: "parentPhone", header: "Phone No." },
    {
      header: "Class",
      body: (rowData) => {
        return rowData.Class && rowData.section
          ? `${rowData.Class}-${rowData.section}`
          : "N/A";
      },
    },
    {
      field: "password",
      header: "Password",
      body: (rowData) => (
        <div className="flex items-center space-x-2">
          <span>
            {passwordVisibility[rowData.id] ? rowData.password : "••••••••••"}
          </span>
          <i
            className="pi pi-info-circle cursor-pointer text-blue-600"
            onClick={() => togglePasswordVisibility(rowData.id)}
            title={
              passwordVisibility[rowData.id] ? "Hide Password" : "Show Password"
            }
          ></i>
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
            onClick={() => handView(rowData)}
          />
        </div>
      ),
    },
  ];

  const displayedData = showAll
    ? filteredStudents
    : filteredStudents.slice(0, 2);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Table
        data={displayedData}
        columns={columns}
        tableStyle={{ minWidth: "40rem", fontSize: "1.1rem" }}
      />
      <ViewAll showAll={showAll} setShowAll={setShowAll} />

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
          onHide={() => setVisible(false)}
          selectedStudent={selectedStudent}
        />
      )}
    </>
  );
};

export default StudentsTable;
