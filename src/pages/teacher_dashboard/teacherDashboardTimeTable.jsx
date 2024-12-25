import { useState, useEffect } from "react";
import Button from "../../components/atoms/button";
import { Icons } from "../../assets/icons";
import Pagination from "../../components/common/pagination";
import PreviousTimeTable from "../../components/organisms/tables/previousTimeTable";
import Calender from "../../components/atoms/calender";
import CreateTimeTableModal from "../../components/organisms/modals/createTimeTableModal";
import TimeTable from "../../components/organisms/tables/timetable";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getTimeTableForTeacher } from "../../features/dashboardSharedApi/teacherTimeTableReducer";

const TeacherDashboardTimeTable = () => {
    const [visible, setVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
    const [currentStudent, setCurrentStudent] = useState(null);
    const [currentTimeTable, setCurrentTimeTable] = useState([]);
    const [previousTimeTable, setPreviousTimeTable] = useState([]);
    const [filteredPreviousTimeTable, setFilteredPreviousTimeTable] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    const dispatch = useDispatch();

    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split("-").map(Number);
        return new Date(year, month - 1, day);
    };

    useEffect(() => {
        dispatch(getTimeTableForTeacher())
            .unwrap()
            .then((response) => {
                const timeTable = response?.data?.timeTable || [];
                const currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0);

                const previous = timeTable.filter((entry) => {
                    const entryDate = parseDate(entry.date);
                    return entryDate < currentDate;
                });

                const current = timeTable.filter((entry) => {
                    const entryDate = parseDate(entry.date);
                    return entryDate >= currentDate;
                });

                setPreviousTimeTable(previous);
                setFilteredPreviousTimeTable(previous); // Initialize with all previous data
                setCurrentTimeTable(current);
            })
            .catch(() => {
                toast.error("Failed to fetch classes");
            });
    }, [dispatch]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        if (date) {
            const filteredData = previousTimeTable.filter((entry) => {
                const entryDate = parseDate(entry.date);
                return (
                    entryDate.getFullYear() === date.getFullYear() &&
                    entryDate.getMonth() === date.getMonth() &&
                    entryDate.getDate() === date.getDate()
                );
            });
            setFilteredPreviousTimeTable(filteredData);
        } else {
            setFilteredPreviousTimeTable(previousTimeTable); // Reset to all data
        }
    };

    const handleAddStudent = () => {
        setVisible(true);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="admin-dashboard m-6 dashboard">
            <div className="my-4 flex items-start md:items-center justify-between flex-col sm:flex-row">
                <h1 className="text-black font-bold text-2xl mb-4">Time Table</h1>
                <div className="flex items-center justify-center">
                    <Button
                        icon={Icons.plusIcon}
                        onClick={handleAddStudent}
                        label="Create Time Table"
                    />
                </div>
            </div>
            <hr />

            <div className="mt-4">
                <div className="md:overflow-none overflow-x-auto mb-16">
                    <TimeTable
                        timeTable={currentTimeTable}
                        setCurrentTimeTable={setCurrentTimeTable}
                        modalMode={modalMode}
                        setModalMode={setModalMode}
                        currentStudent={currentStudent}
                        setCurrentStudent={setCurrentStudent}
                    />
                </div>
            </div>

            {/* Previous Time Table */}
            <div className="my-4 flex items-start md:items-center justify-between flex-col sm:flex-row">
                <h1 className="text-black font-bold text-2xl mb-4">Previous Time Table</h1>
                <div className="flex items-center justify-center">
                    <Calender onDateChange={handleDateChange} />
                </div>
            </div>
            <hr />
            <div className="mt-8">
                <div className="md:overflow-none overflow-x-auto mb-16">
                    <PreviousTimeTable timeTable={filteredPreviousTimeTable} />
                </div>
            </div>

            {/* Pagination Component */}
            <div className="flex items-center justify-center">
                {/* <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(previousTimeTable.length / pageSize)}
                    onPageChange={handlePageChange}
                /> */}
            </div>

            <CreateTimeTableModal
                visible={visible}
                setVisible={setVisible}
                modalMode={modalMode}
                setModalMode={setModalMode}
                currentStudent={currentStudent}
                setCurrentStudent={setCurrentStudent}
            />
        </div>
    );
};

export default TeacherDashboardTimeTable;
