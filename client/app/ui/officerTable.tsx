"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllOfficers } from "@/actions";

interface Officer {
    _id: string;
    name: string;
    email: string;
    assignedTasks: string[];
}

export default function OfficerTable() {
    const router = useRouter();
    const [officers, setOfficers] = useState<Officer[]>([]);

    useEffect(() => {
        const fetchOfficers = async () => {
            const data = await getAllOfficers();
            setOfficers(data.officers || []);
        };
        fetchOfficers();
    }, []);

    const handleUpdate = (officerId: string) => {
        router.push(`/admin/update/officer/${officerId}`);
    };

    return (
        <div className="overflow-x-auto">
            <table className="border-collapse border border-gray-300 w-full">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 md:p-2 p-1">Sr. No</th>
                        <th className="border border-gray-300 md:p-2 p-1">Name</th>
                        <th className="border border-gray-300 md:p-2 p-1">Email</th>
                        <th className="border border-gray-300 md:p-2 p-1">No. of Tasks Assigned</th>
                        <th className="border border-gray-300 md:p-2 p-1">Update</th>
                    </tr>
                </thead>
                <tbody>
                    {officers.map((officer, index) => (
                        <tr key={officer._id} className="bg-gray-50">
                            <td className="border border-gray-300 md:p-2 p-1 text-center">{index + 1}</td>
                            <td className="border border-gray-300 md:p-2 p-1">{officer.name}</td>
                            <td className="border border-gray-300 md:p-2 p-1">{officer.email}</td>
                            <td className="border border-gray-300 md:p-2 p-1 text-center">{officer.assignedTasks.length}</td>
                            <td className="p-1 border border-gray-300 md:p-2 text-center">
                                <button 
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" 
                                    onClick={() => handleUpdate(officer._id)}
                                >
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
