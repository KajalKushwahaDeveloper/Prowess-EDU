import Modal from "../../common/modal";
import Card from "../../molecules/Card";
import { Icons } from "../../../assets/icons";
function ChapterModal({ visible, setVisible }) {
    const cardDetails = [
        {
            Topic: "Topic 1",
            cardStyle: { backgroundColor: "#EEDFF7" },
        },
        {
            Topic: "Topic 2",
            cardStyle: { backgroundColor: "#EEDFF7" },
        },
        {
            Topic: "Topic 3",
            cardStyle: { backgroundColor: "#EEDFF7" },
        },
        {
            Topic: "Topic 4",
            cardStyle: { backgroundColor: "#EEDFF7" },
        },
        {
            Topic: "Topic 5",
            cardStyle: { backgroundColor: "#EEDFF7" },
        },
        {
            Topic: "Topic 6",
            cardStyle: { backgroundColor: "#EEDFF7" },
        },
        {
            Topic: "Topic 7",
            cardStyle: { backgroundColor: "#EEDFF7" },
        },
        {
            Topic: "Topic 8",
            cardStyle: { backgroundColor: "#EEDFF7" },
        },
        {
            Topic: "Topic 9",
            cardStyle: { backgroundColor: "#EEDFF7" },
        },
        {
            Topic: "Topic 10",
            cardStyle: { backgroundColor: "#EEDFF7" },
        },
    ];

    return (
        <Modal
            visible={visible}
            setVisible={setVisible}
            style={{ width: "50vw", maxWidth: "700px" }}
            onHide={() => setVisible(false)}
            className="rounded-lg"
        >
            <div className="bg-white m-4">
                <h1 className="font-medium text-2xl my-2">Chapter 1</h1>
                <hr className="mb-8 border-gray-300" />
                <div className="flex flex-wrap items-center justify-center mb-8">
                    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xsm:grid-cols-2 grid-cols-2 gap-4">
                        {cardDetails.map((currentData, index) => (
                            <Card
                                key={index}
                                cardHeading={currentData.Topic}
                                cardStyle={currentData.cardStyle}
                                iconClass={Icons.videoIcon}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ChapterModal;
