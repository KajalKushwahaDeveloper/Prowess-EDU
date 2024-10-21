import Button from "../../components/atoms/button";
import { Icons } from "../../assets/icons";
import StudentsTable from "../../components/organisms/studentTable";

function AdminDashboard() {
  const handleAddStudent = () => {};

  return (
    <div className="admin-dashboard m-6 dashboard">
      <div className="my-4">
        <h1 className="text-black font-bold text-3xl mb-4">Students</h1>
        <Button
          icon={Icons.plusIcon}
          onClick={handleAddStudent}
          backgroundColor="#00A943"
          label="Add new Student"
        />
      </div>
      <hr />

      <div>
        <h1 className="text-black font-bold text-2xl mb-4">
          Student list
          <hr />
        </h1>
        <div className="md:overflow-none overflow-x-auto mb-16">
          <StudentsTable />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
