import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Modal from "../../common/modal";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getTestQsnsForStudent } from "../../../features/dashboardSharedApi/studentDashboardSharedApiReducer.js";
import { jsPDF } from "jspdf";
import ButtonText from "../../atoms/buttonText.jsx";

const DownloadTestModal = ({ visible, setVisible, testData }) => {
    const [questions, setQuestions] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!testData) {
            console.warn("No test data provided to the modal.");
            return;
        }

        const fetchQuestions = async () => {
            try {
                const response = await dispatch(
                    getTestQsnsForStudent({
                        classId: testData.Class,
                        testId: testData.id,
                    })
                ).unwrap();

                setQuestions(response?.data?.questions || []);
            } catch (err) {
                console.error("Failed to fetch questions:", err);
                toast.error(err || "Failed to fetch questions");
            }
        };

        fetchQuestions();
    }, [dispatch, testData]);

    const handleDownloadPdf = () => {
        if (!testData) return;

        const doc = new jsPDF();
        const text = "Test";
        const pageWidth = doc.internal.pageSize.width;
        const textWidth = doc.getStringUnitWidth(text) * doc.internal.scaleFactor;
        const x = (pageWidth - textWidth) / 2;

        doc.setFontSize(18).text(text, x, 10);
        doc.setFontSize(12);

        // Assignment details
        const details = [
            `Subject: ${testData.subject}`,
            `Chapter: ${testData.chapter}`,
            `Topic Name: ${testData.topic}`,
            `Class: ${testData.Class}`,
            `Level: ${testData.level}`,
            `Student for: ${testData.assignedTo}`,
            `Start time: ${testData.startTime}`,
            `End time: ${testData.endTime}`,
            `Start Date: ${testData.startDate}`,
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

        doc.save(`${testData.subject} Test.pdf`);
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
                {testData ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-y-0 md:gap-x-8">
                        <div className="text-md font-semibold">
                            <h1 className="mb-2">
                                Subject: <span className="font-normal">{testData.subject}</span>
                            </h1>
                            <h1 className="mb-2">
                                Chapter: <span className="font-normal">{testData.chapter}</span>
                            </h1>
                            <h1 className="mb-2">
                                Topic Name: <span className="font-normal">{testData.topic}</span>
                            </h1>
                        </div>
                        <div className="text-md font-semibold">
                            <h1 className="mb-2">
                                Class: <span className="font-normal">{testData.Class}</span>
                            </h1>
                            <h1 className="mb-2">
                                Level: <span className="font-normal">{testData.level}</span>
                            </h1>
                            <h1 className="mb-2">
                                Student for: <span className="font-normal">{testData.assignedTo}</span>
                            </h1>
                        </div>
                        <div className="text-md font-semibold">
                            <h1 className="mb-2">
                                Start time: <span className="font-normal">{testData.startTime}</span>
                            </h1>
                            <h1 className="mb-2">
                                End time: <span className="font-normal">{testData.endTime}</span>
                            </h1>
                            <h1 className="mb-2">
                                Start date: <span className="font-normal">{testData.startDate}</span>
                            </h1>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500">No assignment selected.</p>
                )}
                <hr className="my-4" />
                {questions.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 mb-8">
                        {questions.map((question, index) => (
                            <div key={index} className="flex flex-col space-y-1">
                                <h2 className="font-semibold">Question {index + 1}</h2>
                                <p className="border shadow-lg p-4 rounded-lg">{question}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No questions available.</p>
                )}
                <div className="flex items-center justify-end gap-4">
                    <Button
                        icon={Icons.downloadIcon}
                        onClick={handleDownloadPdf}
                    />
                    <ButtonText label="Cancel" backgroundColor="#FF8A00" onClick={() => setVisible(false)} />
                </div>
            </div>
        </Modal>
    );
};

export default DownloadTestModal;
