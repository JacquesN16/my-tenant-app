import React, { useState } from 'react';

const TenantProfileForm = () => {
    const [tenantName, setTenantName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [monthlyRent, setMonthlyRent] = useState('');
    const [monthlyCharge, setMonthlyCharge] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call function to generate profile PDF and store tenant data
        generateProfilePDF(tenantName, startDate, monthlyRent, monthlyCharge);
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Form fields for tenant name, start date, rent, and charge */}
            <input
                type="text"
                placeholder="Tenant Name"
                value={tenantName}
                onChange={(e) => setTenantName(e.target.value)}/>
            <input
                type="date"
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}/>
            <input
                type="number"
                placeholder="Monthly Rent"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(e.target.value)}/>
            <input
                type="number"
                placeholder="Monthly Charge"
                value={monthlyCharge}
                onChange={(e) => setMonthlyCharge(e.target.value)}/>
            {/* Submit button */}
            <button type="submit">Create Profile</button>
        </form>
    );
};

export default TenantProfileForm;