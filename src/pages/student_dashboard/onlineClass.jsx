import { useState } from "react";
import Dropdown from "../../components/molecules/dropdown";
import Calender from "../../components/atoms/calender";
import Card from "../../components/molecules/Card";
import CompletedClassesTable from "../../components/organisms/tables/completedClasses";
import { Icons } from "../../assets/icons";
import JoinClassModal from "../../components/organisms/modals/joinClassModal";


const OnlineClass = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState(null);

    const cardDetails = [
        { subject: "Math", chapter: "Chapter 1", cardStyle: { backgroundColor: "#DFEEF7" } },
    ];

    const handleCardClick = (chapter) => {
        setSelectedChapter(chapter);
        setIsModalVisible(true);
    };

    return (
        <div className="admin-dashboard m-6 dashboard z-1">
            <div className="my-4">
                <div className="flex justify-between md:items-center items-start md:flex-row flex-col">
                    <h2 className="font-bold text-xl md:text-2xl">Online Class</h2>
                    <div className="flex justify-evenly items-center space-x-4">
                        <Dropdown label="Teacher" />
                        <Calender />
                    </div>
                </div>
            </div>
            <hr className="mb-6" />
            <div>
                <h2 className="font-bold text-xl  mb-4">Upcoming Classes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-6 md:gap-6 sm:gap-6">
                    {cardDetails.map((currentData, index) => (
                        <div key={index} onClick={() => handleCardClick(currentData.chapter)}>
                            <Card
                                cardHeading={currentData.subject}
                                totalNumber={currentData.chapter}
                                cardStyle={currentData.cardStyle}
                                iconClass={Icons.viewIcon}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <hr className="my-6" />
            <div>
            <h2 className="font-bold text-xl text-xl  mb-8">Completed classes</h2>
                <CompletedClassesTable />
            </div>

            {/* Assignment Modal */}

            <JoinClassModal
                visible={isModalVisible}
                setVisible={setIsModalVisible}
                newAssignment={selectedChapter}
            />
        </div>
    );
}

export default OnlineClass;