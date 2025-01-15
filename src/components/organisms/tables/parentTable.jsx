import { useState, useEffect } from "react";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { deleteItem, getItem } from "../../../features/dashboardSharedApi/sharedReducer";
import Pagination from "../../common/pagination";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AddNewParentModal from "../modals/addNewParentModal";
import { Icons } from "../../../assets/icons";
import { paginate, calculateTotalPages } from "../../../utils/pagination"; 
import ViewAll from "../../common/viewAllFunctionality"; 

const ParentTable = ({
  setModalMode,
  modalMode,
  currentStudent,
  setCurrentStudent,
}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({});
  const [showAll, setShowAll] = useState(false); // State for ViewAll functionality
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of records per page

  const { parentData, loading, error, shouldReloadParentData } = useSelector(
    (state) => state.sharedApi
  );
  const tableData = parentData?.parents || [];

  useEffect(() => {
    dispatch(getItem({ role: "parent" }));
  }, [dispatch, shouldReloadParentData]);

  const handleDelete = (rowData) => {
    try {
      dispatch(deleteItem({ role: "parent", id: rowData.id }));
      toast.success("Parent deleted successfully!");
    } catch (error) {
      toast.error(error || "Failed to delete parent. Please fix errors.");
    }
  };

  const handleEdit = (rowData) => {
    setVisible(true);
    setModalMode("edit");
    setCurrentStudent(rowData);
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

  // Use the paginate function to get the paginated data
  const paginatedData = paginate(tableData, currentPage, pageSize);
  const totalPages = calculateTotalPages(tableData, pageSize);

  const columns = [
    {
      field: "serialNo",
      header: "S.No",
      body: (rowData, options) => options.rowIndex + 1 + (currentPage - 1) * pageSize,
    },
    { field: "name", header: "Name" },
    { field: "email", header: "Email" },
    { field: "phone", header: "Phone nu." },
    { field: "address", header: "Address" },
    { field: "gender", header: "Gender" },
    { field: "childName", header: "Child Name" },
    { field: "childClass", header: "Class" },
    { field: "childSection", header: "Section" },
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

  const displayedData = showAll ? tableData : paginatedData; 

  return (
    <>
      <Table
        data={displayedData}
        columns={columns}
        tableStyle={{ minWidth: "40rem", fontSize: "1.1rem" }}
      />
      
      {/* ViewAll functionality */}
      <ViewAll showAll={showAll} setShowAll={setShowAll} />

      {/* Pagination only if not showing all */}
      {!showAll && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {visible && (
        <AddNewParentModal
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

export default ParentTable;
