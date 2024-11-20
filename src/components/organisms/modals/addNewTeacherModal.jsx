import { useState } from "react";
import InputFieldWithLabel from "../../molecules/InputfieldWithLabel";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../atoms/button";
import Modal from "../../common/modal";
import { addTeacherSchema } from "../../common/validationSchema";
import { addItem } from "../../../features/dashboardSharedApi/sharedReducer";
import GenderDropdown from "../../molecules/genderDropdown";
import ClassDropdown from "../../molecules/classDropdown";
import SubjectsDropdown from "../../molecules/subjectsDropdown";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function AddNewTeacherModal({ visible, setVisible }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    dob: null,
    gender: "",
    address: "",
    classYouCanTeach: [],
    experience: "",
    subjects: [],
  });
  const [errors, setErrors] = useState({});
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const dispatch = useDispatch();
  console.log("formData:", formData);

  const { data, loading, error } = useSelector((state) => state.sharedApi);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "dob") {
      // Format the date as DD-MM-YYYY
      const formattedDate = value.split("-").reverse().join("-");
      setFormData({ ...formData, [name]: formattedDate });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAdd = async () => {
    try {
      // Dispatch the addItem action with role and payload
      await addTeacherSchema.validate(formData, { abortEarly: false });
      console.log("Teacher Data: ", formData);
      await dispatch(addItem({ role: "teacher", payload: formData })).unwrap();
      // Validate the form data
      setErrors({});
      toast.success(data?.data?.message || "Teacher added successfully! "); // Clear previous errors if validation passes
      setFormData({
        name: "",
        email: "",
        phone: "",
        qualification: "",
        dob: null,
        gender: "",
        address: "",
        classYouCanTeach: [],
        experience: "",
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
      toast.error(error || "Failed to add teacher. Please fix errors."); 
      console.log("Validation or API errors:", error);
    }
  };
  console.log("Selected subjects:", selectedSubjects);
  console.log("Form Data Classes:", formData.subjects);
  
  return (
    <>
    <ToastContainer />
    <Modal
      visible={visible}
      setVisible={setVisible}
      style={{ width: "50vw", maxWidth: "700px" }}
      onHide={() => setVisible(false)}
      className="rounded-lg"
    >
      
      <div className="bg-white lg:m-0 m-4">
        <h1 className="font-medium text-2xl my-2">Add New Teacher</h1>
        <hr className="mb-8 border-gray-300" />

        {/* Form fields */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
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
              <p className="text-rose-600 text-sm  absolute left-0 " style={{ bottom: '-20px' }}>{errors?.name}</p>
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
              <p className="text-rose-600 text-sm absolute left-0 " style={{ bottom: '-20px' }}>{errors.email}</p>
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
              <p className="text-rose-600 text-sm absolute left-0 " style={{ bottom: '-20px' }}>{errors.phone}</p>
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
              <p className="text-rose-600 text-sm absolute left-0 " style={{ bottom: '-20px' }}>{errors.qualification}</p>
            )}
          </div>
          <div className="relative">
            <InputFieldWithLabel
              type="date"
              labelText="Date of Birth"
              name="dob"
              placeholder="Select Date of Birth"
              value={formData?.dob?.split("-").reverse().join("-")}
              onChange={handleInputChange}
            />
            {errors.dob && (
              <p className="text-rose-600 text-sm absolute left-0 " style={{ bottom: '-20px' }}>{errors.dob}</p>
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
              <p className="text-rose-600 text-sm absolute left-0 " style={{ bottom: '-20px' }}>{errors.gender}</p>
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
              <p className="text-rose-600 text-sm absolute absolute left-0 " style={{ bottom: '-20px' }}>{errors.address}</p>
            )}
          </div>

          <div className="relative">
            <ClassDropdown
              label="Classes"
              selectedValues={formData.classYouCanTeach} // Bind to formData
              onChange={(newSelectedClasses) => {
                setSelectedClasses(newSelectedClasses); // Update local state
                setFormData({ ...formData, classYouCanTeach: newSelectedClasses }); // Update formData
              }}
              customClass="w-full"
            />


            {errors.classYouCanTeach && (
              <p className="text-rose-600 text-sm absolute absolute left-0 " style={{ bottom: '-20px' }}>
                {errors.classYouCanTeach}
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
              <p className="text-rose-600 text-sm absolute left-0 " style={{ bottom: '-20px' }}>{errors.experience}</p>
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
              <p className="text-rose-600 text-sm absolute left-0 " style={{ bottom: '-20px' }}>{errors.subjects}</p>
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
            label={loading ? (
              <FaSpinner className="animate-spin text-white mx-auto" />
            ) : (
              "Add"
            )}
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