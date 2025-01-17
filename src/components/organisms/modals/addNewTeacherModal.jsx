import { useState } from "react";
import InputFieldWithLabel from "../../molecules/InputfieldWithLabel";
import { useDispatch, useSelector } from "react-redux";
// import Button from "../../atoms/button";
import Modal from "../../common/modal";
import { addTeacherSchema } from "../../common/validationSchema";
import {
  addItem,
  editItem,
} from "../../../features/dashboardSharedApi/sharedReducer";
import GenderDropdown from "../../molecules/genderDropdown";
import ClassDropdown from "../../molecules/classDropdown";
import SubjectsDropdown from "../../molecules/subjectsDropdown";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import capitalize from "lodash/capitalize";
import ButtonText from "../../atoms/buttonText";

function AddNewTeacherModal({
  visible,
  setVisible,
  mode = "add",
  initialData = {},
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    schoolName: "",
    schoolAddress: "",
    startRange: 0, // Default to a number
    endRange: 0,   // Default to a number
    phone: "",
    qualification: "",
    dob: null,
    gender: "",
    address: "",
    classesCanTeach: [], // Default to an empty array
    experience: "",
    subjects: [],
    ...initialData,
  });

  console.log("formData:", formData);

  const [errors, setErrors] = useState({});
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const dispatch = useDispatch();
  console.error("Validation error:", errors);

  const { data, loading } = useSelector((state) => state.sharedApi);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "dob") {
      const formattedDate = value.split("-").reverse().join("-");
      setFormData({ ...formData, [name]: formattedDate });
    } else {
      const updatedValue = ["startRange", "endRange"].includes(name)
        ? Number(value)
        : ["name", "subject", "qualification", "address", "schoolAddress", "schoolName"].includes(name)
        ? capitalize(value)
        : value;
  
      setFormData({ ...formData, [name]: updatedValue });
      console.log(`Updated ${name}:`, updatedValue); // Debugging
    }
  };  

  const handleAdd = async () => {
    try {
      const updatedFormData = {
        ...formData,
        startRange: Number(formData.startRange),
        endRange: Number(formData.endRange),
      };
  
      console.log("Validating data:", updatedFormData);
  
      // Validate the updated form data
      // await addTeacherSchema.validate(updatedFormData, { abortEarly: false });
      setErrors({});
  
      // Dispatch the action
      if (mode === "add") {
        await dispatch(addItem({ role: "teacher", payload: updatedFormData })).unwrap();
        toast.success(data?.data?.message || "Teacher added successfully!");
      } else if (mode === "edit") {
        await dispatch(
          editItem({
            role: "teacher",
            id: initialData?.id,
            payload: updatedFormData,
          })
        ).unwrap();
        toast.success(data?.data?.message || "Teacher updated successfully!");
      }
  
      // Reset form and close modal
      setFormData({
        name: "",
        email: "",
        schoolName: "",
        schoolAddress: "",
        phone: "",
        qualification: "",
        startRange: 0,
        endRange: 0,
        dob: null,
        gender: "",
        address: "",
        classesCanTeach: [],
        experience: "",
        subjects: [],
      });
      setVisible(false);
    } catch (error) {
      const formattedErrors = {};
      error?.inner?.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
      toast.error("Failed to add teacher. Please fix errors.");
    }
  };
  
  return (
    <>
      <Modal
        visible={visible}
        setVisible={setVisible}
        style={{ width: "50vw", maxWidth: "700px" }}
        onHide={() => setVisible(false)}
        className="rounded-lg"
      >
        <div className="bg-white lg:m-0 m-4">
          <h1 className="font-medium text-2xl mb-2">
            {mode === "add" ? "Add New Teacher" : "Edit Teacher"}
          </h1>
          <hr className="mb-4 border-gray-300" />

          {/* Form fields */}
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Teacher Name"
                name="name"
                placeholder="Enter Teacher Name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && (
                <p
                  className="text-rose-600 text-sm  absolute left-0 "
                  style={{ bottom: "-20px" }}
                >
                  {errors?.name}
                </p>
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
                <p
                  className="text-rose-600 text-sm absolute left-0 "
                  style={{ bottom: "-20px" }}
                >
                  {errors.email}
                </p>
              )}
            </div>

            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Teacher School Name"
                name="schoolName"
                placeholder="Enter School Name"
                value={formData.schoolName}
                onChange={handleInputChange}
              />
              {errors.schoolName && (
                <p
                  className="text-rose-600 text-sm absolute left-0 "
                  style={{ bottom: "-20px" }}
                >
                  {errors.schoolName}
                </p>
              )}
            </div>

            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="teacher School Address"
                name="schoolAddress"
                placeholder="Enter School Address"
                value={formData.schoolAddress}
                onChange={handleInputChange}
              />
              {errors.schoolAddress && (
                <p
                  className="text-rose-600 text-sm absolute left-0 "
                  style={{ bottom: "-20px" }}
                >
                  {errors.schoolAddress}
                </p>
              )}
            </div>

            <div className="relative">
              <InputFieldWithLabel
                type="number"
                labelText="Start Range"
                name="startRange"
                placeholder="Enter Start Range"
                value={formData.startRange}
                onChange={handleInputChange}
              />
              {errors.startRange && (
                <p
                  className="text-rose-600 text-sm absolute left-0 "
                  style={{ bottom: "-20px" }}
                >
                  {errors.startRange}
                </p>
              )}
            </div>

            <div className="relative">
              <InputFieldWithLabel
                type="number"
                labelText="End Range"
                name="endRange"
                placeholder="Enter End Range"
                value={formData.endRange}
                onChange={handleInputChange}
              />
              {errors.endRange && (
                <p
                  className="text-rose-600 text-sm absolute left-0 "
                  style={{ bottom: "-20px" }}
                >
                  {errors.endRange}
                </p>
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
                <p
                  className="text-rose-600 text-sm absolute left-0 "
                  style={{ bottom: "-20px" }}
                >
                  {errors.phone}
                </p>
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
                <p
                  className="text-rose-600 text-sm absolute left-0 "
                  style={{ bottom: "-20px" }}
                >
                  {errors.qualification}
                </p>
              )}
            </div>
            <div className="relative">
              <InputFieldWithLabel
                type="date"
                labelText="Date of Birth"
                name="dob"
                value={formData?.dob?.split("-").reverse().join("-")}
                onChange={handleInputChange}
              />
              {errors.dob && (
                <p
                  className="text-rose-600 text-sm absolute left-0 "
                  style={{ bottom: "-20px" }}
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
                labelText="Address"
                name="address"
                placeholder="Enter Address"
                value={formData.address}
                onChange={handleInputChange}
              />
              {errors.address && (
                <p
                  className="text-rose-600 text-sm absolute absolute left-0 "
                  style={{ bottom: "-20px" }}
                >
                  {errors.address}
                </p>
              )}
            </div>

            <div className="relative">
            <ClassDropdown
  label="Classes"
  name="classesCanTeach"
  onChange={(selectedClasses) => {
    console.log("Selected Classes:", selectedClasses); // Debugging
    setFormData((prev) => ({
      ...prev,
      classesCanTeach: selectedClasses, // Ensure it's updating
    }));
  }}
  customClass="w-full"
/>

              {errors.classesCanTeach && (
                <p
                  className="text-rose-600 text-sm absolute absolute left-0 "
                  style={{ bottom: "-20px" }}
                >
                  {errors.classesCanTeach}
                </p>
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
                <p
                  className="text-rose-600 text-sm absolute left-0 "
                  style={{ bottom: "-20px" }}
                >
                  {errors.experience}
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
                  className="text-rose-600 text-sm absolute left-0"
                  style={{ bottom: "-20px" }}
                >
                  {errors.subjects}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-4">
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
    </>
  );
}

export default AddNewTeacherModal;
