import { useState, useEffect } from "react";
import InputFieldWithLabel from "../../molecules/InputfieldWithLabel";
import Button from "../../atoms/button";
import Modal from "../../common/modal";
import { createOnlineClassSchema } from "../../common/validationSchema";
import SubjectTypeDropdown from "../../molecules/subjectTypesDropdown";
import ClassTypeDropdown from "../../molecules/classTypeDropdown";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import capitalize from 'lodash/capitalize';
import { addOnlineClass, editOnlineClass } from "../../../features/dashboardSharedApi/teacherDashboardSharedApiReducer";
import { getOnlineClassesForTeacher } from "../../../features/dashboardSharedApi/teacherDashboardSharedApiReducer";

function CreateOnlineClassModal({ visible, setVisible, initialData = {}, mode = "add", onlineClassId }) {
    const [formData, setFormData] = useState({
        id: onlineClassId,
        Class: "",
        subject: "",
        chapter: "",
        topic: "",
        date: "",
        time: "",
        link: "",
        ...initialData,
    });
    const [errors, setErrors] = useState({});
    const [filteredReports, setFilteredReports] = useState([]);
    const { data, loading, error } = useSelector((state) => state.teacherDashboardOnlineClassSharedApi);
    const dispatch = useDispatch();
    const studentClass = JSON.parse(localStorage.getItem("data"));

    console.log("FormData before dispatch:", formData);

    useEffect(() => {
        dispatch(getOnlineClassesForTeacher({ classId: `${studentClass?.Class}-${studentClass?.section}` }))
            .unwrap()
            .then((response) => {
                setFilteredReports(response?.onlineClasses);
            })
            .catch(() => {
                toast.error("Failed to fetch questions");
            });
    }, [dispatch]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "date") {
            // Format the date as DD-MM-YYYY
            const formattedDate = value.split("-").reverse().join("-");
            setFormData({ ...formData, [name]: formattedDate });
        } else {

            setFormData({
                ...formData,
                [name]:
                    ["topic"].includes(name)
                        ? capitalize(value) // Use lodash capitalize for these fields
                        : value, // Use raw value for other fields
            });
        }
    };

    const handleAdd = async () => {
        try {
            // Validate the form data
            await createOnlineClassSchema.validate(formData, { abortEarly: false });
            setErrors({}); // Clear previous errors if validation passes

            // Handle adding or updating the class
            if (mode === "add") {
                await dispatch(addOnlineClass({ payload: formData })).unwrap();
                toast.success("Online class added successfully!");
            } else if (mode === "edit") {
                await dispatch(editOnlineClass({ id: initialData?.id, payload: formData })).unwrap();
                toast.success("Online class updated successfully!");
            }

            // Reset form data after successful submission
            setFormData({
                id: "",
                Class: "",
                subject: "",
                chapter: "",
                topic: "",
                date: "",
                time: "",
                link: "",
            });
            setVisible(false); // Close the modal
        } catch (error) {
            if (error?.inner) {
                const formattedErrors = {};
                error.inner.forEach((err) => {
                    formattedErrors[err.path] = err.message;
                });
                setErrors(formattedErrors);
                toast.error("Validation failed. Please check all fields.");
            } else {
                toast.error("An unexpected error occurred.");
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
            <div className="bg-white m-4">
                <h1 className="font-medium text-2xl my-2">{mode === "add" ? "Create online class" : "Update online class"}</h1>
                <hr className="mb-8" />

                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">

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
                        <InputFieldWithLabel
                            type="date"
                            labelText="Date "
                            name="date"
                            placeholder="Enter Date"
                            value={formData?.date.split("-").reverse().join("-")}
                            onChange={handleInputChange}
                        />
                        {errors.date && (
                            <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.date}</p>
                        )}
                    </div>
                    <div className="relative">
                        <InputFieldWithLabel
                            labelText="Time"
                            name="time"
                            type="time"
                            //  placeholder="Enter something"
                            value={formData.time}
                            onChange={handleInputChange}
                            error={errors.time}
                        />
                        {errors.time && (
                            <p
                                className="text-rose-600 text-md  absolute left-0 "
                                style={{ bottom: "-22px" }}
                            >
                                {errors?.time}
                            </p>
                        )}
                    </div>
                    <div className="relative">
                        <InputFieldWithLabel
                            type="text"
                            labelText="Add Link"
                            name="link"
                            placeholder="Enter Link"
                            value={formData.link}
                            onChange={handleInputChange}
                        />
                        {errors.link && (
                            <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.link}</p>
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

export default CreateOnlineClassModal;

