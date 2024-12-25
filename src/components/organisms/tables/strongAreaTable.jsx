import { Icons } from "../../../assets/icons";
import Button from "../../atoms/button";
import Table from "../../common/Table";

const StrongAreaTable = ({strongReports}) => {

    const columns = [
        { field: "sID", header: "Id" },
        { field: "subject", header: "Subject" },
        { field: "recommendation", header: "Recommendation" },
        { field: "comment", header: "Comments" },
        {
            field: "Action",
            header: "Action",
            body: () => {
                return (
                    <div className="flex space-x-2">
                        <Button
                            // label="view"
                            // onClick={() => handleEdit(rowData)}
                            backgroundColor="#00A943"
                            icon={Icons.viewIcon}
                        />

                    </div>
                );
            },
        },
    ];

    return (
        <Table
            data={strongReports}
            columns={columns}
            tableStyle={{ minWidth: "40rem", fontSize: "1.1rem"}}
        />
    );
};

export default StrongAreaTable;
