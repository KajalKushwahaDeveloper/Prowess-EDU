import { useState } from "react";
import Button from "../../components/atoms/button";
import { Icons } from "../../assets/icons";
import TeachersTable from "../../components/organisms/tables/teachersTable";
import Modal from "../../components/common/modal";
import AddNewTeacherModal from "../../components/organisms/modals/addNewTeacherModal";

function AdminDashboardTeachers() {
  const [visible, setVisible] = useState(false);

  const handleAddTeacher = () => {
    setVisible(true);
  };
  const headingName = "Add New Student";
  return (
    <div className="admin-dashboard m-6 dashboard">
      <div className="my-4 flex items-center justify-between">
        <h1 className="text-black font-bold text-3xl mb-4">Teachers</h1>
        <Button
          icon={Icons.plusIcon}
          onClick={handleAddTeacher}
          label="Add new Teacher"
        />
      </div>
      <hr />
      <div className="mt-4">
        <h1 className="text-black font-bold text-2xl mb-4">
          Teacher list
          <hr />
        </h1>
        <div className="md:overflow-none overflow-x-auto mb-16">
          <TeachersTable  />
        </div>
      </div>
      <AddNewTeacherModal visible={visible} setVisible={setVisible} />
    </div>
  );
}

export default AdminDashboardTeachers;
