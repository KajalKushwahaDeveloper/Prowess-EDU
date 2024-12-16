import { useState } from "react";
import InputFieldWithLabel from "../../molecules/InputfieldWithLabel";
import Button from "../../atoms/button";
import Modal from "../../common/modal";
import { createTimeTableSchema } from "../../common/validationSchema";
import ClassTypeDropdown from "../../molecules/classTypeDropdown";
import SubjectTypeDropdown from "../../molecules/subjectTypesDropdown";

function CreateTimeTableModal({ visible, setVisible }) {
    const [formData, setFormData] = useState({
        teacherName: "",
        subject: "",
        Class: "",
        date: "",
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAdd = async () => {
        try {
            await createTimeTableSchema.validate(formData, { abortEarly: false });
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
                <h1 className="font-medium text-2xl my-2">Add new Video</h1>
                <hr className="mb-8 border-gray-300" />

                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                    <div className="relative">
                        <InputFieldWithLabel
                            type="text"
                            labelText="Teacher Name"
                            name="teacherName"
                            placeholder="Enter Teacher Name"
                            value={formData.teacherName}
                            onChange={handleInputChange}
                        />
                        {errors.teacherName && (
                            <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.teacherName}</p>
                        )}
                    </div>
                    <div className="relative">
                        <ClassTypeDropdown
                            label="Class"
                            name="Class"
                            value={formData.Class}
                            onChange={handleInputChange}
                        />
                        {errors.class && (
                            <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.class}</p>
                        )}
                    </div>
                    <div className="relative">
                        <SubjectTypeDropdown
                            label="Subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                        />
                        {errors.subject && (
                            <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.subject}</p>
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

export default CreateTimeTableModal;
