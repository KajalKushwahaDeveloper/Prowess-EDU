import { Dialog } from "primereact/dialog";

const Modal = ({ visible, setVisible, children }) => {
    return (
        <>
            <Dialog
                visible={visible}
                style={{ width: "90vw", maxWidth: "854px", height: "auto" }}
                onHide={() => setVisible(false)}
                className="rounded-lg shadow-lg"
            >
                <div className="bg-white sm:py-2 sm:px-6 md:pb-4">
                    {children} {/* Render children here */}
                </div>
            </Dialog>
        </>
    );
};

export default Modal;
