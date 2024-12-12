import axios from 'axios'
import Cookies from 'js-cookie';


export const login=async(user,id)=>{
    try {

    const response = await axios.post(`http://localhost:8000/api/v1/${id}/login`, 
    user ,
    {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    }
);


if (response.headers['set-cookie']) {
   const cookiesFromResponse = response.headers['set-cookie'];

   cookiesFromResponse.forEach(cookie => {
       const [cookieName, cookieValue] = cookie.split(';')[0].split('=');
       Cookies.set(cookieName, cookieValue, { path: '/' , sameSite: 'None', secure: true });
   });
}
const userData = response.data[id];
console.log("user data", userData);
localStorage.setItem('user', JSON.stringify(userData));

return { status: true, user: userData };
} catch (error) {
console.log("error logging in", error);
alert(error)
return {status : false };
}
}


export const getUserData = async () => {
    try {
        const user = localStorage.getItem('user');
        if (user) {
            return JSON.parse(user); // Convert the JSON string back to an object
        } else {
            throw new Error('No user data found');
        }
    } catch (error) {
        console.log("Error getting user data:", error);
        alert("Error getting user data. Please try again.");
        return null;
    }
};

export const getAllTasksAdmin = async () => {
    try {
        const user = await getUserData();
        const response = await axios.get(`http://localhost:8000/api/v1/admin/get-all-tasks`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("tasks", response.data);
        return response.data

    } catch (error) {
        console.log("Error getting tasks:", error);
        alert("Error getting tasks. Please try again.");
        return [];
    }
}

export const AddTask = async (task) => {
    try {
        const response = await axios.post(`http://localhost:8000/api/v1/admin/create-task`, task, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("task created", response.data);
        return response.data

    } catch (error) {
        console.log("Error creating task:", error);
        alert("Error creating task. Please try again.");
        return null;
    }
}

export const getAllOfficers = async () => {
    try {
        const response = await axios.get(`http://localhost:8000/api/v1/officer/get-all-officers`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("officers", response.data);
        return response.data

    } catch (error) {
        console.log("Error getting officers:", error);
        alert("Error getting officers. Please try again.");
        return [];
    }
}

export const assignTask=async(taskId,officersId)=>{
    try {
        const response = await axios.post(`http://localhost:8000/api/v1/admin/assign-task/${taskId}`, { officersId }, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("task assigned", response.data);
        return response.data

    } catch (error) {
        console.log("Error assigning task:", error);
        alert("Error assigning task. Please try again.");
        return null;
    }
}

export const AddOfficer = async (officer) => {
    try {
        const response = await axios.post(`http://localhost:8000/api/v1/admin/create-officer`, officer, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("officer created", response.data);
        return response.data

    } catch (error) {
        console.log("Error creating officer:", error);
        alert("Error creating officer. Please try again.");
        return null;
    }
}   