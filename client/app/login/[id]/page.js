'use client';
import { useParams } from 'next/navigation';
import Login from '@/app/ui/Login';

export default function Page() {
    const params = useParams(); // Get the dynamic route parameters
    const id = params.id; // Extract the id from the params

    return (
        <div>
            <Login id={id} />
        </div>
    );
}
