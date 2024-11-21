import { useState } from "react";
import InputFieldWithLabel from "../../molecules/InputfieldWithLabel";
import Button from "../../atoms/button";
import Modal from "../../common/modal";
import { addStudentSchema } from "../../common/validationSchema";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../features/dashboardSharedApi/sharedReducer";
import SubjectsDropdown from "../../molecules/subjectsDropdown";
import GenderDropdown from "../../molecules/genderDropdown";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function AddNewStudentModal({ visible, setVisible }) {
  const [formData, setFormData] = useState({
    name: "",
    parentName: "",
    parentPhone: "",
    email: "",
    dob: "",
    gender: "",
    section: "",
    class: "",
    address: "",
    subjects: [],
  });

  const [errors, setErrors] = useState({});
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  console.log("errors:", errors);

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.sharedApi);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = async () => {
    try {
      // Dispatch the addItem action with role and payload
      await addStudentSchema.validate(formData, { abortEarly: false });
      console.log("student Data: ", formData);
      await dispatch(addItem({ role: "teacher", payload: formData })).unwrap();
      // Validate the form data
      setErrors({}); // Clear previous errors if validation passes
      toast.success(data?.data?.message || "Teacher added successfully! "); // Clear previous errors if validation passes
      toast.success("Student added successfully! "); // Clear previous errors if validation passes
      setFormData({
        name: "",
        parentName: "",
        parentPhone: "",
        email: "",
        dob: "",
        gender: "",
        section: "",
        class: "",
        address: "",
        subjects: [],
      });
      setVisible(false); // Optionally close the modal on success
    } catch (error) {
      const formattedErrors = {};
      error?.inner?.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      console.log("Validation errors:", formattedErrors); // For debugging
      setErrors(formattedErrors);
      toast.error(error || "Failed to add student. Please fix errors.");
      console.log("Validation or API errors:", error);
    }
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <Modal
        visible={visible}
        setVisible={setVisible}
        style={{ width: "50vw", maxWidth: "700px" }}
        onHide={() => setVisible(false)}
        className="rounded-lg"
      >
        <div className="bg-white lg:m-0 m-4">
          <h1 className="font-medium text-2xl my-2">Add new Student</h1>
          <hr className="mb-8 border-gray-300" />

          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Student Name"
                name="name"
                placeholder="Enter Student Name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && (
                <p
                  className="text-rose-600 text-md  absolute left-0 "
                  style={{ bottom: "-22px" }}
                >
                  {errors.name}
                </p>
              )}
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
              {errors.parentName && (
                <p
                  className="text-rose-600 text-md  absolute left-0 "
                  style={{ bottom: "-22px" }}
                >
                  {errors.parentName}
                </p>
              )}
            </div>

            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Student/Parent Phone"
                name="parentPhone"
                placeholder="Enter Phone Number"
                value={formData.parentPhone}
                onChange={handleInputChange}
              />
              {errors.parentPhone && (
                <p
                  className="text-rose-600 text-md  absolute left-0 "
                  style={{ bottom: "-22px" }}
                >
                  {errors.parentPhone}
                </p>
              )}
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
              {errors.email && (
                <p
                  className="text-rose-600 text-md  absolute left-0 "
                  style={{ bottom: "-22px" }}
                >
                  {errors.email}
                </p>
              )}
            </div>

            <div className="relative">
              <InputFieldWithLabel
                type="date"
                labelText="Date of Birth"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
              />
              {errors.dob && (
                <p
                  className="text-rose-600 text-md  absolute left-0 "
                  style={{ bottom: "-22px" }}
                >
                  {errors.dob}
                </p>
              )}
            </div>

            <div className="relative">
              <GenderDropdown
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                error={errors.gender}
              />
              {errors.gender && (
                <p
                  className="text-rose-600 text-sm absolute left-0 "
                  style={{ bottom: "-20px" }}
                >
                  {errors.gender}
                </p>
              )}
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
              {errors.section && (
                <p
                  className="text-rose-600 text-md  absolute left-0 "
                  style={{ bottom: "-22px" }}
                >
                  {errors.section}
                </p>
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
                <p
                  className="text-rose-600 text-md  absolute left-0 "
                  style={{ bottom: "-22px" }}
                >
                  {errors.class}
                </p>
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
                <p
                  className="text-rose-600 text-md  absolute left-0 "
                  style={{ bottom: "-22px" }}
                >
                  {errors.address}
                </p>
              )}
            </div>

            <div className="relative">
              <SubjectsDropdown
                label="Subjects"
                name="subjects"
                selectedValues={formData.subjects}
                onChange={(newSelectedSubjects) => {
                  setSelectedSubjects(newSelectedSubjects); // Update local state
                  setFormData({ ...formData, subjects: newSelectedSubjects });
                }}
              />
              {errors.subjects && (
                <p
                  className="text-rose-600 text-sm absolute left-0 "
                  style={{ bottom: "-20px" }}
                >
                  {errors.subjects}
                </p>
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
                  <FaSpinner className="animate-spin text-white mx-auto" />
                ) : (
                  "Add"
                )
              }
              backgroundColor="#00A943"
              onClick={handleAdd}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AddNewStudentModal;
