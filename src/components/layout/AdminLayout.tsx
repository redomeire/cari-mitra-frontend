import Sidebar from "../Navbar/Sidebar";
import TopAppBar from "../Navbar/TopAppBar";
import React from 'react'

interface Props {
    children?: React.ReactNode,
    pageName?: string
}

const AdminLayout = ({
    children,
    pageName
} : Props) => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(false);

    return ( 
        <div className="font-sora dark:bg-slate-700 bg-[#f7f1fc]">
            <Sidebar 
            isSidebarOpen={isSidebarOpen} 
            setIsSidebarOpen={setIsSidebarOpen}/>
            <TopAppBar 
            isSidebarOpen={isSidebarOpen} 
            setIsSidebarOpen={setIsSidebarOpen}/>
            <div className="md:pl-[220px] px-5 pt-24">
                {/* <div className="mb-5">
                    <Typography variant="subtitle1">{pageName || "Home"}</Typography>
                    <Typography variant="body2" className="mt-3">Hello, welcome back</Typography>
                </div> */}
                <div className="min-h-screen pt-5 pb-10">
                    {children}
                </div>
            </div>
        </div>
     );
}
 
export default AdminLayout;