import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function ReusableTable({ data, columns, tableStyle }) {
    return (
        <div className="card">
            <DataTable value={data} tableStyle={tableStyle}>
                {columns.map((col, index) => (
                    <Column key={index} field={col.field} header={col.header}></Column>
                ))}
            </DataTable>
        </div>
    );
}