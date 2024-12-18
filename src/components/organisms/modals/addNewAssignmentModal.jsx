import { useState, useEffect } from "react";
import InputFieldWithLabel from "../../molecules/InputfieldWithLabel";
import Button from "../../atoms/button";
import Modal from "../../common/modal";
import { Icons } from "../../../assets/icons";
import { addNewAssignmentSchema } from "../../common/validationSchema";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import capitalize from "lodash/capitalize";
import {
  addAssign,
  editAssign,
} from "../../../features/dashboardSharedApi/teacherDashboardAssignReducer";
import LevelDropdown from "../../molecules/levelDropdown";
import SubjectTypeDropdown from "../../molecules/subjectTypesDropdown";
import ClassTypeDropdown from "../../molecules/classTypeDropdown";
import AddNewAssignmentQsnModal from "./addNewAssignQsnModal";
import { getAssignForTeacher } from "../../../features/dashboardSharedApi/teacherDashboardAssignReducer";

const AddNewAssignmentModal = ({
  visible,
  setVisible,
  mode = "add",
  initialData = {},
  assignmentId
}) => {
  
  const [formData, setFormData] = useState({
    id: assignmentId,
    subject: "",
    chapter: "",
    topic: "",
    Class: "",
    assignedTo: [],
    level: "",
    assignFile: "",
    startDate: "",
    endDate: "",
    ...initialData,
  });

  console.log("assignmentFormdata:",formData.id,"AssignmentId:",  assignmentId);
  
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false); // Track success state
  const [filteredReports, setFilteredReports] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // For question modal

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.teacherDashboardAssignSharedApi
  );
  const studentClass = JSON.parse(localStorage.getItem("data"));

  useEffect(() => {
    // Fetch reports on mount
    dispatch(getAssignForTeacher({ classId: `${studentClass?.Class}-${studentClass?.section}` }))
      .unwrap()
      .then((response) => setFilteredReports(response.assignments)) // Initialize local state
      .catch((error) => {
        toast.error(error || "Failed to fetch reports");
      });
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "startDate" || name === "endDate") {
      // Keep the input value in yyyy-MM-dd format
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]:
          files && files.length > 0
            ? files[0]
            : ["chapter", "subject", "topic", "assignedTo"].includes(name)
            ? capitalize(value)
            : value,
      });
    }
  };

  const handleAdd = async () => {
    try {
      // Validate the form data with Yup
      // await addNewAssignmentSchema.validate(formData, { abortEarly: false });
      // setErrors({}); // Clear previous errors

      // Format the startDate and endDate as DD-MM-YYYY
      const formattedStartDate = formData.startDate
        ? formData.startDate.split("-").reverse().join("-")
        : "";
      const formattedEndDate = formData.endDate
        ? formData.endDate.split("-").reverse().join("-")
        : "";

      const formDataToSend = new FormData();
      console.log("formDataToSend:", formDataToSend);

      Object.keys(formData).forEach((key) => {
        if (key === "startDate") {
          formDataToSend.append("startDate", formattedStartDate);
        } else if (key === "endDate") {
          formDataToSend.append("endDate", formattedEndDate);
        } else if (key === "assignFile" && formData[key]) {
          formDataToSend.append("assignFile", formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      let resultAction;
      if (mode === "add") {
        // Dispatch 'addAssign' action and await the result
        resultAction = await dispatch(
          addAssign({ payload: formDataToSend })
        ).unwrap();
      } else if (mode === "edit") {
        resultAction = await dispatch(
          editAssign({ id: initialData?.id, payload: formDataToSend })
        ).unwrap();
      }
      console.log("resultAction:", resultAction);

      // Check for success after the dispatch
      if (resultAction?.status === 200) {
        toast.success(
          resultAction?.message || "Assignment added successfully!"
        );
        setIsSuccess(true); // Mark as successful
      } else {
        throw new Error(resultAction?.message || "Failed to add assignment.");
      }

      // Reset the form data after successful add or edit
      setFormData({
        id: "",
        subject: "",
        chapter: "",
        topic: "",
        Class: "",
        assignedTo: "",
        level: "",
        assignFile: "",
        startDate: "",
        endDate: "",
      });
    } catch (err) {
      // Handle Yup validation errors
      if (err?.inner) {
        const validationErrors = {};
        err.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });
        setErrors(validationErrors); // Set validation errors in the state
        toast.error("Validation failed. Please fix the errors.");
      } else {
        toast.error(
          err?.message || "Failed to add Assignment. Please try again."
        );
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
            {mode === "add" ? "Add New Assignment" : "Edit New Assignment"}{" "}
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
                placeholder="Select Students"
                value={formData.assignedTo}
                onChange={handleInputChange}
              />
              {errors.assignedTo && (
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
                labelText="End Date"
                name="endDate"
                type="date"
                //  placeholder="Enter something"
                value={formData.endDate}
                onChange={handleInputChange}
                error={errors.endDate}
              />
              {errors.endDate && (
                <p
                  className="text-rose-600 text-md  absolute left-0 "
                  style={{ bottom: "-22px" }}
                >
                  {errors?.endDate}
                </p>
              )}
            </div>
            <div className="relative">
              <InputFieldWithLabel
                type="file"
                labelText="Upload Assignment"
                name="assignFile"
                placeholder="Upload Assignment"
                onChange={handleInputChange} // Handle file input change
              />

              {errors.assignFile && (
                <p
                  className="text-rose-600 text-md  absolute left-0 "
                  style={{ bottom: "-22px" }}
                >
                  {errors?.assignFile}
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
            <Button
              visible={!visible}
              backgroundColor="#0069A4"
              onClick={handleOpenModal}
              icon={Icons.rightArrow}
            />
            {isModalOpen && (
              <AddNewAssignmentQsnModal
                visible={isModalOpen}
                onClose={handleCloseModal}
                assignmentId={formData.id}
              />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddNewAssignmentModal;
