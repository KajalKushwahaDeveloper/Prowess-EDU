import { Dialog } from "primereact/dialog";

const Modal = ({ visible, setVisible, children }) => {
    return (
        <>
            <Dialog
                visible={visible}
                style={{ width: "90vw", maxWidth: "854px", height: "auto" }}
                onHide={() => setVisible(false)}
                className="border-[#004871] border rounded-lg"
            >
                <div className="bg-white sm:p-6 rounded-lg shadow-lg">
                    {children} {/* Render children here */}
                    <hr />
                </div>
            </Dialog>
        </>
    );
};

export default Modal;
