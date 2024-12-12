'use client';
import { useState } from "react";
import OfficerTaskTable from "@/app/ui/officerTaskTable";

export default function Page(){
    return(
        <div className="p-4">
     <h2 className="text-2xl font-bold mb-6">Here are your Tasks Assigned By The Admin</h2>
     <div className="flex mt-3">
         <OfficerTaskTable/>
        </div>
        </div>
    )
}