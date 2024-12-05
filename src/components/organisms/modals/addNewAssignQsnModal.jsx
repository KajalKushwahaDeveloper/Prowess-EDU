import { useState, useEffect } from "react";
import Button from "../../atoms/button";
import Modal from "../../common/modal";
import { Icons } from "../../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getAssignQnsnForTeacher,
  addAssignQsn,
  editAssignQsn,
  deleteAssignQsn,
} from "../../../features/dashboardSharedApi/teacherDashboardAssignQsnReducer";

const AddNewAssignmentQsnModal = ({ visible, onClose, initialData = {} }) => {
  const [assignmentQuestions, setAssignmentQuestions] = useState([]);
  const [formData, setFormData] = useState({
    id: null, // Track the ID for editing
    question: "",
    ...initialData,
  });

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.teacherDashboardAssignSharedApi
  );

  useEffect(() => {
    dispatch(getAssignQnsnForTeacher({ assignmentId: formData.id }))
      .unwrap()
      .then((response) => {
        setAssignmentQuestions(response);
      })
      .catch(() => {
        toast.error("Failed to fetch questions");
      });
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAdd = () => {
    if (!formData.question.trim()) {
      toast.error("Question cannot be empty.");
      return;
    }

    if (formData.id) {
      // Edit existing question
      dispatch(editAssignQsn({ id: formData.id, payload: { question: formData.question, assignmentId: formData.assignmentId } }))

        .unwrap()
        .then(() => {
          setAssignmentQuestions((prev) =>
            prev.map((q) =>
              q.id === formData.id ? { ...q, question: formData.question } : q
            )
          );
          toast.success("Question updated successfully!");
          setFormData({ id: null, question: "" });
        })
        .catch(() => {
          toast.error("Failed to update question.");
        });
    } else {
      // Add new question
      dispatch(addAssignQsn({ id: formData.id, payload: { question: formData.question } }))
        .unwrap()
        .then((newQuestion) => {
          setAssignmentQuestions((prev) => [...prev, newQuestion]);
          toast.success("Question added successfully!");
          setFormData({ id: null, question: "" });
        })
        .catch(() => {
          toast.error("Failed to add question.");
        });
    }
  };

  const handleEdit = (question) => {
    setFormData({
      id: question.id,
      question: question.question,
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteAssignQsn({ id }))
      .unwrap()
      .then(() => {
        setAssignmentQuestions((prev) => prev.filter((q) => q.id !== id));
        toast.success("Question deleted successfully!");
      })
      .catch(() => {
        toast.error("Failed to delete question.");
      });
  };

    return (
        <Modal
            visible={visible}
            // setVisible={setVisible}
            style={{ width: "50vw", maxWidth: "700px", margin: "1rem" }}
            onHide={onClose}
            className="rounded-lg"
        >
            {/* <Modal visible={true} onHide={onClose}> */}
            <div className="p-4">
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
                    <input
                        type="text"
                        name="question"
                        placeholder="Add New Question"
                        value={formData.question}
                        onChange={handleInputChange}
                        className="border rounded-md px-4 py-2 w-full"
                    />
                    {/* <InputFie className="text-[#0069A4]  text-semibold">Add New Questions</p> */}
                </div>

                <div className="flex justify-end gap-4 mt-6">
                    <Button
                        label="Cancel"
                        backgroundColor="#FF8A00"
                        onClick={onClose}
                    />
                </div>
            </div>


        </Modal >
    );
}

export default AddNewAssignmentQsnModal;
