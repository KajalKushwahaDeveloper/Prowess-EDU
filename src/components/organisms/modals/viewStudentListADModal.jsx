import Modal from "../../common/modal";
import ButtonText from "../../atoms/buttonText";

const ViewADStudentInfoModal = ({
  visible,
  setVisible,
  selectedStudent, // Receive selectedStudent as a prop
}) => {
  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      style={{ width: "50vw", maxWidth: "700px" }}
      onHide={() => setVisible(false)}
      className="rounded-lg"
    >
      <div className="bg-white m-4">
        <h1 className="font-semibold text-3xl my-2">Student Details</h1>
        <hr className="mb-8 border-gray-300" />

        {selectedStudent ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-0 md:gap-x-8">
            <div className="text-lg font-semibold">
              
              <h1 className="mb-2">
                Name:{" "}
                <span className="font-normal">
                  {selectedStudent.name || "N/A"}
                </span>
              </h1>
              <h1 className="mb-2">
                Student School Name:{" "}
                <span className="font-normal">
                  {selectedStudent.schoolName || "N/A"}
                </span>
              </h1>
     
              <h1 className="mb-2">
                Class:{" "}
                <span className="font-normal">
                  {selectedStudent.Class || "N/A"}
                </span>
              </h1>
             
              <h1 className="mb-2">
                Email:{" "}
                <span className="font-normal">
                  {selectedStudent.email || "N/A"}
                </span>
              </h1>
              
              <h1 className="mb-2">
                Parent Name:{" "}
                <span className="font-normal">
                  {selectedStudent.parentName || "N/A"}
                </span>
              </h1>
              <h1 className="mb-2">
                Subjects:{" "}
                <span className="font-normal">
                  {Array.isArray(selectedStudent.subjects)
                    ? selectedStudent.subjects.join(", ")
                    : selectedStudent.subjects?.split(",").join(", ") || "N/A"}
                </span>
              </h1>
            </div>
            
            <div className="text-lg font-semibold">
            <h1 className="mb-2">
                Registration No:{" "}
                <span className="font-normal">
                  {selectedStudent.RegNo || "N/A"}
                </span>
              </h1> 
              <h1 className="mb-2">
                Student School Address:{" "}
                <span className="font-normal">
                  {selectedStudent.schoolAddress || "N/A"}
                </span>
              </h1>
              <h1 className="mb-2">
                Gender:{" "}
                <span className="font-normal">
                  {selectedStudent.gender || "N/A"}
                </span>
              </h1>
              <h1 className="mb-2">
                Section:{" "}
                <span className="font-normal">
                  {selectedStudent.section || "N/A"}
                </span>
              </h1>
              <h1 className="mb-2">
                Address:{" "}
                <span className="font-normal">
                  {selectedStudent.address || "N/A"}
                </span>
              </h1>
              <h1 className="mb-2">
                Parent Phone:{" "}
                <span className="font-normal">
                  {selectedStudent.parentPhone || "N/A"}
                </span>
              </h1>
              <h1 className="mb-2">
                Assigned Teacher:{" "}
                <span className="font-normal">
                  {selectedStudent.assignedTeacher || "N/A"}
                </span>
              </h1>

           
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No student data available.</p>
        )}

        <div className="flex items-center justify-end gap-4 mt-8">
          <ButtonText
            label="Close"
            backgroundColor="#FF8A00"
            onClick={() => setVisible(false)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ViewADStudentInfoModal;
