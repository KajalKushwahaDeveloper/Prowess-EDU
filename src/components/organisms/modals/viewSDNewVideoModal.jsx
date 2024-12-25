import { useState } from "react";
import InputFieldWithLabel from "../../molecules/InputfieldWithLabel";
import { useSelector } from "react-redux";
import Button from "../../atoms/button";
import Modal from "../../common/modal";
import ButtonText from "../../atoms/buttonText";

function ViewSDNewVideoModal({ visible, setVisible ,videoData}) {

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
          <h1 className="font-medium text-2xl my-2">View new Video </h1>
          <hr className="mb-8 border-gray-300" />

          {/* Form fields */}
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            {/* <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Id"
                name="id"
                value={videoData?.id || "N/A"}
              />
            </div> */}
            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Subject Name"
                name="subject"
                value={videoData?.subject || "N/A"}
              />
            </div>
            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Teacher Name"
                name="name"
                value={videoData?.teacherDetail?.name || "N/A"}
              />
            </div>
            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Chapter"
                name="chapter"
                value={videoData?.chapter || "N/A"}
              />
            </div>

            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Topic"
                name="topic"
                value={videoData?.topic || "N/A"}
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

export default ViewSDNewVideoModal;
