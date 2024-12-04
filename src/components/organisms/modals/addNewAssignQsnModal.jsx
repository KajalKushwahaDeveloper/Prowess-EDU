import { useState } from "react";
import InputFieldWithLabel from "../../molecules/InputfieldWithLabel";
import Button from "../../atoms/button";
import Modal from "../../common/modal";
import { Icons } from "../../../assets/icons";
import { addNewAssignmentSchema } from "../../common/validationSchema";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import capitalize from 'lodash/capitalize';
import { addAssign, editAssign } from "../../../features/dashboardSharedApi/teacherDashboardAssignReducer";
import LevelDropdown from "../../molecules/levelDropdown";
import SubjectTypeDropdown from "../../molecules/subjectTypesDropdown";
import ClassTypeDropdown from "../../molecules/classTypeDropdown";

const AddNewAssignmentQsnModal = ({ visible, setVisible, mode = "add", initialData = {} }) => {
    const assignmentQuestions = [
        {
            questionNumber: "Question 1",
            question: "This is question number One"
        },
        {
            questionNumber: "Question 2",
            question: "This is question number One"
        },
    ]
    const [formData, setFormData] = useState({
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
    const [errors, setErrors] = useState({});
    const [isSuccess, setIsSuccess] = useState(false); // Track success state
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [filteredReports, setFilteredReports] = useState([]);

    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.teacherDashboardAssignSharedApi);

    console.log("validation error:", errors);
 
    console.log("downloadAssignmentModal:", data);

    useEffect(() => {
        // Fetch reports on mount
        dispatch(getAssignQnsnForTeacher(10))
            .unwrap()
            .then((response) => setFilteredReports(response.assignments)) // Initialize local state
            .catch((err) => {
                // toast.error(error || "Failed to fetch reports");
                toast.error("Failed to fetch reports");
            });
    }, [dispatch]);

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
 
     const handleDelete = (rowData) => {
    try {
      dispatch(deleteItem({ role: "parent", id: rowData.id }));
      toast.success("Parent delete successfully! ");
    } catch (error) {
      console.log("error:", error);
      toast.error(error || "Failed to delete parent. Please fix errors.");
    }
  };
  const handleEdit = (rowData) => {
    setVisible(true)
    setModalMode("edit")
    setCurrentStudent(rowData)
  }
    
    return (
        <Modal
            visible={visible}
            setVisible={setVisible}
            style={{ width: "50vw", maxWidth: "700px" }}
            onHide={() => setVisible(false)}
            className="rounded-lg"
        >
                    < div >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                            {assignmentQuestions.map((currentData, index) => (
                                <div key={index} className="flex flex-col space-y-1">
                                    <h2 className="font-semibold">{currentData.questionNumber}</h2>
                                    <div className="border shadow-lg p-4 rounded-lg flex items-center justify-between gap-1">
                                        <p className="">{currentData.question}</p>
                                        <div className="flex items-center justify-between gap-1">
                                            <Button icon={Icons.editIcon} onClick={handleEdit} backgroundColor="#FF8A00" />
                                            <Button icon={Icons.deleteIcon} onClick={handleDelete} backgroundColor="#FF4D00" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center justify-start  text-lg text-semibold gap-0">
                            <Button
                                icon={Icons.plusIcon} // Use custom CSS class
                                className="text-[#0069A4]"
                                backgroundColor="#ffffff"
                                iconColor="#0069A4"
                                onClick={handleAdd}
                            />

                            <p className="text-[#0069A4]  text-semibold">Add New Questions</p>
                        </div>

                        <div className="flex justify-end gap-4 mt-6">
                            <Button
                                label="Cancel"
                                backgroundColor="#FF8A00"
                                onClick={() => setVisible(false)}
                            />
                            {/* <Button
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
                            // onClick={handleAdd}
                            /> */}
                        </div>
                    </div>
               

        </Modal >
    );
}

export default AddNewAssignmentQsnModal;
