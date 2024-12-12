'use client';
import { useEffect, useState } from 'react';
import { getAllTasksAdmin } from "@/actions";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    delegationHistory: any[];
    assignedToOfficers: string[];
    assignedToWorkers: string[];
}

export default function GetAllTasksAdmin() {
    const router = useRouter();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await getAllTasksAdmin();
                if (response?.tasks) {
                    setTasks(response.tasks);
                } else {
                    console.error("Unexpected response structure:", response);
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, []);

    const toggleExpand = (taskId: string) => {
        setExpandedTaskId((prevId) => (prevId === taskId ? null : taskId));
    };
    
    const navigateToAssign = (taskId: string) => {
        router.push(`/admin/assign/${taskId}`);
    };


    return (
        <div className="flex w-full">
            <div className="w-full p-8">
                <div className="max-w-4xl mx-auto">
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <div
                                key={task._id}
                                className="border border-gray-300 rounded-lg p-6 mb-6 shadow-lg bg-white"
                            >
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-bold text-gray-800">{task.title}</h2>
                                    <button onClick={() => toggleExpand(task._id)}>
                                        {expandedTaskId === task._id ? (
                                            <ChevronUpIcon className="h-6 w-6 text-gray-600" />
                                        ) : (
                                            <ChevronDownIcon className="h-6 w-6 text-gray-600" />
                                        )}
                                    </button>
                                </div>
                                {expandedTaskId === task._id && (
                                    <div className="mt-4">
                                        <p>
                                            <strong>Description:</strong> {task.description}
                                        </p>
                                        <p>
                                            <strong>Status:</strong> {task.status}
                                        </p>
                                        <p>
                                            <strong>Priority:</strong> {task.priority}
                                        </p>
                                        <p>
                                            <strong>Assigned to Officers:</strong>{" "}
                                            {task.assignedToOfficers.length > 0
                                            ? task.assignedToOfficers.map((officer: any) => officer.name).join(", ")
                                            : "None"}
                                        </p>
                                        <p>
                                            <strong>Assigned to Workers:</strong>{" "}
                                            {task.assignedToWorkers.join(", ") || "None"}
                                        </p>
                                        <div className="flex space-x-4 mt-4">
                                            <button onClick={() => navigateToAssign(task._id)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                                Assign
                                            </button>
                                            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No tasks available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
