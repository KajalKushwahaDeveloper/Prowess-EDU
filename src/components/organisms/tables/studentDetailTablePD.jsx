import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { CircleUserRound } from "lucide-react";

const StudentDetailTablePD = ({ studentData }) => {
  const [selectedChild, setSelectedChild] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleRowClick = (rowData) => {
    setSelectedChild(rowData); // Set the clicked student as the selectedChild
    setShowDialog(true); // Open the modal
  };

  const renderStudentName = (rowData) => {
    return (
      <div className="flex items-center space-x-3">
        <CircleUserRound className="w-6 h-6 text-[#004871]" />
        <span className="font-medium text-gray-800">{rowData.name}</span>
      </div>
    );
  };  

  const renderChildDetails = () => {
    if (!selectedChild) return null;

    return (
      <div className="p-4">
        <h3 className="text-2xl font-bold mb-4">
          {selectedChild.name}'s Details
        </h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-lg">
            <p>
              <strong>Class:</strong> {selectedChild.Class}
            </p>
            <p>
              <strong>Section:</strong> {selectedChild.section}
            </p>
            <p>
              <strong>Gender:</strong> {selectedChild.gender}
            </p>
          </div>
          <div className="text-lg">
            <p>
              <strong>Date of Birth:</strong> {selectedChild.dob}
            </p>
            <p>
              <strong>Email:</strong> {selectedChild.email}
            </p>
          </div>
        </div>

        <h4 className="text-2xl font-semibold mb-2">Fee Details:</h4>
        <DataTable
          value={selectedChild.feeDetails}
          responsiveLayout="scroll"
          className="mb-4 text-lg"
        >
          <Column field="month" header="Month" />
          <Column field="year" header="Year" />
          <Column field="feeAmount" header="Fee Amount" />
          <Column field="feePaymentStatus" header="Payment Status" />
          <Column field="paymentDate" header="Payment Date" />
        </DataTable>

        <h4 className="text-2xl font-semibold mb-2">Teacher Details:</h4>
        <DataTable
          value={selectedChild.teacherDetails}
          responsiveLayout="scroll"
          className="mb-4 text-lg"
        >
          <Column field="name" header="Name" />
          <Column field="phone" header="Phone" />
          <Column
            field="subject"
            header="Subjects"
            body={(rowData) => rowData.subject.join(", ")}
          />
        </DataTable>
      </div>
    );
  };


  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow">
      <DataTable
        value={studentData || []}
        onRowClick={(e) => handleRowClick(e.data)}
        dataKey="id"
        className="p-datatable-sm cursor-pointer"
      >
        <Column
          field="name"
          header="Student Name"
          body={renderStudentName}
          style={{ fontSize: "1.4rem" , padding:"1rem"}}
        />
      </DataTable>

      <Dialog
        visible={showDialog}
        style={{ width: "40vw" }}
        onHide={() => setShowDialog(false)}
      >
        {renderChildDetails()}
      </Dialog>
    </div>
  );
};

export default StudentDetailTablePD;
