import Navbar from "../ui/navbar";
import Sidebar from "../ui/sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
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