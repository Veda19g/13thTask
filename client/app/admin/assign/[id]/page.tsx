'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getAllOfficers, assignTask } from '../../../../actions'; // Adjust the import path

// Define types for Officer and API responses
interface Officer {
    _id: string;
    name: string;
}

interface GetAllOfficersResponse {
    officers: Officer[];
}

interface AssignTaskResponse {
    success: boolean;
    message?: string;
}

export default function AssignTaskPage() {
    const { id: taskId } = useParams(); // Get task ID from URL
    const router = useRouter();
    const [officers, setOfficers] = useState<Officer[]>([]);
    const [selectedOfficers, setSelectedOfficers] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    // Fetch officers when the component loads
    useEffect(() => {
        const fetchOfficers = async () => {
            try {
                const data: GetAllOfficersResponse = await getAllOfficers();
                if (data?.officers) {
                    setOfficers(data.officers);
                } else {
                    setError('Failed to fetch officers.');
                }
            } catch (err) {
                console.error('Error fetching officers:', err);
                setError('An error occurred while fetching officers.');
            }
        };

        fetchOfficers();
    }, []);

    // Handle checkbox change for officer selection
    const handleCheckboxChange = (officerId: string) => {
        setSelectedOfficers((prev) =>
            prev.includes(officerId)
                ? prev.filter((id) => id !== officerId)
                : [...prev, officerId]
        );
    };

    // Handle task assignment submission
    const handleSubmit = async () => {
        setLoading(true);
        setError("");

        try {
            const result: AssignTaskResponse = await assignTask(taskId, selectedOfficers);
            if (result?.success) {
                alert('Task assigned successfully!');
                router.push('/admin'); // Navigate back to the admin page
            } else {
                setError(result?.message || 'An error occurred while assigning the task.');
            }
        } catch (err) {
            console.error('Error assigning task:', err);
            setError('An error occurred while assigning the task.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
    <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Assign Task</h1>
    {error && <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>}
    <ul className="mb-6">
        {officers.map((officer) => (
            <li
                key={officer._id}
                className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-4 rounded-lg shadow-sm mb-3"
            >
                <div className="flex items-center space-x-4">
                    <input
                        type="checkbox"
                        value={officer._id}
                        onChange={() => handleCheckboxChange(officer._id)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="text-lg font-medium text-gray-700">{officer.name}</span>
                </div>
            </li>
        ))}
    </ul>
    <button
        className={`w-full py-3 text-lg font-semibold rounded-lg transition ${
            loading
                ? 'bg-blue-400 text-gray-200 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
        onClick={handleSubmit}
        disabled={loading}
    >
        {loading ? 'Assigning...' : 'Assign Task'}
    </button>
</div>

    );
}
