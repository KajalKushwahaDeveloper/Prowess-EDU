import { useState } from "react";
import InputFieldWithLabel from "../../molecules/InputfieldWithLabel";
import Button from "../../atoms/button";
import Modal from "../../common/modal";
import { createReportSchema } from "../../common/validationSchema";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { createReport, editReport } from "../../../features/dashboardSharedApi/teacherSharedreducer";
import LevelDropdown from "../../molecules/levelDropdown";
import capitalize from 'lodash/capitalize';
import SubjectTypeDropdown from "../../molecules/subjectTypesDropdown";

function CreateReportModal({ visible, setVisible, mode = "add", initialData = {} }) {
  const [formData, setFormData] = useState({
    studentName: "",
    sID: "",
    subject: "",
    marks: "",
    assignmentMarks: "",
    testMarks: "",
    grade: "",
    level: "",
    recommendation: "",
    comment: "",
    ...initialData,
  });

  const [errors, setErrors] = useState({});
  const teacherDashboardData = JSON.parse(localStorage.getItem("data"));
  console.log("formdata:", formData);

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.sharedApi);


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "dob") {
      // Format the date as DD-MM-YYYY
      const formattedDate = value.split("-").reverse().join("-");
      setFormData({
        ...formData,
        [name]: formattedDate, // Use the formatted date for dob
      });
    } else {
      setFormData({
        ...formData,
        [name]:
          ["studentName", "subject", "grade", "recommendation", "comment"].includes(name)
            ? capitalize(value) // Use lodash capitalize for these fields
            : value, // Use raw value for other fields
      });
    }
  };


  const handleAdd = async () => {
    try {
      // Dispatch the addItem action with role and payload
      await createReportSchema.validate(formData, { abortEarly: false });
      setErrors({}); // Clear previous errors if validation passes

      if (mode === "add") {
        await dispatch(createReport({  payload: formData })).unwrap();
        toast.success(data?.data?.message || "Student added successfully!");
      } else if (mode === "edit") {
        await dispatch(editReport({  id: initialData?.id, payload: formData })).unwrap();
        toast.success(data?.data?.message || "Student updated successfully!");
      }
      // Validate the form data
      setFormData({
        studentName: "",
        sID: "",
        subject: "",
        marks: "",
        assignmentMarks: "",
        testMarks: "",
        grade: "",
        level: "",
        recommendation: "",
        comment: ""
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
          <h1 className="font-medium text-2xl my-2">{mode === "add" ? "Add Student Report" : "Edit Student Report"}</h1>
          <hr className="mb-8 border-gray-300" />

          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Student Name"
                name="studentName"
                placeholder="Enter Student Name"
                value={formData.studentName}
                onChange={handleInputChange}
              />
              {errors.studentName && (
                <p
                  className="text-rose-600 text-md  absolute left-0 "
                  style={{ bottom: "-22px" }}
                >
                  {errors.studentName}
                </p>
              )}
            </div>

            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="sID"
                name="sID"
                placeholder="Enter sID"
                value={formData.sID}
                onChange={handleInputChange}
              />
              {errors.sID && (
                <p
                  className="text-rose-600 text-md absolute left-0 "
                  style={{ bottom: "-22px" }}
                >
                  {errors.sID}
                </p>
              )}
            </div>

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
                  {errors.subject}
                </p>
              )}
            </div>

            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Marks"
                name="marks"
                placeholder="Enter Marks"
                value={formData.marks}
                onChange={handleInputChange}
              />
              {errors.marks && (
                <p
                  className="text-rose-600 text-md  absolute left-0 "
                  style={{ bottom: "-22px" }}
                >
                  {errors.marks}
                </p>
              )}
            </div>

            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="AssignmentMarks"
                name="assignmentMarks"
                placeholder="Enter Assignment Marks"
                value={formData?.assignmentMarks}
                onChange={handleInputChange}
              />
              {errors.assignmentMarks && (
                <p
                  className="text-rose-600 text-md  absolute left-0 "
                  style={{ bottom: "-22px" }}
                >
                  {errors.assignmentMarks}
                </p>
              )}
            </div>

            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Test marks"
                name="testMarks"
                placeholder="Enter Test Marks"
                value={formData?.testMarks}
                onChange={handleInputChange}
              />
              {errors.testMarks && (
                <p
                  className="text-rose-600 text-md  absolute left-0 "
                  style={{ bottom: "-22px" }}
                >
                  {errors.testMarks}
                </p>
              )}
            </div>

            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Grade"
                name="grade"
                placeholder="Enter Grade"
                value={formData.grade}
                onChange={handleInputChange}
              />
              {errors.grade && (
                <p
                  className="text-rose-600 text-md  absolute left-0 "
                  style={{ bottom: "-22px" }}
                >
                  {errors.grade}
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
              {errors.level && (
                <p className="text-rose-600 text-sm absolute left-0 " style={{ bottom: '-20px' }}>{errors.level}</p>
              )}
            </div>

            <div className="relative">
              <InputFieldWithLabel
                type="text"
                labelText="Recommendation"
                name="recommendation"
                placeholder="Enter Recommendation"
                value={formData.recommendation}
                onChange={handleInputChange}
              />
              {errors.recommendation && (
                <p
                  className="text-rose-600 text-md  absolute left-0 "
                  style={{ bottom: "-22px" }}
                >
                  {errors.recommendation}
                </p>
              )}
            </div>
            <div className="relative">
              <InputFieldWithLabel
                type="textArea"
                labelText="Comment"
                name="comment"
                placeholder="Enter Comment"
                value={formData.comment}
                onChange={handleInputChange}
              />
              {errors.comment && (
                <p
                  className="text-rose-600 text-md  absolute left-0 "
                  style={{ bottom: "-22px" }}
                >
                  {errors.comment}
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

export default CreateReportModal;