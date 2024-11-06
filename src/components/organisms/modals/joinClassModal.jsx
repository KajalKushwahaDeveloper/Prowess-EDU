import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Modal from "../../common/modal";

const JoinClassModal = ({ visible, setVisible }) => {

    
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-0 md:gap-x-8">
                    <div className="text-md font-semibold">
                        <h1 className="mb-2">Class</h1>
                        <h1 className="mb-2">Chapter</h1>
                        <h1 className="mb-2">Date & time</h1>
                    </div>
                    <div className="text-md font-semibold">
                        <h1 className="mb-2">Subject</h1>
                        <h1 className="mb-2">Topic</h1>
                        <h1 className="mb-2">Add link</h1>
                    </div>
                </div> 
                
                <div className="flex items-center justify-end gap-4 mt-8">
                    <Button label="Cancel" backgroundColor="#FF8A00" onClick={() => setVisible(false)}/>
                    <Button label="Join" backgroundColor="#00A943"/>
                </div>
            </div>
        </Modal>
    )
}
export default JoinClassModal;