"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllTasksOfficers } from "@/actions";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  deadline?: number;
}

export default function TaskTable() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getAllTasksOfficers();
      setTasks(data.tasks || []); // Assuming `data.tasks` contains the array of tasks
    };
    fetchTasks();
  }, []);

  const handleAssign = (taskId: string) => {
    // Redirect to task assignment page or handle assignment logic
    alert("Here Officer's can assign these tasks to their juniors");
  };

  return (
    <div className="overflow-x-auto">
      <table className="border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 md:p-2 p-1">Sr. No</th>
            <th className="border border-gray-300 md:p-2 p-1">Title</th>
            <th className="border border-gray-300 md:p-2 p-1">Deadline</th>
            <th className="border border-gray-300 md:p-2 p-1">Priority</th>
            <th className="border border-gray-300 md:p-2 p-1">Description</th>
            <th className="border border-gray-300 md:p-2 p-1">Assign</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task._id} className="bg-gray-50">
              <td className="border border-gray-300 md:p-2 p-1 text-center">{index + 1}</td>
              <td className="border border-gray-300 md:p-2 p-1">{task.title}</td>
              <td className="border border-gray-300 md:p-2 p-1 text-center">
                {task.deadline ? `${task.deadline} days` : "No deadline"}
              </td>
              <td className="border border-gray-300 md:p-2 p-1 text-center">{task.priority}</td>
              <td className="border border-gray-300 md:p-2 p-1">{task.description}</td>
              <td className="p-1 border border-gray-300 md:p-2 text-center">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleAssign(task._id)}
                >
                  Assign
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
