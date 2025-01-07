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
    startRange: "",
    endRange: "",
    phone: "",
    qualification: "",
    dob: null,
    gender: "",
    address: "",
    classesCanTeach: [],
    experience: "",
    subjects: [],
    ...initialData,
  });
  console.log("formData:", formData);

  const [errors, setErrors] = useState({});
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.sharedApi);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "dob") {
      // Format the date as DD-MM-YYYY
      const formattedDate = value.split("-").reverse().join("-");
      setFormData({ ...formData, [name]: formattedDate });
    } else {
      setFormData({
        ...formData,
        [name]: [
          "name",
          "subject",
          "qualification",
          "address",
          "schoolAddress",
          "schoolName",
        ].includes(name)
          ? capitalize(value)
          : value,
      });
    }
  };

  const handleAdd = async () => {
    try {
      // Ensure classesCanTeach is properly formatted as an array
      const updatedClassesCanTeach = Array.isArray(formData.classesCanTeach)
        ? formData.classesCanTeach.map((item) => item.trim()) // Trim spaces for each item
        : formData.classesCanTeach
            .split(",") // Split by commas if it's a string
            .map((item) => item.trim()); // Trim spaces for each item

      // Update the formData with the transformed classesCanTeach
      const updatedFormData = {
        ...formData,
        classesCanTeach: updatedClassesCanTeach, // Ensure it's an array
      };

      // Validate the updated form data
      await addTeacherSchema.validate(updatedFormData, { abortEarly: false });
      setErrors({});

      // Dispatch the action based on the mode
      if (mode === "add") {
        await dispatch(
          addItem({ role: "teacher", payload: updatedFormData })
        ).unwrap();
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

      // Reset form data
      setFormData({
        name: "",
        email: "",
        schoolName: "",
        schoolAddress: "",
        phone: "",
        qualification: "",
        startRange: "",
        endRange: "",
        dob: null,
        gender: "",
        address: "",
        classesCanTeach: [],
        experience: "",
        subjects: [],
      });

      setVisible(false); // Optionally close the modal on success
    } catch (error) {
      const formattedErrors = {};
      error?.inner?.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      console.log("Validation errors:", formattedErrors);
      setErrors(formattedErrors);
      toast.error(error || "Failed to add teacher. Please fix errors.");
      console.log("Validation or API errors:", error);
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
                selectedValues={formData.classesCanTeach} // Bind to formData
                onChange={(newSelectedClasses) => {
                  setFormData({
                    ...formData,
                    classesCanTeach: newSelectedClasses, // Ensure it's an array
                  });
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
