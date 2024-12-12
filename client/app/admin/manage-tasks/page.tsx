'use client';
import { useState } from "react";
import clsx from "clsx";
import GetAllTasksAdmin from "@/app/ui/adminTask";
import CreateTasks from "@/app/ui/createTask";

export default function Classrooms() {
    const [isViewTasks, setIsViewTasks] = useState(true);
    const [isCreateTask, setIsCreateTask] = useState(false);

    const ViewTasks = () => {
        setIsViewTasks(true);
        setIsCreateTask(false);
    }

    const CreateTask = () => {
        setIsViewTasks(false); // Set to false to hide the "View Tasks" component
        setIsCreateTask(true); // Set to true to show the "Create Task" component
    }

    return (
        <div className="p-4">
            <div className="flex flex-col gap-3 md:flex-row flex-grow justify-between md:m-4 items-center md:gap-8 md:p-4">
                <div 
                    onClick={ViewTasks} 
                    className={clsx(
                        "p-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer",
                        isViewTasks ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800 border border-gray-300"
                    )}
                >
                    Manage Tasks
                </div>
                <div 
                    onClick={CreateTask} 
                    className={clsx(
                        "p-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer",
                        isCreateTask ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800 border border-gray-300"
                    )}
                >
                    Create Task
                </div>
            </div>
            <div className="flex mt-3">
                {isViewTasks && <GetAllTasksAdmin />}
                {isCreateTask && <CreateTasks />}
            </div>
        </div>
    );
}
