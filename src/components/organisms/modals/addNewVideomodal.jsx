import { useState } from "react";
import InputFieldWithLabel from "../../molecules/InputfieldWithLabel";
import Button from "../../atoms/button";
import Modal from "../../common/modal";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify"; import { addNewVideoSchema } from "../../common/validationSchema";
import capitalize from 'lodash/capitalize';
import { addVideo, editVideo } from "../../../features/dashboardSharedApi/videosSharedApi";

function AddNewVideoModal({ visible, setVisible, mode = "add", initialData = {} }) {
    const [formData, setFormData] = useState({
        subject: "",
        chapter: "",
        topicName: "",
        class: "",
        uploadVideo: "",
        ...initialData
    });
    const [errors, setErrors] = useState({});
    const [filteredReports, setFilteredReports] = useState([]);
    const teacherDashboardData = JSON.parse(localStorage.getItem("data"));
    console.log("formdata:", formData);

    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.sharedApi);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]:
                ["subject", "topicName"].includes(name)
                    ? capitalize(value) // Use lodash capitalize for these fields
                    : value, // Use raw value for other fields
        });
    };

    const handleAdd = async () => {
        try {
            await addNewVideoSchema.validate(formData, { abortEarly: false });
            setErrors({});
            if (mode === "add") {
                await dispatch(addVideo({ role: "student", payload: formData })).unwrap();
                toast.success(data?.data?.message || "Student added successfully!");
            } else if (mode === "edit") {
                await dispatch(editVideo({ role: "student", id: initialData?.id, payload: formData })).unwrap();
                toast.success(data?.data?.message || "Student updated successfully!");
            }
            // Validate the form data
            setFormData({
                subject: "",
                chapter: "",
                topicName: "",
                class: "",
                uploadVideo: "",
            });
            setVisible(false);
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
                <h1 className="font-medium text-2xl my-2">{mode === "add" ? "Add new Video" : "Edit new Video"}</h1>
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
                            value={formData.topicName}
                            onChange={handleInputChange}
                        />
                        {errors.topicName && (
                            <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.topicName}</p>
                        )}
                    </div>
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
                            type="file"
                            labelText="Upload video"
                            name="uploadvideo"
                            placeholder="Enter Upload video"
                            value={formData.uploadVideo}
                            onChange={handleInputChange}
                        />
                        {errors.uploadVideo && (
                            <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors?.uploadVideo}</p>
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

export default AddNewVideoModal;
