import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const Table = ({ data = [], columns = [], tableStyle }) => {
    
    return (
        <div className="table-wrapper">
            <DataTable value={data} responsiveLayout="scroll" style={tableStyle}>
                {columns.map((col, index) => (
                    <Column key={index} field={col.field} header={col.header} headerClassName="p-2 rounded-md"/>
                ))}
            </DataTable>
        </div>
    );
};

export default Table;
