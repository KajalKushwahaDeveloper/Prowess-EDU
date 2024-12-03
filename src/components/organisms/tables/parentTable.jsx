import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useState, useEffect } from "react";
import {
  deleteItem,
  getItem,
} from "../../../features/dashboardSharedApi/sharedReducer";
import ViewAll from "../../common/viewAllFunctionality";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AddNewParentModal from "../modals/addNewParentModal";
import { Icons } from "../../../assets/icons";

const ParentTable = ({ setModalMode, modalMode, currentStudent, setCurrentStudent }) => {
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);
  const [visible, setVisible] = useState(false);


  const { parentData, loading, error, shouldReloadParentData } = useSelector(
    (state) => state.sharedApi
  );
  const tableData = parentData?.parents;

  useEffect(() => {
    dispatch(getItem({ role: "parent" }));
  }, [dispatch, shouldReloadParentData]);

  const handleDelete = (rowData) => {
    try {
      dispatch(deleteItem({ role: "parent", id: rowData.id }));
      toast.success("Parent delete successfully! ");
    } catch (error) {
      console.log("error:", error);
      toast.error(error || "Failed to delete parent. Please fix errors.");
    }
  };
  const handleEdit = (rowData) => {
    setVisible(true)
    setModalMode("edit")
    setCurrentStudent(rowData)
  }
  const handleReload = () => {
    // Dispatch an action to trigger data reload
    dispatch(getItem({ role: "parent" }));
    toast.info("Data reloaded successfully!");
  };
  const columns = [
    { field: "id", header: "Id" },
    { field: "name", header: "Name" },
    { field: "email", header: "Email" },
    { field: "phone", header: "Phone nu." },
    { field: "address", header: "Address" },
    { field: "gender", header: "Gender" },
    { field: "childName", header: "Child Name" },
    { field: "childClass", header: "Class" },
    { field: "childSection", header: "Section" },
    {
      field: "Action",
      header: "Action",
      body: (rowData) => (
        <div className="flex justify-center space-x-2">
          <Button
              backgroundColor="#FF8A00"
              icon={Icons.editIcon}
              onClick={() => handleEdit(rowData)}
            // onClick={() => setVisible(true)}
            />
            <Button
              backgroundColor="#004871"
              icon={Icons.reloadIcon}
              onClick={handleReload}
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
  const displayData = showAll ? tableData : tableData?.slice(0, 2);

  return (
    <>
      {/* <ToastContainer /> */}
      <Table
        data={displayData}
        columns={columns}
        tableStyle={{ minWidth: "40rem", fontSize: "1.1rem" }}
      />
      <ViewAll showAll={showAll} setShowAll={setShowAll} />
      {
        visible && (
          <AddNewParentModal
            visible={visible}
            setVisible={setVisible}
            mode={modalMode}
            initialData={currentStudent}
            onHide={() => setVisible(false)}
          />
        )
      }
    </>
  );
};

export default ParentTable;
