'use client';

import { useEffect, useState } from 'react';
import { getAllTasksOfficers, getAllOfficers, getUserData } from "@/actions";
import { UserCircleIcon } from "@heroicons/react/24/solid";

interface User {
    email: string;
}

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [taskCount, setTaskCount] = useState<number>(0);
   

    useEffect(() => {
        // Fetch user data
        const fetchUserData = async () => {
            const userData = await getUserData();
            setUser(userData);
        };

        // Fetch task count
        const fetchTasks = async () => {
            const tasks = await getAllTasksOfficers();
            setTaskCount(tasks.tasks.length);
            console.log(tasks.tasks.length);
        };



        fetchUserData();
        fetchTasks();
        
    }, []);

    if (user === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row w-full gap-4 justify-center items-center">
                {/* First Division */}
                <div className="flex flex-col w-full sm:w-64 p-4 sm:p-6 bg-slate-50 justify-center items-center rounded-2xl">
                    <div className="text-md sm:text-lg text-center text-black font-semibold tracking-wide mt-3 sm:mt-4">
                        Hello Officer!
                    </div>
                    <div className="mt-4 sm:mt-5">
                        <UserCircleIcon className="h-16 sm:h-20" />
                    </div>
                    <div className="text-md sm:text-lg text-center text-black font-semibold tracking-wide mt-3 sm:mt-4">
                        Email: {user.email}
                    </div>
                </div>

                {/* Second Division */}
                <div className="flex flex-col w-full sm:w-64 p-4 sm:p-6 bg-slate-50 justify-center items-center rounded-2xl">
                    <div className="text-md sm:text-lg text-center text-black font-semibold tracking-wide mt-3 sm:mt-4">
                        Total Tasks Assigned
                    </div>
                    <div className="mt-4 sm:mt-5 flex justify-center items-center">
                        <div className="h-16 w-16 sm:h-20 sm:w-20 flex justify-center items-center bg-blue-500 text-white font-bold text-lg sm:text-xl rounded-full">
                            {taskCount}
                        </div>
                    </div>
                </div>

                {/* Third Division */}
                <div className="flex flex-col w-full sm:w-64 p-4 sm:p-6 bg-slate-50 justify-center items-center rounded-2xl">
                    <div className="text-md sm:text-lg text-center text-black font-semibold tracking-wide mt-3 sm:mt-4">
                        Total Number of Employees Under You
                    </div>
                    <div className="mt-4 sm:mt-5 flex justify-center items-center">
                        <div className="h-16 w-16 sm:h-20 sm:w-20 flex justify-center items-center bg-green-500 text-white font-bold text-lg sm:text-xl rounded-full">
                            10
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
