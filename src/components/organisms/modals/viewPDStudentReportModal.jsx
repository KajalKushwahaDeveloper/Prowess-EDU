import Modal from "../../common/modal";
import ButtonText from "../../atoms/buttonText";

const ViewPDStudentReportModal = ({  visible, setVisible, selectedClass }) => {

    return (
        <Modal
            visible={visible}
            setVisible={setVisible}
            style={{ width: "50vw", maxWidth: "700px" }}
            onHide={() => setVisible(false)}
            className="rounded-lg"
        >
            <div className="bg-white m-4">
                <h1 className="font-semibold text-3xl my-2">Class Details</h1>
                <hr className="mb-8 border-gray-300" />
                {/* {selectedClass && ( */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-0 md:gap-x-8">
                        <div className="text-lg font-semibold">
                            <h1 className="mb-2">School: <span className="font-normal"></span></h1>
                            <h1 className="mb-2">Class: <span className="font-normal"></span></h1>
                            <h1 className="mb-2">Subjects: <span className="font-normal"></span></h1>
                            <h1 className="mb-2">Joined Classes: <span className="font-normal"></span></h1>
                            <h1 className="mb-2">Score: <span className="font-normal"></span></h1>
                            <h1 className="mb-2">Fee Status: <span className="font-normal"></span></h1>
                          
                        </div>
                        <div className="text-lg font-semibold">
                        <h1 className="mb-2">Place: <span className="font-normal"></span></h1>
                            <h1 className="mb-2">Section: <span className="font-normal"></span></h1>
                            <h1 className="mb-2">Assigned Teacher: <span className="font-normal"></span></h1>
                            <h1 className="mb-2">Test: <span className="font-normal"></span></h1>
                            <h1 className="mb-2">Course Type: <span className="font-normal"></span></h1>
                            <h1 className="mb-2">Payment: <span className="font-normal"></span></h1> 
                        </div>
                       
                    </div>
                {/* )} */}

                <div className="flex items-center justify-end gap-4 mt-8">
                    <ButtonText label="Cancel" backgroundColor="#FF8A00" onClick={() => setVisible(false)} />
                    
                </div>
            </div>

        </Modal>
    );
};

export default ViewPDStudentReportModal;
