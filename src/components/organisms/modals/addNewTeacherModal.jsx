import { useState } from "react";
import InputFieldWithLabel from "../../molecules/InputfieldWithLabel";
import Button from "../../atoms/button";
import Modal from "../../common/modal";
import { addTeacherSchema } from "../../common/validationSchema"; // Ensure this is relevant for teachers

function AddNewTeacherModal({ visible, setVisible }) {
  const [formData, setFormData] = useState({
    teacherName: "",
    email: "",
    phone: "",
    qualification: "",
    dob: null,
    gender: "",
    address: "",
    classYouCanTeach: "",
    experience: "",
    subjects: "",
  });
  const [errors, setErrors] = useState({});
console.log("teachererr:", errors );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = async () => {
    console.log("Add button clicked"); // Debugging
    try {
      // Validate the form data
      await addTeacherSchema.validate(formData, { abortEarly: false });
      console.log("Teacher Data: ", formData); // For debugging
      setErrors({}); // Clear previous errors if validation passes
      // Here, you would typically call a function to add the teacher
      setVisible(false); // Optionally close the modal on success
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
      <div className="bg-white">
        <h1 className="font-medium text-2xl my-2">Add New Teacher</h1>
        <hr className="mb-8 border-gray-300" />

        {/* Form fields */}
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
            <InputFieldWithLabel
              type="email"
              labelText="Email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-rose-600 text-md absolute left-0 " style={{ bottom: '-22px' }}>{errors.email}</p>
            )}
          </div>

            <div className="relative">
            <InputFieldWithLabel
              type="text"
              labelText="Phone"
              name="phone"
              placeholder="Enter Phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            {errors.phone && (
              <p className="text-rose-600 text-md absolute left-0 " style={{ bottom: '-22px' }}>{errors.phone}</p>
            )}
          </div>

            <div className="relative">
            <InputFieldWithLabel
              type="text"
              labelText="Qualification"
              name="qualification"
              placeholder="Enter Qualification"
              value={formData.qualification}
              onChange={handleInputChange}
            />
            {errors.qualification && (
              <p className="text-rose-600 text-md absolute left-0 " style={{ bottom: '-22px' }}>{errors.qualification}</p>
            )}
          </div>

            <div className="relative">
            <InputFieldWithLabel
              type="date"
              labelText="Date of Birth"
              name="dob"
              placeholder="Select Date of Birth"
              value={formData.dob}
              onChange={handleInputChange}
            />
            {errors.dob && (
              <p className="text-rose-600 text-md absolute left-0 " style={{ bottom: '-22px' }}>{errors.dob}</p>
            )}
          </div>

            <div className="relative">
            <InputFieldWithLabel
              type="text"
              labelText="Gender"
              name="gender"
              placeholder="Select Gender"
              value={formData.gender}
              onChange={handleInputChange}
            />
            {errors.gender && (
              <p className="text-rose-600 text-md absolute left-0 " style={{ bottom: '-22px' }}>{errors.gender}</p>
            )}
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
            {errors.address && (
              <p className="text-rose-600 text-md absolute absolute left-0 " style={{ bottom: '-22px' }}>{errors.address}</p>
            )}
          </div>

            <div className="relative">
            <InputFieldWithLabel
              type="text"
              labelText="Classes You Can Teach"
              name="classYouCanTeach"
              placeholder="Enter Classes"
              value={formData.classYouCanTeach}
              onChange={handleInputChange}
            />
            {errors.classYouCanTeach && (
              <p className="text-rose-600 text-md absolute left-0 " style={{ bottom: '-22px' }}>{errors.classYouCanTeach}</p>
            )}
          </div>

            <div className="relative">
            <InputFieldWithLabel
              type="text"
              labelText="Experience"
              name="experience"
              placeholder="Enter Experience"
              value={formData.experience}
              onChange={handleInputChange}
            />
            {errors.experience && (
              <p className="text-rose-600 text-md absolute left-0 " style={{ bottom: '-22px' }}>{errors.experience}</p>
            )}
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
            {errors.subjects && (
              <p className="text-rose-600 text-md absolute left-0 " style={{ bottom: '-22px' }}>{errors.subjects}</p>
            )}
          </div>
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
  );
}

export default AddNewTeacherModal;
