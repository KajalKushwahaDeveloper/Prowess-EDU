import { useState } from "react";
import InputFieldWithLabel from "../../molecules/InputfieldWithLabel";
import Button from "../../atoms/button";
import Modal from "../../common/modal";
import { createOnlineClassSchema } from "../../common/validationSchema";
import SubjectTypeDropdown from "../../molecules/subjectTypesDropdown";
import ClassTypeDropdown from "../../molecules/classTypeDropdown";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function CreateOnlineClassModal({ visible, setVisible,initialData={} }) {
    const [formData, setFormData] = useState({
        id: null,
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



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAdd = async () => {
        try {
            const updatedFormData = {
                ...formData,
                Class: Array.isArray(formData.Class)
                    ? formData.Class
                    : [formData.Class], // Ensure it's an array
            };

            await createOnlineClassSchema.validate(updatedFormData, { abortEarly: false });
            setErrors({});
            // Handle adding video logic
            if (mode === "add") {
                await dispatch(editOnlineClass({ role: "parent", payload: formData })).unwrap();
                toast.success(data?.data?.message || "Parent added successfully!");
            } else if (mode === "edit") {
                await dispatch(addedOnlineClass({ role: "parent", id: initialData.id, payload: formData })).unwrap();
                toast.success(data?.data?.message || "Parent updated successfully!");
            }
            // Validate the form data
            setFormData({
                Class: "",
                subject: "",
                chapter: "",
                topic: "",
                date: "",
                time: "",
                link: "",
            });
            setVisible(false);
        } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
                validationErrors[error.path] = error.message;
            });
            setErrors(validationErrors);
            toast.error(error || "Failed to add Online Classes. Please fix errors.");
            console.log("Validation or API errors:", error);
        }
    }
    //   const handleAdd = async () => {
    //     try {
    //       // Dispatch the addItem action with role and payload
    //       await addParentSchema.validate(formData, { abortEarly: false });
    //       setErrors({}); // Clear previous errors if validation passes
    //       if (mode === "add") {
    //         await dispatch(addItem({ role: "parent", payload: formData })).unwrap();
    //         toast.success(data?.data?.message || "Parent added successfully!");
    //       } else if (mode === "edit") {
    //         await dispatch(editItem({ role: "parent", id: initialData.id, payload: formData })).unwrap();
    //         toast.success(data?.data?.message || "Parent updated successfully!");
    //       }
    //       // Validate the form data
    //       setFormData({
    //         name: "",
    //         phone: "",
    //         email: "",
    //         gender: "",
    //         childName: "",
    //         childClass: "",
    //         childSection: "",
    //         address: "",
    //       });
    //       setVisible(false);
    //       // setCurrentStudent(null)
    //     } catch (error) {
    //       const formattedErrors = {};
    //       error?.inner?.forEach((error) => {
    //         formattedErrors[error.path] = error.message;
    //       });
    //       console.log("Validation errors:", formattedErrors); 
    //       setErrors(formattedErrors);
    //       toast.error(error || "Failed to add parent. Please fix errors.");
    //       console.log("Validation or API errors:", error);
    //     }
    //   };

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

