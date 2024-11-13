import { useState } from "react";
import InputFieldWithLabel from "../../molecules/InputfieldWithLabel";
import Button from "../../atoms/button";
import Modal from "../../common/modal";
import { createOnlineClassSchema } from "../../common/validationSchema";

function CreateOnlineClassModal({ visible, setVisible }) {
    const [formData, setFormData] = useState({
        class: "",
        subject: "",
        chapter: "",
        topicName: "",
        date: "",
        addLink: "",
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAdd = async () => {
        try {
            await createOnlineClassSchema.validate(formData, { abortEarly: false });
            setErrors({});
            // Handle adding video logic
            console.log("Video Data: ", formData);
        } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
                validationErrors[error.path] = error.message;
            });
            setErrors(validationErrors);
        }
    }

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
                    
                     <div className="relative">
                    <InputFieldWithLabel
                        type="text"
                        labelText="Class"
                        name="class"
                        placeholder="Enter Class"
                        value={formData.class}
                        onChange={handleInputChange}
                    />
                     {errors.class && (
                            <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.class}</p>
                        )}
                    </div>
                     <div className="relative">
                    <InputFieldWithLabel
                        type="text"
                        labelText="Subject"
                        name="subject"
                        placeholder="Enter Subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                    />
                     {errors.subject && (
                            <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.subject}</p>
                        )}
                    </div>
                     <div className="relative">
                    <InputFieldWithLabel
                        type="text"
                        labelText="Chapter"
                        name="chapter"
                        placeholder="Enter Student Chapter"
                        value={formData.chapter}
                        onChange={handleInputChange}
                    />
                     {errors.chapter && (
                            <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.chapter}</p>
                        )}
                    </div>
                     <div className="relative">
                    <InputFieldWithLabel
                        type="text"
                        labelText="Topic Name"
                        name="topicName"
                        placeholder="Enter Topic Name"
                        value={formData.topicName}
                        onChange={handleInputChange}
                    />
                     {errors.topicName && (
                            <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.topicName}</p>
                        )}
                    </div>
                     <div className="relative">
                    <InputFieldWithLabel
                        type="date"
                        labelText="Date & time"
                        name="date"
                        placeholder="Enter Date & time"
                        value={formData.date}
                        onChange={handleInputChange}
                    />
                     {errors.date && (
                            <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.date}</p>
                        )}
                    </div>
                     <div className="relative">
                    <InputFieldWithLabel
                        type="text"
                        labelText="Add Link"
                        name="addLink"
                        placeholder="Enter Link"
                        value={formData.addLink}
                        onChange={handleInputChange}
                    />
                     {errors.addLink && (
                            <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.addLink}</p>
                        )}
                    </div>


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

