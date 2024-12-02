import { useState } from "react";
import InputFieldWithLabel from "../../molecules/InputfieldWithLabel";
import Button from "../../atoms/button";
import Modal from "../../common/modal";
import { Icons } from "../../../assets/icons";
import { addNewAssignmentSchema } from "../../common/validationSchema";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import capitalize from 'lodash/capitalize';
import { addAssign } from "../../../features/dashboardSharedApi/teacherDashboardAssignReducer";
import LevelDropdown from "../../molecules/levelDropdown";

const AddNewAssignmentModal = ({ visible, setVisible, mode = "add", initialData = {} }) => {
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
        Class: "",
        assignedTo: "",
        type: "",
        level: "",
        uploadAssignment: "",
        ...initialData,
    });
    const [errors, setErrors] = useState({});
    const [assignQuestions, setAsignQuestions] = useState("");
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.sharedApi);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]:
                ["chapter", "subject", "topicName", "assignedTo"].includes(name)
                    ? capitalize(value) // Use lodash capitalize for these fields
                    : value, // Use raw value for other fields
        });
    };

    const handleAdd = async () => {
        try {
            await addNewAssignmentSchema.validate(formData, { abortEarly: false });
            setErrors({});
            if (mode === "add") {
                await dispatch(addAssign({ payload: formData })).unwrap();
                toast.success(data?.data?.message || "Assignment added successfully!");
            } else if (mode === "edit") {
                await dispatch(editAssign({ id: initialData?.id, payload: formData })).unwrap();
                toast.success(data?.data?.message || "Assignment updated successfully!");
            }
            // Validate the form data
            setFormData({
                subject: "",
                chapter: "",
                topicName: "",
                Class: "",
                assignedTo: "",
                type: "",
                level: "",
                uploadAssignment: "",
            });
            setVisible(false);
        } catch (error) {
            const validationErrors = {};
            error?.inner?.forEach((error) => {
                validationErrors[error.path] = error.message;
            });
            console.log("Validation errors:", validationErrors);
            setErrors(validationErrors);
            toast.error(error || "Failed to add Assignment. Please fix errors.");
            console.log("Validation or API errors:", error);
        }
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
                            name="Class"
                            placeholder="Assign to class"
                            value={formData.Class}
                            onChange={handleInputChange}
                        />
                        {errors.Class && (
                            <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.Class}</p>
                        )}
                    </div>
                    <div className="relative">
                        <InputFieldWithLabel
                            type="file"
                            labelText="Select Students"
                            name="assignedTo"
                            placeholder="Select Students"
                            value={formData.assignedTo}
                            onChange={handleInputChange}
                        />
                        {errors.assignedTo && (
                            <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.assignedTo}</p>
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
                        <LevelDropdown
                            label="Level"
                            name="level"
                            value={formData.level}
                            onChange={handleInputChange}
                            error={errors.level}
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
                <div className="flex justify-end gap-4 mt-6">
                    <Button
                        label="Cancel"
                        backgroundColor="#FF8A00"
                        onClick={() => setVisible(false)}
                    />
                    <Button
                        label={
                            loading ? (
                                <FaSpinner className="animate-spin text-white mx-auto text-3xl" />
                            ) : mode === "add" ? (
                                "Add"
                            ) : (
                                "Update"
                            )
                        }
                        backgroundColor="#00A943"
                        onClick={handleAdd}
                    />
                </div>
            </div>
            {/* assignment Questions */}
            {/* <div>
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
                    </div> */}

            {/* Action buttons */}
            {/* <div className="flex justify-end gap-4 mt-6">
                        <Button
                            label="Cancel"
                            backgroundColor="#FF8A00"
                            onClick={() => setVisible(false)}
                        />
                        <Button
                            label={
                                loading ? (
                                    <FaSpinner className="animate-spin text-white mx-auto text-3xl" />
                                ) : mode === "add" ? (
                                    "Add"
                                ) : (
                                    "Update"
                                )
                            }
                            backgroundColor="#00A943"
                            onClick={handleAdd}
                        />
                    </div>
                </div> */}
        </Modal>
    );
}

export default AddNewAssignmentModal;
