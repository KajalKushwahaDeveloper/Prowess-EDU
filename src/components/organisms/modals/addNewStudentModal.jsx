import { useState } from "react";
import InputFieldWithLabel from "../../molecules/InputfieldWithLabel";
import Button from "../../atoms/button";
import Modal from "../../common/modal";

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAdd = () => {
        // Handle adding student logic
        console.log("Student Data: ", formData);
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
                    <InputFieldWithLabel
                        type="text"
                        labelText="Student Name"
                        name="studentName"
                        placeholder="Enter Student Name"
                        value={formData.studentName}
                        onChange={handleInputChange}
                    />
                    <InputFieldWithLabel
                        type="text"
                        labelText="Parent Name"
                        name="parentName"
                        placeholder="Enter Parent Name"
                        value={formData.parentName}
                        onChange={handleInputChange}
                    />
                    <InputFieldWithLabel
                        type="text"
                        labelText="Student/Parent Phone"
                        name="phone"
                        placeholder="Enter Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                    <InputFieldWithLabel
                        type="email"
                        labelText="Student/Parent Email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <InputFieldWithLabel
                        type="date"
                        labelText="Date of Birth"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                    />
                    <InputFieldWithLabel
                        type="select"
                        labelText="Gender"
                        name="gender"
                        options={["Male", "Female", "Other"]} // Example gender options
                        value={formData.gender}
                        onChange={handleInputChange}
                    />
                    <InputFieldWithLabel
                        type="text"
                        labelText="Section"
                        name="section"
                        placeholder="Enter Section"
                        value={formData.section}
                        onChange={handleInputChange}
                    />
                    <InputFieldWithLabel
                        type="text"
                        labelText="Class"
                        name="class"
                        placeholder="Enter Class"
                        value={formData.class}
                        onChange={handleInputChange}
                    />
                    <InputFieldWithLabel
                        type="text"
                        labelText="Address"
                        name="address"
                        placeholder="Enter Address"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                    <InputFieldWithLabel
                        type="text"
                        labelText="Subjects"
                        name="subjects"
                        placeholder="Enter Subjects"
                        value={formData.subjects}
                        onChange={handleInputChange}
                    />
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

export default AddNewStudentModal;
