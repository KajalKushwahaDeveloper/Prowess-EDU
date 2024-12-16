import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";
import { useState } from "react";

const PreviousClassesTable = ({onlineClass}) => {
    // const [products, setProducts] = useState("");
    
    const handleEdit = (question) => {
        setFormData({
            id: question.id,
            question: question.question,
        });
    };

    const handleDelete = (id) => {
        dispatch(deleteOnlineClass({ id }))
            .unwrap()
            .then(() => {
                setAssignmentQuestions((prev) => prev.filter((q) => q.id !== id));
                toast.success("Question deleted successfully!");
            })
            .catch(() => {
                toast.error("Failed to delete question.");
            });
    };
    
    const columns = [
        { field: "id", header: "Id" },
        { field: "subject", header: "Subject" },
        { field: "chapter", header: "Chapter" },
        { field: "topic", header: "Topic" },
        { field: "class", header: "Class" },
        { field: "date", header: "Date" },
        { field: "studentJoined", header: "Student joined" },
        {
            field: "Action",
            header: "Action",
            body: () => {
                return (
                    <div className="flex space-x-2">
                        <Button
                        backgroundColor="#FF8A00"
                        icon={Icons.editIcon}
                        onClick={() => handleEdit(rowData)}
                    />
                    <Button
                        backgroundColor="#004871"
                        icon={Icons.reloadIcon}
                        // onClick={handleReload}
                    />
                    <Button
                        backgroundColor="#FF4D00"
                        icon={Icons.deleteIcon}
                        onClick={() => handleDelete(rowData)}
                    />

                    </div>
                );
            },
        },
    ];

    return (
        <Table
            data={onlineClass}
            columns={columns}
            tableStyle={{ minWidth: "40rem", fontSize: "1.1rem"}}
        />
    );
};

export default PreviousClassesTable;
