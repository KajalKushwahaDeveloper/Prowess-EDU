import { useState } from "react";
import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Modal from "../../common/modal";
import { toast } from "react-toastify"; // To show success or error messages
import { useDispatch } from "react-redux";
import { updateOnlineClassStatus } from "../../../features/dashboardSharedApi/studentDashboardSharedApiReducer";
import ButtonText from "../../atoms/buttonText";

const JoinClassModal = ({  visible, setVisible, selectedClass, setOnlineClass }) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handleJoin = async (classData) => {
        const studentData = JSON.parse(localStorage.getItem("data"));
        const payload = {
            studentName: studentData?.name,
            studentClass: classData.Class,
            studentSubject: classData.subject,
            studentStatus: "Attended",
        };

        try {
            setIsLoading(true);

            // Open the class link in a new tab
            if (classData.link) {
                window.open(classData.link, "_blank");
            } else {
                toast.error("Join link not available.");
                return;
            }

            // Dispatch API call to update class status
            const response = await dispatch(
                updateOnlineClassStatus(classData.id, payload)
            ).unwrap();

            // Update local state for `onlineClass`
            setOnlineClass((prevClasses) =>
                prevClasses.map((item) =>
                    item.id === classData.id ? { ...item, status: "Attended" } : item
                )
            );

            // toast.success("Class status updated successfully!");
            setVisible(false); // Close the modal
        } catch (error) {
            console.log("error:", error);
            
            // toast.error(error.message || "Failed to update class status.");
        } finally {
            setIsLoading(false);
        }
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
                <h1 className="font-semibold text-2xl my-2">Class Details</h1>
                <hr className="mb-8 border-gray-300" />
                {selectedClass && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-0 md:gap-x-8">
                        <div className="text-md font-semibold">
                            <h1 className="mb-2">Class: <span className="font-normal">{selectedClass.Class}</span></h1>
                            <h1 className="mb-2">Chapter: <span className="font-normal">{selectedClass.chapter}</span></h1>
                            <h1 className="mb-2">Date & Time: <span className="font-normal">{selectedClass.date} {selectedClass.time}</span></h1>
                        </div>
                        <div className="text-md font-semibold">
                            <h1 className="mb-2">Subject: <span className="font-normal">{selectedClass.subject}</span></h1>
                            <h1 className="mb-2">Topic: <span className="font-normal">{selectedClass.topic}</span></h1>
                            <h1 className="mb-2">Link: <span className="font-normal">{selectedClass.link || "N/A"}</span></h1>
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-end gap-4 mt-8">
                    <ButtonText label="Cancel" backgroundColor="#FF8A00" onClick={() => setVisible(false)} />
                    <ButtonText
                        label={isLoading ? "Joining..." : "Join"}
                        backgroundColor="#00A943"
                        onClick={() => handleJoin(selectedClass)} // Pass the selected class
                        disabled={isLoading} // Disable the button while loading
                    />
                </div>
            </div>

        </Modal>
    );
};

export default JoinClassModal;
