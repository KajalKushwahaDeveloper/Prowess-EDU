import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useState, useEffect } from "react";
import { getItem } from "../../../features/dashboardSharedApi/sharedReducer";
import ViewAll from "../../common/viewAllFunctionality"
import { useDispatch, useSelector } from "react-redux";

const ParentTable = () => {
    const dispatch = useDispatch();
    const [showAll, setShowAll] = useState(false);
    const [selectedRole, setSelectedRole] = useState("parent");
    
    const { data, loading, error } = useSelector((state) => state.sharedApi);
    const tableData = data?.parents;
  
    useEffect(() => {
        if (selectedRole) {
            dispatch(getItem({ role: selectedRole }));
        }
    }, [dispatch, selectedRole]);

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
                    // onClick={() => handleEdit(rowData)}
                    backgroundColor="#FF8A00"
                    icon="pi pi-pencil" // Use PrimeIcons for consistency
                    className="p-button-rounded p-button-warning p-1"
                />
                <Button
                    // onClick={() => handleReload(rowData)}
                    backgroundColor="#004871"
                    icon="pi pi-refresh"
                    className="p-button-rounded p-button-info p-1"
                />
                <Button
                    // onClick={() => handleDelete(rowData)}
                    backgroundColor="#FF4D00"
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger p-1"
                />
            </div>
        )
    },
];
const displayData = showAll ? tableData : tableData?.slice(0,2)

return (
    <>
    <Table
        data={displayData}
        columns={columns}
        tableStyle={{ minWidth: "40rem", fontSize: "1.1rem"}}
    />
     <ViewAll showAll={showAll} setShowAll={setShowAll}/>
    </>
);
};

export default ParentTable;