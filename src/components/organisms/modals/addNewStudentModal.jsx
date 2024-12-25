import { useState } from "react";
import InputFieldWithLabel from "../../molecules/InputfieldWithLabel";
import Button from "../../atoms/button";
import Modal from "../../common/modal";
import { addStudentSchema } from "../../common/validationSchema";
import { useDispatch, useSelector } from "react-redux";
import { addItem ,editItem} from "../../../features/dashboardSharedApi/sharedReducer";
import SubjectsDropdown from "../../molecules/subjectsDropdown";
import GenderDropdown from "../../molecules/genderDropdown";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import capitalize from 'lodash/capitalize';
import ButtonText from "../../atoms/buttonText";

function AddNewStudentModal({ visible, setVisible  ,mode = "add", initialData = {}}) {
  const [formData, setFormData] = useState({
    name: "",
    parentName: "",
    parentPhone: "",
    email: "",
    dob: null,
    gender: "",
    section: "",
    Class: "",
    address: "",
    subjects: [],
    ...initialData,
  });
  const [errors, setErrors] = useState({});
  const [selectedSubjects, setSelectedSubjects] = useState([]);


  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.sharedApi);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "dob") {
      // Format the date as DD-MM-YYYY
      const formattedDate = value.split("-").reverse().join("-");
      setFormData({ ...formData, [name]: formattedDate });
    } else {
      // setFormData({ ...formData, [name]: value });
      setFormData({ 
        ...formData,
        [name]:
          ["name", "parentName", "address", "section"].includes(name)
            ? capitalize(value) // Use lodash capitalize for these fields
            : value, // Use raw value for other fields
          })
        };
    
  };


  const handleAdd = async () => {
    try {
      // Dispatch the addItem action with role and payload
      await addStudentSchema.validate(formData, { abortEarly: false });
      setErrors({}); // Clear previous errors if validation passes
   
      if (mode === "add") {
        await dispatch(addItem({ role: "student", payload: formData })).unwrap();
        toast.success(data?.data?.message || "Student added successfully!");
      } else if (mode === "edit") {
        await dispatch(editItem({ role: "student", id: initialData?.id, payload: formData })).unwrap();
        toast.success(data?.data?.message || "Student updated successfully!");
      }
       // Validate the form data
      setFormData({
        name: "",
        parentName: "",
        parentPhone: "",
        email: "",
        dob: null,
        gender: "",
        section: "",
        Class: "",
        address: "",
        subjects: [],
      });
      setVisible(false);
      // setModalMode("add")
      // setCurrentStudent(null)// Optionally close the modal on success
    } catch (error) {
      const formattedErrors = {};
      error?.inner?.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      console.log("Validation errors:", formattedErrors);
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
          <h1 className="font-medium text-2xl my-2">{mode === "add" ? "Add New Student" : "Edit Student"}</h1>
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
                value={formData?.dob?.split("-").reverse().join("-")}
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
                name="Class"
                placeholder="Enter Class"
                value={formData.Class}
                onChange={handleInputChange}
              />
              {errors.Class && (
                <p
                  className="text-rose-600 text-md  absolute left-0 "
                  style={{ bottom: "-22px" }}
                >
                  {errors.Class}
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

export default AddNewStudentModal;
