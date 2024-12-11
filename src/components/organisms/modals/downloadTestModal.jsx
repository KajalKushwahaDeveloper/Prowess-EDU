import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Modal from "../../common/modal";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getTestQsnsForStudent } from "../../../features/dashboardSharedApi/studentDashboardSharedApiReducer.js";
import { jsPDF } from "jspdf";

const DownloadTestModal = ({ visible, setVisible, filteredTest = [] }) => {
    const [filteredAssignQsn, setFilteredAssignQsn] = useState([]);
    const dispatch = useDispatch();
    
console.log("filteredTest:", filteredTest);

    useEffect(() => {
        if (!Array.isArray(filteredTest) || filteredTest.length === 0) {
            console.warn("filteredTest is empty or not an array:", filteredTest);
            return;
        }

        const fetchAssignments = async () => {
            try {
                const promises = filteredTest.map((test) =>
                    dispatch(
                        getTestQsnsForStudent({
                            classId: test.Class,
                            testId: test.id,
                        })
                    ).unwrap()
                );

                const results = await Promise.all(promises);
                const questions = results.flatMap((response) => response?.data?.questions || []);
                setFilteredAssignQsn(questions);
            } catch (err) {
                console.error("Failed to fetch reports:", err);
                toast.error(err || "Failed to fetch reports");
            }
        };

        fetchAssignments();
    }, [dispatch, filteredTest]);

    const handleDownloadPdf = (assignmentDetails, questions) => {
        const doc = new jsPDF();
        const text = "Test";
        const pageWidth = doc.internal.pageSize.width; // Get the page width
        const textWidth = doc.getStringUnitWidth(text) * doc.internal.scaleFactor; // Get text width
        const x = (pageWidth - textWidth) / 2; // Calculate x to center the text
        
        doc.setFontSize(18).text(text, x, 10);
        
        doc.setFontSize(12);

        // Assignment details
        const details = [
            `Subject: ${assignmentDetails.subject}`,
            `Chapter: ${assignmentDetails.chapter}`,
            `Topic Name: ${assignmentDetails.topic}`,
            `Class: ${assignmentDetails.Class}`,
            `Level: ${assignmentDetails.level}`,
            `Student for: ${assignmentDetails.assignedTo}`,
            `Start time: ${assignmentDetails.startTime}`,
            `End time: ${assignmentDetails.endTime}`,
            `Start Date: ${assignmentDetails.startDate}`,
        ];

        details.forEach((text, index) => doc.text(text, 10, 20 + index * 10));

        // Divider
        doc.line(10, 105, 200, 105);

        // Questions
        doc.setFontSize(14).text("Questions:", 10, 115);
        doc.setFontSize(12);
        questions.forEach((question, index) => {
            doc.text(`${index + 1}. ${question.question}`, 10, 125 + index * 10);
        });

        doc.save(`${assignmentDetails.subject} Test.pdf`);
    };

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
                {Array.isArray(filteredTest) && filteredTest.length > 0 ? (
                    filteredTest.map((currentData, index) => (
                        <div
                        className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-y-0 md:gap-x-8"
                        key={index}
                    >
                        <div className="text-md font-semibold">
                            <h1 className="mb-2">
                                Subject: <span className="font-normal">{currentData.subject}</span>
                            </h1>
                            <h1 className="mb-2">
                                Chapter: <span className="font-normal">{currentData.chapter}</span>
                            </h1>
                            <h1 className="mb-2">
                                Topic Name: <span className="font-normal">{currentData.topic}</span>
                            </h1>
                        </div>
                        <div className="text-md font-semibold">
                            <h1 className="mb-2">
                                Class: <span className="font-normal">{currentData.Class}</span>
                            </h1>
                            <h1 className="mb-2">
                                Level: <span className="font-normal">{currentData.level}</span>
                            </h1>
                            <h1 className="mb-2">
                                Student for: <span className="font-normal">{currentData.assignedTo}</span>
                            </h1>
                        </div>
                        <div className="text-md font-semibold">
                            <h1 className="mb-2">
                                Start time: <span className="font-normal">{currentData.startTime}</span>
                            </h1>
                            <h1 className="mb-2">
                                End time: <span className="font-normal">{currentData.endTime}</span>
                            </h1>
                            <h1 className="mb-2">
                                start date: <span className="font-normal">{currentData.startDate}</span>
                            </h1>
                        </div>
                    </div>
                    ))
                ) : (
                    <p className="text-gray-500">No assignments available till </p>
                )}
                <hr className="my-4" />
                {filteredAssignQsn.length > 0 ? (
                   <div className="grid grid-cols-1 gap-4 mb-8">
                   {filteredAssignQsn.map((currentData, index) => (
                       <div key={index} className="flex flex-col space-y-1">
                           <h2 className="font-semibold">Question {index + 1}</h2>
                           <p className="border shadow-lg p-4 rounded-lg">{currentData.question}</p>
                       </div>
                   ))}
               </div>
                ) : (
                    <p className="text-gray-500"> No questions available.</p>
                )}


                <div className="flex items-center justify-end gap-4">
                    <Button
                        icon={Icons.downloadIcon}
                        onClick={() =>
                            handleDownloadPdf(filteredTest[0], filteredAssignQsn) // Example with first assignment
                        }
                    />
                    <Button label="Cancel" backgroundColor="#FF8A00" onClick={() => setVisible(false)} />
                </div>
            </div>
        </Modal>
    );
};

export default DownloadTestModal;
