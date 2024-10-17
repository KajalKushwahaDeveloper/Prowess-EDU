import { useState, useEffect } from 'react';
import ReusableTable from './ReusableTable';
import { ProductService } from './service/ProductService';

export default function BasicDemo() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        ProductService.getProductsMini().then(data => setProducts(data));
    }, []);

    const columns = [
        { field: 'code', header: 'Code' },
        { field: 'name', header: 'Name' },
        { field: 'category', header: 'Category' },
        { field: 'quantity', header: 'Quantity' }
    ];

    return (
        <ReusableTable 
            data={products} 
            columns={columns} 
            tableStyle={{ minWidth: '50rem' }} 
        />
    );
}
