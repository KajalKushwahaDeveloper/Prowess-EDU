import { useState, useEffect } from "react";
import InputFieldWithLabel from "../../molecules/InputfieldWithLabel";
import Button from "../../atoms/button";
import Modal from "../../common/modal";
import { Icons } from "../../../assets/icons";
import { addNewTestSchema } from "../../common/validationSchema";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import capitalize from "lodash/capitalize";
import {
  addTest,
  editTest,
  getTestForTeacher
} from "../../../features/dashboardSharedApi/teacherDashboardTestReducer";
import LevelDropdown from "../../molecules/levelDropdown";
import SubjectTypeDropdown from "../../molecules/subjectTypesDropdown";
import ClassTypeDropdown from "../../molecules/classTypeDropdown";
import AddNewTestQsnModal from "./addNewTestQsnModal";
import StudentDropdown from "../../molecules/studentDropdown";

const AddNewTestModal = ({
  visible,
  setVisible,
  mode = "add",
  initialData = {},
}) => {
  const [formData, setFormData] = useState({
    id: initialData?.id || "",
    subject: "",
    chapter: "",
    topic: "",
    Class: "",
    assignedTo: [], // Initialize as an empty array
    level: "",
    startDate: "",
    startTime: "",
    endTime: "",
  });
  

  console.log("initialDataTest:", initialData);

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false); // Track success state
  const [filteredReports, setFilteredReports] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // For question modal
  console.log("validationError:", errors);

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.teacherDashboardAssignSharedApi
  );
  const studentClass = JSON.parse(localStorage.getItem("data"));

  useEffect(() => {
    // Fetch reports on mount
    dispatch(getTestForTeacher({ classId: `${studentClass?.Class}-${studentClass?.section}` }))
      .unwrap()
      .then((response) => setFilteredReports(response.tests)) // Initialize local state
      .catch((error) => {
        toast.error(error || "Failed to fetch reports");
      });
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "assignedTo") {
      // Ensure assignedTo is always a flat array
      setFormData({
        ...formData,
        [name]: value === "allStudent" ? ["All Students"] : [value],
      });
    } else {
      setFormData({
        ...formData,
        [name]:
          ["chapter", "subject", "topic"].includes(name)
            ? capitalize(value)
            : value, // No files handling here
      });
    }
  };
  
  
  
  
  const handleAdd = async () => {
    try {
      // Validate the form data with Yup
      // await addNewTestSchema.validate(formData, { abortEarly: false });
      // setErrors({}); // Clear previous errors

      // Format the startDate and endDate as DD-MM-YYYY
      const formattedStartDate =
        formData.startDate && formData.startDate.includes("-")
          ? formData.startDate.split("-").reverse().join("-")
          : "";

          const payload = {
            subject: formData.subject,
            Class: formData.Class,
            chapter: formData.chapter,
            topic: formData.topic,
            assignedTo: formData.assignedTo, // This will now be ["All Students"]
            level: formData.level,
            startDate: formattedStartDate,
            startTime: formData.startTime,
            endTime: formData.endTime,
          };
          
          console.log("Payload to be sent:", payload);
          
          console.log("Payload to be sent:", payload);
      let resultAction;
      if (mode === "add") {
        resultAction = await dispatch(addTest({ payload })).unwrap();
      } else if (mode === "edit") {
        resultAction = await dispatch(editTest({ id: initialData?.id, payload })).unwrap();
      }

      console.log("resultAction:", resultAction);

      // Check for success after the dispatch
      if (resultAction?.status === 200) {
        toast.success(resultAction?.message || "Test added successfully!");
        setIsSuccess(true);
        setVisible(false); // Close modal
      } else {
        throw new Error(resultAction?.message || "Failed to add test.");
      }

      // Reset the form data
      setFormData({
        subject: "",
        chapter: "",
        topic: "",
        Class: "",
        assignedTo: "",
        level: "",
        startDate: "",
        startTime: "",
        endTime: "",
      });
    } catch (err) {
      if (err?.inner) {
        const validationErrors = {};
        err.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });
        setErrors(validationErrors);
        toast.error("Validation failed. Please fix the errors.");
      } else {
        toast.error(err?.message || "Failed to add Test. Please try again.");
      }
    }
  };


  const handleOpenModal = () => {
    console.log("Opening modal..."); // Debug log
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setVisible(false); // Close the form modal
    setIsModalOpen(false); // Open the question modals
  };
  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      style={{ width: "50vw", maxWidth: "700px" }}
      onHide={() => setVisible(false)}
      className="rounded-lg"
    >
      <div>
        <div className="bg-white m-4">
          <h1 className="font-medium text-2xl my-2">
            {mode === "add" ? "Add New Test" : "Edit New Test"}
          </h1>
          <hr className="mb-8 border-gray-300" />
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="relative">
              <SubjectTypeDropdown
                label="Subjects"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                error={errors.subject}
              />
              {errors.subject && (
                <p
                  className="text-rose-600 text-md  absolute left-0 "
                  style={{ bottom: "-22px" }}
                >
                  {errors?.subject}
                </p>
              )}
            </div>
            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Chapter"
                name="chapter"
                placeholder="Enter Student Chapter"
                value={formData.chapter}
                onChange={handleInputChange}
              />
              {errors.chapter && (
                <p
                  className="text-rose-600 text-md  absolute left-0 "
                  style={{ bottom: "-22px" }}
                >
                  {errors?.chapter}
                </p>
              )}
            </div>
            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Topic Name"
                name="topic"
                placeholder="Enter Topic Name"
                value={formData.topic}
                onChange={handleInputChange}
              />
              {errors.topic && (
                <p
                  className="text-rose-600 text-md  absolute left-0 "
                  style={{ bottom: "-22px" }}
                >
                  {errors?.topic}
                </p>
              )}
            </div>
            <div className="relative">
              <ClassTypeDropdown
                label="Class"
                name="Class"
                value={formData.Class}
                onChange={handleInputChange}
              />
              {errors.Class && (
                <p
                  className="text-rose-600 text-md  absolute left-0 "
                  style={{ bottom: "-22px" }}
                >
                  {errors?.Class}
                </p>
              )}
            </div>
         
            <div className="relative">
            <InputFieldWithLabel
                type="text"
                labelText="Select Students"
                name="assignedTo"
                placeholder="Enter Select Students"
                value={formData.assignedTo}
                onChange={handleInputChange}
              />
              {errors?.assignedTo && (
                <p
                  className="text-rose-600 text-md  absolute left-0 "
                  style={{ bottom: "-22px" }}
                >
                  {errors?.assignedTo}
                </p>
              )}
            </div>
            <div className="relative">
              <LevelDropdown
                label="Level"
                name="level"
                value={formData.level}
                onChange={handleInputChange}
              />
              {errors?.level && (
                <p
                  className="text-rose-600 text-md  absolute left-0 "
                  style={{ bottom: "-22px" }}
                >
                  {errors?.level}
                </p>
              )}
            </div>
            <div className="relative">
              <InputFieldWithLabel
                labelText="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleInputChange}
                error={errors.startDate}
              />
              {errors.startDate && (
                <p
                  className="text-rose-600 text-md  absolute left-0 "
                  style={{ bottom: "-22px" }}
                >
                  {errors?.startDate}
                </p>
              )}
            </div>

            <div className="relative">
              <InputFieldWithLabel
                labelText="Start Time"
                name="startTime"
                type="time"
                //  placeholder="Enter something"
                value={formData.startTime}
                onChange={handleInputChange}
                error={errors.startTime}
              />
              {errors.startTime && (
                <p
                  className="text-rose-600 text-md  absolute left-0 "
                  style={{ bottom: "-22px" }}
                >
                  {errors?.startTime}
                </p>
              )}
            </div>
            <div className="relative">
              <InputFieldWithLabel
                labelText="End Time"
                name="endTime"
                type="time"
                //  placeholder="Enter something"
                value={formData.endTime}
                onChange={handleInputChange}
                error={errors.endTime}
              />
              {errors.endTime && (
                <p
                  className="text-rose-600 text-md  absolute left-0 "
                  style={{ bottom: "-22px" }}
                >
                  {errors?.endTime}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <Button
              label="Cancel"
              backgroundColor="#FF8A00"
              onClick={() => setVisible(false)}
            // icon ={Icons.cancelIcon}
            />
            <Button
              label={loading ? (
                <div className="spinner"></div>
              ) : mode === "add" ? (
                "Add"
              ) : (
                "Update"
              )}
              
              backgroundColor="#00A943"
              onClick={handleAdd}
            />
            <Button
              visible={!visible}
              backgroundColor="#0069A4"
              onClick={handleOpenModal}
              icon={Icons.rightArrow}
            />
            {isModalOpen && (
              <AddNewTestQsnModal
                visible={isModalOpen}
                onClose={handleCloseModal}
                testId={formData.id}
              />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddNewTestModal;
