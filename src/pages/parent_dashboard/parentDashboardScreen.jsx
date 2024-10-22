import { useState } from "react";
import Button from "../../components/atoms/button";
import { Icons } from "../../assets/icons";
import StudentsTable from "../../components/organisms/studentTable";
import Modal from "../../components/common/modal";
import AddNewTeacherModal from "../../components/organisms/addNewStudentModal";
import Calender_Download_Component from "../../components/common/calender_download";

function ParentDashboard() {

    return (
        <div className="admin-dashboard m-6 dashboard z-1">
            <div className="my-4">
                <Calender_Download_Component />
            </div>
                <hr />
            <div>
                <div className="md:overflow-none overflow-x-auto mb-16">
                    
                </div>
            </div>
        </div>
    );
}

export default ParentDashboard;
