import Modal from "../../common/modal";
import Card from "../../molecules/Card";
import { Icons } from "../../../assets/icons";

const ChapterModal = ({ visible, setVisible, topics = [], chapterNo, selectedUrl }) => {
  console.log("selectedUrl:", selectedUrl); // Debug: Verify the topics array

  const handleCardClick = () => {
    console.log("click");
    
    if (selectedUrl) {
      window.open(selectedUrl, "_blank");
    }
  };
  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      style={{ width: "50vw", maxWidth: "700px" }}
      onHide={() => setVisible(false)}
      className="rounded-lg overflow-hidden" // Prevent modal body scroll
    >
      {/* Modal Content */}
      <div className="bg-white flex flex-col h-[80vh]">
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white z-10">
          <h1 className="font-medium text-2xl my-2 px-4">
            Chapter: {chapterNo}
          </h1>
          <hr className="mb-4 border-gray-300" />
        </div>

        {/* Scrollable Cards Section */}
        <div className="flex-grow overflow-y-auto px-4 "  onClick={handleCardClick}>
          {topics.length > 0 ? (
            <div className="grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-4 xsm:grid-cols-3 grid-cols-3 gap-4">
              <Card
                cardHeading={topics || "Untitled Topic"}
                cardStyle={{ backgroundColor: "#EEDFF7" }}
                iconClass={Icons.videoIcon}
              />
            </div>
          ) : (
            <p className="text-gray-500">
              No topics available for this chapter.
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ChapterModal;
