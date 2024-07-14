import React, { useEffect, useState } from 'react';

const RentReceipt = ({ tenantData }) => {
    const [receiptData, setReceiptData] = useState(null); // Data for current receipt

    useEffect(() => {
        // Calculate current month and year
        const today = new Date();
        const month = today.toLocaleString('default', { month: 'long' });
        const year = today.getFullYear();

        setReceiptData({
            ...tenantData,
            month,
            year,
        });
    }, [tenantData]);

    const generateReceiptPDF = () => {
        // Call function to create rent receipt PDF using receiptData
    };

    return (
        <div>
            {/* Display tenant profile information */}
            <button onClick={generateReceiptPDF}>Download Receipt</button>
        </div>
    );
};

export default RentReceipt;