import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Modal from "../../common/modal";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAssignQsnsForStudent } from "../../../features/dashboardSharedApi/studentDashboardSharedApiReducer.js";


const downloadAssignmentModal = ({ visible, setVisible,setModalMode, modalMode, currentStudent, setCurrentStudent }) => {
    const [filteredReports, setFilteredReports] = useState([]);
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.studentDashboardNewAssignSharedApi);
    console.log("downloadAssignmentModal:", data);

    useEffect(() => {
        // Fetch reports on mount
        dispatch(getAssignQsnsForStudent(10))
            .unwrap()
            .then((response) => setFilteredReports(response.assignments)) // Initialize local state
            .catch((err) => {
                // toast.error(error || "Failed to fetch reports");
                toast.error("Failed to fetch reports");
            });
    }, [dispatch]);
    const assignmentQuestions = [
        {
            questionNumber: "Question 1",
            question: "This is question number One"
        },
        {
            questionNumber: "Question 2",
            question: "This is question number One"
        },
        {
            questionNumber: "Question 3",
            question: "This is question number One"
        },
        {
            questionNumber: "Question 4",
            question: "This is question number One"
        },
        {
            questionNumber: "Question 5",
            question: "This is question number One"
        }
    ]
    return (
        <Modal
            visible={visible}
            setVisible={setVisible}
            style={{ width: "50vw", maxWidth: "700px" }}
            onHide={() => setVisible(false)}
            className="rounded-lg"
        >
            <div className="bg-white m-4">
                <h1 className="font-semibold text-2xl my-2">Download Assignment</h1>
                <hr className="mb-8 border-gray-300" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-y-0 md:gap-x-8">
                    <div className="text-md font-semibold">
                        <h1 className="mb-2">Subject</h1>
                        <h1 className="mb-2">Chapter</h1>
                        <h1 className="mb-2">Topic Name</h1>
                    </div>
                    <div className="text-md font-semibold">
                        <h1 className="mb-2">Class</h1>
                        <h1 className="mb-2">Type</h1>
                        <h1 className="mb-2">Level</h1>
                    </div>
                    <div className="text-md font-semibold">
                        <h1 className="mb-2">Student for</h1>
                        <h1 className="mb-2">Start date</h1>
                        <h1 className="mb-2">Submit date</h1>
                    </div>
                </div>
                <hr className="my-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {assignmentQuestions.map((currentData, index) => (
                        <div key={index} className="flex flex-col space-y-1">
                            <h2 className="font-semibold">{currentData.questionNumber}</h2>
                            <p className="border shadow-lg p-4 rounded-lg">{currentData.question}</p>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-end gap-4">
                    <Button icon={Icons.downloadIcon}/>
                    <Button label="Cancel" backgroundColor="#FF8A00" onClick={() => setVisible(false)}/>
                </div>
            </div>
        </Modal>
    )
}
export default downloadAssignmentModal;