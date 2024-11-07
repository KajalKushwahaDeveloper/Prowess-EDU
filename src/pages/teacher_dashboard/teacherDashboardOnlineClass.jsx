import { useState } from "react";
import Dropdown from "../../components/molecules/dropdown";
import Calender from "../../components/atoms/calender";
import Card from "../../components/molecules/Card";
import CompletedClassesTable from "../../components/organisms/tables/completedClasses";
import { Icons } from "../../assets/icons";
import JoinClassModal from "../../components/organisms/modals/joinClassModal";
import CreateOnlineClassModal from "../../components/organisms/modals/createOnlineClassModal";
import PreviousClassesTable from "../../components/organisms/tables/previousClassesTable";


const TeacherDashboardOnlineClass = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState(null);

    const cardDetails = [
        { subject: "Math 11th", chapter: "Chapter 1 (Topic name)", date_time: "4/10/2024 10.15am", cardStyle: { backgroundColor: "#EEDFF7" }, totalNumberClass: "text-base font-normal", iconBorderClass: " bg-[#FF8A00] right-1 bottom-1 px-3 py-1 rounded-lg"},
    ];
    // FF8A00
    const handleCardClick = (chapter) => {
        setSelectedChapter(chapter);
        setIsModalVisible(true);
    };

    return (
        <div className="admin-dashboard m-6 dashboard z-1">
            <div className="my-4">
                <div className="flex justify-between md:items-center items-start md:flex-row flex-col">
                    <h2 className="font-bold text-xl md:text-2xl">Online Classes</h2>
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
                                iconClass={Icons.editIcon}
                                date_time={currentData.date_time}
                                totalNumberClass={currentData.totalNumberClass}
                                iconBorderClass={currentData.iconBorderClass}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <hr className="my-6" />
            <div>
                <h2 className="font-bold text-xl text-xl  mb-8">Previous Classes</h2>
                <PreviousClassesTable />
            </div>

            {/* Assignment Modal */}

            <CreateOnlineClassModal
                visible={isModalVisible}
                setVisible={setIsModalVisible}
                newAssignment={selectedChapter}
            />
        </div>
    );
}

export default TeacherDashboardOnlineClass;
