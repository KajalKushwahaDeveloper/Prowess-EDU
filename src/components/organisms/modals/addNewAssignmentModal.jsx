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
import { addAssign, editAssign } from "../../../features/dashboardSharedApi/teacherDashboardAssignReducer";
import LevelDropdown from "../../molecules/levelDropdown";
import SubjectTypeDropdown from "../../molecules/subjectTypesDropdown";
import ClassTypeDropdown from "../../molecules/classTypeDropdown";

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
        topic: "",
        Class: "",
        assignedTo: [],
        level: "",
        assignFile: "",
        startDate: "",
        endDate: "",
        ...initialData,
    });
    const [errors, setErrors] = useState({});
    const [isSuccess, setIsSuccess] = useState(false); // Track success state
    const [selectedClasses, setSelectedClasses] = useState([]);
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.teacherDashboardAssignSharedApi);

    console.log("validation error:", errors);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "startDate" || name === "endDate") {
            // Keep the input value in yyyy-MM-dd format
            setFormData({
                ...formData,
                [name]: value,
            });
        } else {
            setFormData({
                ...formData,
                [name]:
                    files && files.length > 0
                        ? files[0]
                        : ["chapter", "subject", "topic", "assignedTo"].includes(name)
                            ? capitalize(value)
                            : value,
            });
        }
    };

    const handleAdd = async () => {
        try {
            // Validate the form data with Yup
            await addNewAssignmentSchema.validate(formData, { abortEarly: false });
            setErrors({}); // Clear previous errors
    
            // Format the startDate and endDate as DD-MM-YYYY
            const formattedStartDate = formData.startDate
                ? formData.startDate.split("-").reverse().join("-")
                : "";
            const formattedEndDate = formData.endDate
                ? formData.endDate.split("-").reverse().join("-")
                : "";
    
            const formDataToSend = new FormData();
            console.log("formDataToSend:", formDataToSend);
    
            Object.keys(formData).forEach((key) => {
                if (key === "startDate") {
                    formDataToSend.append("startDate", formattedStartDate);
                } else if (key === "endDate") {
                    formDataToSend.append("endDate", formattedEndDate);
                } else if (key === "assignFile" && formData[key]) {
                    formDataToSend.append("assignFile", formData[key]);
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            });
    
            let resultAction;
            if (resultAction?.status === 200) {
                setIsSuccess(true); // Mark as successful
                toast.success(data?.data?.message || "Assignment added successfully!");
            } else {
                throw new Error(data?.data?.message || "Failed to add assignment.");
            }
            // Dispatch the appropriate action based on mode
            if (mode === "add") {
                resultAction = await dispatch(addAssign({ payload: formDataToSend })).unwrap();
                toast.success(resultAction?.message || "Assignment added successfully!");
            } else if (mode === "edit") {
                resultAction = await dispatch(editAssign({ id: initialData?.id, payload: formDataToSend })).unwrap();
                toast.success(resultAction?.message || "Assignment updated successfully!");
            }
    
            // Reset the form data after successful add or edit
            setFormData({
                subject: "",
                chapter: "",
                topic: "",
                Class: "",
                assignedTo: "",
                level: "",
                assignFile: "",
                startDate: "",
                endDate: "",
            });
    
        } catch (err) {
            // Handle Yup validation errors
            if (err?.inner) {
                const validationErrors = {};
                err.inner.forEach((e) => {
                    validationErrors[e.path] = e.message;
                });
                setErrors(validationErrors); // Set validation errors in the state
                toast.error("Validation failed. Please fix the errors.");
            } else {
                toast.error(err?.message || "Failed to add Assignment. Please try again.");
            }
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
            <div>
                {!isSuccess ? (
                    <div className="bg-white m-4">
                        <h1 className="font-medium text-2xl my-2">{mode === "add" ? "Add new Assignment" : "Edit new Assignment"} </h1>
                        <hr className="mb-8 border-gray-300" />

                        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                            <div className="relative">
                                <SubjectTypeDropdown
                                    label="Subjects"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    error={errors.subject}
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
                                    name="topic"
                                    placeholder="Enter Topic Name"
                                    value={formData.topic}
                                    onChange={handleInputChange}
                                />
                                {errors.topic && (
                                    <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.topic}</p>
                                )}
                            </div>
                            <div className="relative">
                                <ClassTypeDropdown
                                    label="Class"
                                    name="Class"
                                    value={formData.Class}
                                    onChange={handleInputChange}
                                />
                                {errors.Class && (
                                    <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.Class}</p>
                                )}
                            </div>
                            <div className="relative">
                                <InputFieldWithLabel
                                    type="text"
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
                                <LevelDropdown
                                    label="Level"
                                    name="level"
                                    value={formData.level}
                                    onChange={handleInputChange}
                                />
                                {errors.level && (
                                    <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.level}</p>
                                )}
                            </div>
                            <div className="relative">
                                <InputFieldWithLabel
                                    labelText="Start Date"
                                    name="startDate"
                                    type="date"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                    error={errors.startDate}
                                />
                                {errors.startDate && (
                                    <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.startDate}</p>
                                )}
                            </div>

                            <div className="relative">
                                <InputFieldWithLabel
                                    labelText="End Date"
                                    name="endDate"
                                    type="date"
                                    //  placeholder="Enter something"
                                    value={formData.endDate}
                                    onChange={handleInputChange}
                                    error={errors.endDate}
                                />
                                {errors.endDate && (
                                    <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.endDate}</p>
                                )}
                            </div>
                            <div className="relative">
                                <InputFieldWithLabel
                                    type="file"
                                    labelText="Upload Assignment"
                                    name="assignFile"
                                    placeholder="Upload Assignment"
                                    onChange={handleInputChange} // Handle file input change
                                />

                                {errors.assignFile && (
                                    <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.assignFile}</p>
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
                ) : (
                    < div >
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
                            // onClick={handleAdd}
                            />
                        </div>
                    </div>
                )}
            </div>

        </Modal >
    );
}

export default AddNewAssignmentModal;
