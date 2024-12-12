'use client'
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import OfficerTable from '@/app/ui/officerTable';
import AddOfficer from '@/app/ui/addOfficer';

export default function Page() {
    const [isViewOfficers, setIsViewOfficers] = useState(true);
    const [isCreateOfficer, setIsCreateOfficer] = useState(false);

    const ViewOfficers = () => {
        setIsViewOfficers(true);
        setIsCreateOfficer(false);
    }

    const CreateOfficer = () => {
        setIsViewOfficers(false); // Set to false to hide the "View Tasks" component
        setIsCreateOfficer(true); // Set to true to show the "Create Task" component
    }


    return (
        <div className="p-4">
        <h2 className="text-2xl font-bold mb-6">Here are your Officers</h2>
        <div className="flex flex-col gap-4 md:flex-row flex-grow  justify-between md:m-8 items-center md:gap-8 md:p-4 ">
            <div onClick={ViewOfficers} 
            className={clsx(
                "p-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer",
                isViewOfficers ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800 border border-gray-300"
            )}
            >
                View Officers
            </div>
            <div onClick={CreateOfficer} 
            className={clsx(
                "p-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer",
                isCreateOfficer ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800 border border-gray-300"
            )}
            >
                Add Officer
            </div>
        </div>
        <div className="flex mt-3">
            { isViewOfficers && <OfficerTable />}
            {isCreateOfficer && <AddOfficer/>}
        </div>
        </div>
    );
}