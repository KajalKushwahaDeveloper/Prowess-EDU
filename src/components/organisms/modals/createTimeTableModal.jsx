import { useState } from "react";
import InputFieldWithLabel from "../../molecules/InputfieldWithLabel";
import Button from "../../atoms/button";
import Modal from "../../common/modal";
import { createTimeTableSchema } from "../../common/validationSchema";
import ClassTypeDropdown from "../../molecules/classTypeDropdown";
import SubjectTypeDropdown from "../../molecules/subjectTypesDropdown";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addTimeTable, editTimeTable } from "../../../features/dashboardSharedApi/teacherTimeTableReducer";
import ButtonText from "../../atoms/buttonText";

function CreateTimeTableModal({ visible, setVisible, mode = "add" }) {
    const [formData, setFormData] = useState({
        teacherName: "",
        subject: "",
        Class: "",
        date: "",
        startTime: "",
        endTime: ""
    });

    const [errors, setErrors] = useState({});
    console.log("timeTableformData:", formData, errors);
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(
        (state) => state.teacherDashboardTimeTableSharedApi
    );
    console.log("timeTable:",);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "date") {
            // Format the date as DD-MM-YYYY
            const formattedDate = value.split("-").reverse().join("-");
            setFormData({ ...formData, [name]: formattedDate });
        } else {
            // setFormData({ ...formData, [name]: value });
            setFormData({
                ...formData,
                [name]:
                    ["name", "parentName", "address", "section"].includes(name)
                        ? capitalize(value) // Use lodash capitalize for these fields
                        : value, // Use raw value for other fields
            })
        };

    };


    const handleAdd = async () => {
        console.log("click");

        try {
            // Dispatch the addItem action with role and payload
            await createTimeTableSchema.validate(formData, { abortEarly: false });
            setErrors({}); // Clear previous errors if validation passes

            if (mode === "add") {
                await dispatch(addTimeTable({ payload: formData })).unwrap();
                toast.success(data?.data?.message || "Time Table added successfully!");
            } else if (mode === "edit") {
                await dispatch(editTimeTable({ id: initialData?.id, payload: formData })).unwrap();
                toast.success(data?.data?.message || "Time Table updated successfully!");
            }
            // Validate the form data
            setFormData({
                teacherName: "",
                subject: "",
                Class: "",
                date: "",
                startTime: "",
                endTime: ""
            });
            setVisible(false);
            // setModalMode("add")
            // setCurrentStudent(null)// Optionally close the modal on success
        } catch (error) {
            const formattedErrors = {};
            error?.inner?.forEach((error) => {
                formattedErrors[error.path] = error.message;
            });
            console.log("Validation errors:", formattedErrors);
            setErrors(formattedErrors);
            toast.error(error || "Failed to add Time table. Please fix errors.");
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
                        {errors.Class && (
                            <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.Class}</p>
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
                            labelText="Date"
                            name="date"
                            placeholder="Enter Date & time"
                            value={formData?.dob?.split("-").reverse().join("-")}
                            onChange={handleInputChange}
                        />
                        {errors.date && (
                            <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.date}</p>
                        )}
                    </div>
                    <div className="relative">
                        <InputFieldWithLabel
                            labelText="Start Time"
                            name="startTime"
                            type="time"
                            //  placeholder="Enter something"
                            value={formData.startTime}
                            onChange={handleInputChange}
                            error={errors.startTime}
                        />
                        {errors.startTime && (
                            <p
                                className="text-rose-600 text-md  absolute left-0 "
                                style={{ bottom: "-22px" }}
                            >
                                {errors?.startTime}
                            </p>
                        )}
                    </div>
                    <div className="relative">
                        <InputFieldWithLabel
                            labelText="End Time"
                            name="endTime"
                            type="time"
                            //  placeholder="Enter something"
                            value={formData.endTime}
                            onChange={handleInputChange}
                            error={errors.endTime}
                        />
                        {errors.endTime && (
                            <p
                                className="text-rose-600 text-md  absolute left-0 "
                                style={{ bottom: "-22px" }}
                            >
                                {errors?.endTime}
                            </p>
                        )}
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex justify-end gap-4 mt-6">
                    <ButtonText
                        label="Cancel"
                        backgroundColor="#FF8A00"
                        onClick={() => setVisible(false)}
                    />
                    <ButtonText
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
        </Modal>
    );
}

export default CreateTimeTableModal;
