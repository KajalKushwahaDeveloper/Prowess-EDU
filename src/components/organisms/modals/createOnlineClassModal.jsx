import { useState } from "react";
import InputFieldWithLabel from "../../molecules/InputfieldWithLabel";
import Button from "../../atoms/button";
import Modal from "../../common/modal";

function CreateOnlineClassModal({ visible, setVisible }) {
    const [formData, setFormData] = useState({
        class: "",
        subject: "",
        chapter: "",
        topicName: "",
        date: "",
        addLink: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAdd = () => {
        // Handle adding student logic
        console.log("Student Data: ", formData);
    };

    return (
        <Modal
            visible={visible}
            setVisible={setVisible}
            style={{ width: "50vw", maxWidth: "700px" }}
            onHide={() => setVisible(false)}
            className="rounded-lg"
        >
            <div className="bg-white m-4">
                <h1 className="font-medium text-2xl my-2">Create online class</h1>
                <hr className="mb-8" />

                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                    <InputFieldWithLabel
                        type="text"
                        labelText="Class"
                        name="class"
                        placeholder="Enter Class"
                        value={formData.class}
                        onChange={handleInputChange}
                    />
                    <InputFieldWithLabel
                        type="text"
                        labelText="Subject"
                        name="subject"
                        placeholder="Enter Subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                    />
                    <InputFieldWithLabel
                        type="text"
                        labelText="Chapter"
                        name="chapter"
                        placeholder="Enter Student Chapter"
                        value={formData.chapter}
                        onChange={handleInputChange}
                    />
                    <InputFieldWithLabel
                        type="text"
                        labelText="Topic Name"
                        name="topicName"
                        placeholder="Enter Topic Name"
                        value={formData.parentName}
                        onChange={handleInputChange}
                    />
                    <InputFieldWithLabel
                        type="date"
                        labelText="Date & time"
                        name="date"
                        placeholder="Enter Date & time"
                        value={formData.date}
                        onChange={handleInputChange}
                    />
                    <InputFieldWithLabel
                        type="text"
                        labelText="Add Link"
                        name="addLink"
                        placeholder="Enter Link"
                        value={formData.addLink}
                        onChange={handleInputChange}
                    />


                </div>

                {/* Action buttons */}
                <div className="flex justify-end gap-4 mt-6">
                    <Button
                        label="Cancel"
                        backgroundColor="#FF8A00"
                        onClick={() => setVisible(false)}
                    />
                    <Button
                        label="Add"
                        backgroundColor="#00A943"
                        onClick={handleAdd}
                    />
                </div>
            </div>
        </Modal>
    );
}

export default CreateOnlineClassModal;

