import { useState } from "react";
import InputFieldWithLabel from "../../molecules/InputfieldWithLabel";
import Button from "../../atoms/button";
import Modal from "../../common/modal";
import { Icons } from "../../../assets/icons";
import { addNewAssignmentSchema } from "../../common/validationSchema";

const AddNewAssignmentModal = ({ visible, setVisible }) => {

    const assignmentQuestions = [
        {
            questionNumber: "Question 1",
            question: "This is question number One"
        },
        {
            questionNumber: "Question 2",
            question: "This is question number One"
        },
    ]
    const [formData, setFormData] = useState({
        subject: "",
        chapter: "",
        topicName: "",
        class: "",
        selectStudents: "",
        type: "",
        level: "",
        uploadAssignment: "",
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAdd = async () => {
        try {
            await addNewAssignmentSchema.validate(formData, { abortEarly: false });
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
                <h1 className="font-medium text-2xl my-2">Add new Assignment</h1>
                <hr className="mb-8 border-gray-300" />

                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
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
                            value={formData.parentName}
                            onChange={handleInputChange}
                        />
                        {errors.parentName && (
                            <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.parentName}</p>
                        )}
                    </div>
                    <div className="relative">
                        <InputFieldWithLabel
                            type="text"
                            labelText="Class"
                            name="class"
                            placeholder="Assign to class"
                            value={formData.class}
                            onChange={handleInputChange}
                        />
                        {errors.class && (
                            <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.class}</p>
                        )}
                    </div>
                    <div className="relative">
                        <InputFieldWithLabel
                            type="file"
                            labelText="Select Students"
                            name="selectStudents"
                            placeholder="Select Students"
                            value={formData.selectStudents}
                            onChange={handleInputChange}
                        />
                        {errors.selectStudents && (
                            <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.selectStudents}</p>
                        )}
                    </div>
                    <div className="relative">
                        <InputFieldWithLabel
                            type="text"
                            labelText="Select Type"
                            name="type"
                            placeholder="Select Type"
                            value={formData.type}
                            onChange={handleInputChange}
                        />
                        {errors.type && (
                            <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.type}</p>
                        )}
                    </div>
                    <div className="relative">
                        <InputFieldWithLabel
                            type="text"
                            labelText="Select Level"
                            name="level"
                            placeholder="Select Level"
                            value={formData.level}
                            onChange={handleInputChange}
                        />
                        {errors.level && (
                            <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.level}</p>
                        )}
                    </div>
                    <div className="relative">
                        <InputFieldWithLabel
                            type="text"
                            labelText="Upload Assignment"
                            name="uploadAssignment"
                            placeholder="Upload Assignment"
                            value={formData.uploadAssignment}
                            onChange={handleInputChange}
                        />
                        {errors.uploadAssignment && (
                            <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.uploadAssignment}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    {assignmentQuestions.map((currentData, index) => (
                        <div key={index} className="flex flex-col space-y-1">
                            <h2 className="font-semibold">{currentData.questionNumber}</h2>
                            <div className="border shadow-lg p-4 rounded-lg flex items-center justify-between gap-1">
                                <p className="">{currentData.question}</p>
                                <div className="flex items-center justify-between gap-1">
                                    <Button icon={Icons.editIcon} backgroundColor="#FF8A00" />
                                    <Button icon={Icons.deleteIcon} backgroundColor="#FF4D00" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-start  text-lg text-semibold gap-0">
                    <Button
                        icon={Icons.plusIcon} // Use custom CSS class
                        className="text-[#0069A4]"
                        backgroundColor="#ffffff"
                        iconColor="#0069A4"
                    />

                    <p className="text-[#0069A4]  text-semibold">Add New Questions</p>
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

export default AddNewAssignmentModal;
