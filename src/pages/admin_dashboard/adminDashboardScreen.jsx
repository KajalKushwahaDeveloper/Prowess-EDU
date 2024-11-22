import { useState } from "react";
import Button from "../../components/atoms/button";
import Card from "../../components/molecules/Card";
import { Icons } from "../../assets/icons";
import TeachersTable from "../../components/organisms/tables/teachersTable";
import StudentsTable from "../../components/organisms/tables/studentTable";
import AddNewTeacherModal from "../../components/organisms/modals/addNewTeacherModal";
import AddNewStudentModal from "../../components/organisms/modals/addNewStudentModal";

function AdminDashboard() {
  const [addTeacherModalVisible, setAddTeacherModalVisible] = useState(false);
  const [addStudentModalVisible, setAddStudentModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [currentTeacher, setCurrentTeacher] = useState(null); // For editing
  const [currentStudent, setCurrentStudent] = useState(null); // For editing

  console.log("currentStudent:", currentStudent);

  const cardDetails = [
    {
      cardHeading: "Total Teachers",
      totalNumber: "30",
      cardStyle: { backgroundColor: "#EEDFF7" },
    },
    {
      cardHeading: "Total Students",
      totalNumber: "550",
      cardStyle: { backgroundColor: "#DFEEF7" },
    },
  ];

  const handleAddTeacher = () => {

    setAddTeacherModalVisible(true);
  };
  const handleAddStudent = () => {

    setAddStudentModalVisible(true);
  };

  return (
    <div className="admin-dashboard m-6 dashboard z-1">
      <div className="my-4">
        <h1 className="text-black font-bold text-2xl mb-4">Dashboard</h1>
        <hr />
      </div>
      {/* <div className="flex flex-row items-center justify-start gap-6 md:flex-col md:gap-0 md:mb-8"> */}
      <div className=" flex  items-center  justify-center flex-col  gap-0 mb-8 md:flex md:flex-col md:items-center md:justify-start md:gap-0 md:mb-8 lg:flex lg:flex-row lg:gap-6">
        {cardDetails.map((currentData, index) => {
          return (
            <>
              <Card
                key={index}
                totalNumber={currentData.totalNumber}
                cardHeading={currentData.cardHeading}
                cardStyle={currentData.cardStyle}
              />
            </>
          );
        })}
        <div className="flex flex-col justify-center items-center gap-3">
          <Button
            icon={Icons.plusIcon}
            onClick={handleAddTeacher}
            label="Add new Teacher"
          />
          <Button
            icon={Icons.plusIcon}
            onClick={handleAddStudent}
            backgroundColor="#00A943"
            label="Add new Student"
          />
        </div>
      </div>
      <div>
        <h1 className="text-black font-bold text-xl mb-4">
          New joining (Teacher)
          <hr />
        </h1>
        <div className="md:overflow-none overflow-x-auto mb-8">
          <TeachersTable modalMode={modalMode} setModalMode={setModalMode} currentStudent={currentStudent} setCurrentStudent={setCurrentStudent} />
        </div>
      </div>
      <div>
        <h1 className="text-black font-bold text-xl mb-4">
          New joining (Student)
          <hr />
        </h1>
        <div className="md:overflow-none overflow-x-auto mb-8">
          <StudentsTable modalMode={modalMode} setModalMode={setModalMode} currentStudent={currentStudent} setCurrentStudent={setCurrentStudent} />
        </div>
      </div>
      <AddNewTeacherModal visible={addTeacherModalVisible} setVisible={setAddTeacherModalVisible} setModalMode={setModalMode} mode={modalMode} initialData={currentStudent} setCurrentStudent={setCurrentStudent} />

      <AddNewStudentModal visible={addStudentModalVisible} setVisible={setAddStudentModalVisible} setModalMode={setModalMode} mode={modalMode} initialData={currentStudent} setCurrentStudent={setCurrentStudent} />
    </div>
  );
}

export default AdminDashboard;
