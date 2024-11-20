import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useState, useEffect } from "react";
import { getItem } from "../../../features/dashboardSharedApi/sharedReducer";
import ViewAll from "../../common/viewAllFunctionality"
import { useDispatch, useSelector } from "react-redux";

const StudentsTable = () => {
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);
  const [selectedRole, setSelectedRole] = useState("student");
  
  const { data, loading, error } = useSelector((state) => state.sharedApi);
  const tableData = data?.students;

  useEffect(() => {
      if (selectedRole) {
          dispatch(getItem({ role: selectedRole }));
      }
  }, [dispatch, selectedRole]);
  
  const columns = [
    { field: "id", header: "Id" },
    { field: "name", header: "Teacher name" },
    { field: "email", header: "Email" },
    { field: "phone", header: "Phone nu." },
    { field: "class", header: "Class" },
    {
      field: "Action",
      header: "Action",
      body: () => {
        return (
          <div className="flex space-x-2">
            <Button
              backgroundColor="#FF8A00"
              icon={Icons.editIcon}
              />
            <Button
              backgroundColor="#004871"
              icon={Icons.reloadIcon}
              />
            <Button
              backgroundColor="#FF4D00"
              icon={Icons.deleteIcon}
              />
          </div>
        );
      },
    },
  ];
  
  const displayedData = showAll ? tableData : tableData?.slice(0, 2);
  return (
    <>
      <Table
        data={displayedData}
        columns={columns}
        tableStyle={{ minWidth: "40rem", fontSize: "1.1rem" }}
      />
    <ViewAll showAll={showAll} setShowAll={setShowAll}/>
    </>
  );
};

export default StudentsTable;
