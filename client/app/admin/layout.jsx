import Navbar from "./../ui/Navbar";
import Sidebar from "../ui/Sidebar";

export default function RootLayout({ children }) {
    return (
      <html lang="en" className="h-full w-full">
        <head>
          <title>Overview</title>
        </head>
        <body className="h-full w-full m-0">
         <div>
          <div>
            <Navbar/>
          </div>
          <div className='flex '>
            <div className='hidden md:block md:p-4'><Sidebar/></div>
            <div className="md:flex md:justify-center w-full">{children}</div>
          </div>
         </div>
        </body>
      </html>
    );
  }