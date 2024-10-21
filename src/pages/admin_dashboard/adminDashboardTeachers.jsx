import Button from "../../components/atoms/button";
import { Icons } from "../../assets/icons";
import TeachersTable from "../../components/organisms/teachersTable";

function AdminDashboardTeachers() {

  const handleAddTeacher = () => {};

  return (
    <div className="admin-dashboard m-6 dashboard">
      <div className="my-4">
        <h1 className="text-black font-bold text-3xl mb-4">Teachers</h1>
        <Button
          icon={Icons.plusIcon}
          onClick={handleAddTeacher}
          label="Add new Teacher"
        />
      </div>
      <hr />
      <div>
        <h1 className="text-black font-bold text-2xl mb-4">
          Teacher list
          <hr />
        </h1>
        <div className="md:overflow-none overflow-x-auto mb-16">
          <TeachersTable />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardTeachers;
