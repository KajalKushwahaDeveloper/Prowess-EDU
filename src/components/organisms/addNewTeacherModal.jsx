import { useState } from "react";
import InputFieldWithLabel from "../molecules/InputfieldWithLabel";
import Button from "../atoms/button";
import Modal from "../common/modal";

function AddNewTeacherModal({ visible, setVisible }) {
    const [formData, setFormData] = useState({
        teacherName: "",
        email: "",
        phone: "",
        qualification: "",
        dob: "",
        gender: "",
        address: "",
        classYouCanTeach: "",
        experience: "",
        subjects: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAdd = () => {
        // Handle the add action (e.g., form submission)
        console.log("Teacher Data: ", formData);
    };

    return (
        <>
            <Modal
                visible={visible}
                setVisible={setVisible}
                style={{ width: "50vw", maxWidth: "700px" }}
                onHide={() => setVisible(false)}
                className="border-[#004871] border rounded-lg"
            >
                <div className="bg-white rounded-lg shadow-lg">
                    <h1 className="font-medium text-2xl my-2">Add new Teacher</h1>
                    <hr className="mb-4" />

                    {/* Form fields */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Map through the fields to render the inputs */}
                        <InputFieldWithLabel
                            type="text"
                            labelText="Teacher Name"
                            name="teacherName"
                            placeholder="Enter Teacher Name"
                            value={formData.teacherName}
                            onChange={handleInputChange}
                        />
                        <InputFieldWithLabel
                            type="email"
                            labelText="Email"
                            name="email"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <InputFieldWithLabel
                            type="text"
                            labelText="Phone"
                            name="phone"
                            placeholder="Enter Phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                        <InputFieldWithLabel
                            type="select"
                            labelText="Qualification"
                            name="qualification"
                            placeholder="Enter Qualification"
                            value={formData.qualification}
                            onChange={handleInputChange}
                        />
                        <InputFieldWithLabel
                            type="date"
                            labelText="Date of Birth"
                            name="dob"
                            placeholder="Select Date of Birth"
                            value={formData.dob}
                            onChange={handleInputChange}
                        />
                        <InputFieldWithLabel
                            type="text"
                            labelText="Gender"
                            name="gender"
                            placeholder="Select Gender"
                            value={formData.gender}
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
                            labelText="Classes you can teach"
                            name="classYouCanTeach"
                            placeholder="Enter Classes"
                            value={formData.classYouCanTeach}
                            onChange={handleInputChange}
                        />
                        <InputFieldWithLabel
                            type="text"
                            labelText="Experience"
                            name="experience"
                            placeholder="Enter Experience"
                            value={formData.experience}
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

                    {/* Action Buttons */}
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
        </>
    );
}

export default AddNewTeacherModal;
