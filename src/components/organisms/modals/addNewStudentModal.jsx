import { useState } from "react";
import InputFieldWithLabel from "../../molecules/InputfieldWithLabel";
import Button from "../../atoms/button";
import Modal from "../../common/modal";
import { addStudentSchema } from "../../common/validationSchema";

function AddNewStudentModal({ visible, setVisible }) {
    const [formData, setFormData] = useState({
        studentName: "",
        parentName: "",
        phone: "",
        email: "",
        dob: "",
        gender: "",
        section: "",
        class: "",
        address: "",
        subjects: ""
    });

    const [errors, setErrors] = useState({});
    console.log("errors:", errors);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAdd = async () => {
        console.log("Add button clicked"); // Debugging
        try {
            // Validate the form data
            await addStudentSchema.validate(formData, { abortEarly: false });
            console.log("Student Data: ", formData); // For debugging
            setErrors({}); // Clear previous errors if validation passes
        } catch (validationErrors) {
            // Collect validation errors and set them in the state
            const formattedErrors = {};
            validationErrors.inner.forEach((error) => {
                formattedErrors[error.path] = error.message;
            });
            console.log("Validation errors:", formattedErrors); // For debugging
            setErrors(formattedErrors);
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
                <h1 className="font-medium text-2xl my-2">Add new Student</h1>
                <hr className="mb-8 border-gray-300" />

                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                    <div className="relative">
                        <InputFieldWithLabel
                            type="text"
                            labelText="Student Name"
                            name="studentName"
                            placeholder="Enter Student Name"
                            value={formData.studentName}
                            onChange={handleInputChange}
                        />
                        {errors.studentName && <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors.studentName}</p>}
                    </div>

                    <div className="relative">
                        <InputFieldWithLabel
                            type="text"
                            labelText="Parent Name"
                            name="parentName"
                            placeholder="Enter Parent Name"
                            value={formData.parentName}
                            onChange={handleInputChange}
                        />
                        {errors.parentName && <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors.parentName}</p>}
                    </div>

                    <div className="relative">
                        <InputFieldWithLabel
                            type="text"
                            labelText="Student/Parent Phone"
                            name="phone"
                            placeholder="Enter Phone Number"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                        {errors.phone && <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors.phone}</p>}
                    </div>

                    <div className="relative">
                        <InputFieldWithLabel
                            type="email"
                            labelText="Student/Parent Email"
                            name="email"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors.email}</p>}
                    </div>

                    <div className="relative">
                        <InputFieldWithLabel
                            type="date"
                            labelText="Date of Birth"
                            name="dob"
                            value={formData.dob}
                            onChange={handleInputChange}
                        />
                        {errors.dob && <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors.dob}</p>}
                    </div>

                    <div className="relative">
                        <InputFieldWithLabel
                            type="select"
                            labelText="Gender"
                            name="gender"
                            options={["Male", "Female", "Other"]}
                            value={formData.gender}
                            onChange={handleInputChange}
                        />
                        {errors.gender && <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors.gender}</p>}
                    </div>

                    <div className="relative">
                        <InputFieldWithLabel
                            type="text"
                            labelText="Section"
                            name="section"
                            placeholder="Enter Section"
                            value={formData.section}
                            onChange={handleInputChange}
                        />
                        {errors.section && <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors.section}</p>}
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
                        {errors.class && <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors.class}</p>}
                    </div>

                    <div className="relative">
                        <InputFieldWithLabel
                            type="text"
                            labelText="Address"
                            name="address"
                            placeholder="Enter Address"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                        {errors.address && <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors.address}</p>}
                    </div>

                    <div className="relative">
                        <InputFieldWithLabel
                            type="text"
                            labelText="Subjects"
                            name="subjects"
                            placeholder="Enter Subjects"
                            value={formData.subjects}
                            onChange={handleInputChange}
                        />
                        {errors.subjects && <p className="text-rose-600 text-md  absolute left-0 " style={{ bottom: '-22px' }}>{errors.subjects}</p>}
                    </div>
                </div>

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

export default AddNewStudentModal;
