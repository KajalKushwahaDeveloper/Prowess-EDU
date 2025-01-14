import Modal from "../../common/modal";
import ButtonText from "../../atoms/buttonText";

const ViewPDStudentReportModal = ({ visible, setVisible, selectedStudent }) => {
    console.log("selectedStudent:", selectedStudent);
    
  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      style={{ width: "50vw", maxWidth: "700px" }}
      onHide={() => setVisible(false)}
      className="rounded-lg"
    >
      <div className="bg-white m-4">
        <h1 className="font-semibold text-3xl my-2">Student Report</h1>
        <hr className="mb-8 border-gray-300" />
        {selectedStudent && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-0 md:gap-x-8">
            <div className="text-lg font-semibold">
            <h1 className="mb-2">
                Student Id:{" "}
                <span className="font-normal">
                  {selectedStudent?.sID}
                </span>
              </h1>
              <h1 className="mb-2">
                Name:{" "}
                <span className="font-normal">
                  {selectedStudent?.studentName}
                </span>
              </h1>
              
              <h1 className="mb-2">
                Teacher Name:{" "}
                <span className="font-normal">
                  {selectedStudent?.teacherName}
                </span>
              </h1>

              <h1 className="mb-2">
                Assignment Name:{" "}
                <span className="font-normal">
                  {selectedStudent?.assignName}
                </span>
              </h1>
              <h1 className="mb-2">
                Test Name:{" "}
                <span className="font-normal">{selectedStudent?.testName}</span>
              </h1>

              <h1 className="mb-2">
                Comment:{" "}
                <span className="font-normal">{selectedStudent?.comment}</span>
              </h1>
            </div>
            <div className="text-lg font-semibold">
              <h1 className="mb-2">
                Class:{" "}
                <span className="font-normal">{selectedStudent?.Class}</span>
              </h1>
              <h1 className="mb-2">
                Grade:{" "}
                <span className="font-normal">{selectedStudent?.grade}</span>
              </h1>
              <h1 className="mb-2">
                Subject:{" "}
                <span className="font-normal">{selectedStudent?.subject}</span>
              </h1>
              <h1 className="mb-2">
              Assignment Marks:
                <span className="font-normal">
                  {selectedStudent?.assignMarks}
                </span>
              </h1>
              <h1 className="mb-2">
                Test Marks:{" "}
                <span className="font-normal">
                  {selectedStudent?.testMarks}
                </span>
              </h1>
              <h1 className="mb-2">
                Recommendation:{" "}
                <span className="font-normal">
                  {selectedStudent?.recommendation}
                </span>
              </h1>
            </div>
          </div>
        )}

        <div className="flex items-center justify-end gap-4 mt-8">
          <ButtonText
            label="Cancel"
            backgroundColor="#FF8A00"
            onClick={() => setVisible(false)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ViewPDStudentReportModal;
