import { useState, useEffect } from "react";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import {
  getItem,
  deleteItem,
} from "../../../features/dashboardSharedApi/sharedReducer";
import { toast } from "react-toastify";
import AddNewTeacherModal from "../modals/addNewTeacherModal";
import ViewAll from "../../common/viewAllFunctionality";
import Pagination from "../../common/pagination";
import { paginate, calculateTotalPages } from "../../../utils/pagination";
import { useDispatch, useSelector } from "react-redux";
import { Icons } from "../../../assets/icons";
import { Rating } from "primereact/rating";

const TeachersTable = ({
  setModalMode,
  modalMode,
  currentStudent,
  setCurrentStudent,
}) => {
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);
  const [visible, setVisible] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2; // Number of records per page

  const { teacherData, loading, error, shouldReloadTeacherData } = useSelector(
    (state) => state.sharedApi
  );

  useEffect(() => {
    dispatch(getItem({ role: "teacher" }));
  }, [dispatch, shouldReloadTeacherData]);

  const handleEdit = (rowData) => {
    setVisible(true);
    setModalMode("edit");
    setCurrentStudent(rowData);
  };

  const handleDelete = async (rowData) => {
    try {
      await dispatch(deleteItem({ role: "teacher", id: rowData.id }));
      toast.success("Teacher deleted successfully!");
    } catch (error) {
      console.error("error:", error);
      toast.error(error || "Failed to delete teacher. Please fix errors.");
    }
  };

  const togglePasswordVisibility = (id) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const columns = [
    {
      field: "serialNo",
      header: "S.No",
      body: (rowData, options) =>
        options.rowIndex + 1 + (currentPage - 1) * pageSize,
    },
    { field: "name", header: "Teacher Name" },
    { field: "email", header: "Email" },
    { field: "phone", header: "Phone Number" },
    { field: "qualification", header: "Qualification" },
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
      header: "Range",
      body: (rowData) => `${rowData.startRange}-${rowData.endRange}`,
    },
    {
      header: "Rating",
      body: (rowData) => (
        <Rating
          value={rowData.rating}
          cancel={false}
          readOnly
          onIcon={
            <i
              className="pi pi-star-fill"
              style={{ fontSize: "15px", color: "#007bff" }}
            ></i>
          }
          offIcon={<i className="pi pi-star" style={{ fontSize: "15px" }}></i>}
        />
      ),
    },
    {
      field: "Action",
      header: "Action",
      body: (rowData) => (
        <div className="flex justify-center space-x-2">
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
        </div>
      ),
    },
  ];

  const tableData = teacherData?.teachers || [];
  const sortedTableData = [...tableData].sort((a, b) => b.rating - a.rating);

  // Use pagination or show all data
  const displayedData = showAll
    ? sortedTableData
    : paginate(sortedTableData, currentPage, pageSize);

  const totalPages = calculateTotalPages(sortedTableData, pageSize);

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
      {!showAll && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      {visible && (
        <AddNewTeacherModal
          visible={visible}
          setVisible={setVisible}
          mode={modalMode}
          initialData={currentStudent}
          onHide={() => setVisible(false)}
        />
      )}
    </>
  );
};

export default TeachersTable;
