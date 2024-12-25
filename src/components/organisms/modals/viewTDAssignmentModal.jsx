import InputFieldWithLabel from "../../molecules/InputfieldWithLabel";
import Button from "../../atoms/button";
import Modal from "../../common/modal";
import ButtonText from "../../atoms/buttonText";

function ViewTDAssignModal({ visible, setVisible, assignmentData }) {
  console.log("assignmentData:", assignmentData);  
  return (
    <>
      <Modal
        visible={visible}
        setVisible={setVisible}
        style={{ width: "50vw", maxWidth: "700px" }}
        onHide={() => setVisible(false)}
        className="rounded-lg"
      >
        <div className="bg-white lg:m-0 m-4">
        <h1 className="font-medium text-2xl my-2">View new Assignment </h1>
          <hr className="mb-8 border-gray-300" />

          {/* Form fields */}
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Subject Name"
                name="subject"
                value={assignmentData?.subject || "N/A"}
              />
            </div>

            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Class"
                name="Class"
                value={assignmentData?.Class || "N/A"}
              />
            </div>

            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Chapter"
                name="chapter"
                value={assignmentData?.chapter || "N/A"}
              />
            </div>
         
            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Questions"
                name="questions"
                value={assignmentData?.questions?.length || "N/A"}
              />
            </div>

            {/* <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Marks"
                name="marks"
                value={assignmentData?.marks || "N/A"}
              />
            </div> */}
            
            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Topic"
                name="topic"
                value={assignmentData?.topic || "N/A"}
              />
            </div>

         
            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Assigned To"
                name="assignedTo"
                value={assignmentData?.assignedTo || "N/A"}
              />
            </div>

            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Level"
                name="level"
                value={assignmentData?.level || "N/A"}
              />
            </div>
            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Start Date"
                name="startDate"
                value={assignmentData?.startDate || "N/A"}
              />
            </div>

            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="End Date"
                name="endDate"
                value={assignmentData?.endDate || "N/A"}
              />
            </div>
            {/* <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Assign File"
                name="assignFile"
                value={assignmentData?.assignFile || "N/A"}
              />
            </div> */}
            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Status"
                name="status"
                value={assignmentData?.status || "N/A"}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <ButtonText
              label="Cancel"
              backgroundColor="#FF8A00"
              onClick={() => setVisible(false)}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ViewTDAssignModal;
