import { useState } from "react";
import Button from "../../components/atoms/button";
import { Icons } from "../../assets/icons";
import StudentsTable from "../../components/organisms/tables/studentTable";
import Modal from "../../components/common/modal";
import AddNewTeacherModal from "../../components/organisms/modals/addNewStudentModal";

function AdminDashboardStudent() {
  const [visible, setVisible] = useState(false);
  const handleAddStudent = () => {
    setVisible(true);
  };
const headingName = "Add New Student";
  return (
    <div className="admin-dashboard m-6 dashboard">
      <div className="my-4 flex items-center justify-between">
        <h1 className="text-black font-bold text-3xl mb-4">Students</h1>
        <div className="flex items-center justify-center">
        <Button
          icon={Icons.plusIcon}
          onClick={handleAddStudent}
          backgroundColor="#00A943"
          label="Add new Student"
        />
        </div>
      </div>
      <hr />

      <div className="mt-4">
        <h1 className="text-black font-bold text-2xl mb-4">
          Student list
          <hr />
        </h1>
        <div className="md:overflow-none overflow-x-auto mb-16">
          <StudentsTable />
        </div>
      </div>
      <AddNewTeacherModal visible={visible} setVisible={setVisible}/>
      
    </div>
  );
}

export default AdminDashboardStudent;
