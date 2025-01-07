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

function AddClassesModal({ visible, setVisible  ,mode = "add", initialData = {}}) {
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
          <h1 className="font-medium text-2xl my-2">{mode === "add" ? "Add Student Class" : "Edit Student Class"}</h1>
          <hr className="mb-8 border-gray-300" />

          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Student Class"
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
                labelText="Student Section"
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

export default AddClassesModal;
