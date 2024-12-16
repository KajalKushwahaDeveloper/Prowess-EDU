import { useState } from "react";
import InputFieldWithLabel from "../../molecules/InputfieldWithLabel";
import { useSelector } from "react-redux";
import Button from "../../atoms/button";
import Modal from "../../common/modal";

function ViewTDVideoModal({ visible, setVisible ,vedioData}) {

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
                value={vedioData?.id || "N/A"}
              />
            </div> */}
            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Subject Name"
                name="subject"
                value={vedioData?.subject || "N/A"}
              />
            </div>
            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Class"
                name="Class"
                value={vedioData?.Class || "N/A"}
              />
            </div>
            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Chapter"
                name="chapter"
                value={vedioData?.chapter || "N/A"}
              />
            </div>

            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Topic"
                name="topic"
                value={vedioData?.topic || "N/A"}
              />
            </div>
            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Video File"
                name="videoFile"
                value={vedioData?.videoFile || "N/A"}
              />
            </div>
            
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <Button
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

export default ViewTDVideoModal;
