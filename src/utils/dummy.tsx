import { BsGraphUp, BsStars } from "react-icons/bs";
import { FaHandshake, FaCoffee, FaBuilding } from "react-icons/fa";
import { TbDiscount2 } from "react-icons/tb";
import { RiAdvertisementFill } from "react-icons/ri";
import { IoFastFood } from "react-icons/io5";

const homeData = [
    {
       icon: <TbDiscount2 size="20px" className="text-yellow-500"/>,
       name: 'Wellness provider'    
    },
    {
       icon: <FaHandshake size="20px" className="text-yellow-500"/>,
       name: 'Leisure provider'    
    },
    {
       icon: <FaCoffee size="20px" className="text-yellow-500"/>,
       name: 'Associations'    
    },
    {
       icon: <RiAdvertisementFill size="20px" className="text-yellow-500"/>,
       name: 'Advertising associations'    
    },
    {
       icon: <FaBuilding size="20px" className="text-yellow-500"/>,
       name: 'Hotels'    
    },
    {
       icon: <IoFastFood size="20px" className="text-yellow-500"/>,
       name: 'Gastronomy'    
    },
    {
       icon: <BsGraphUp size="20px" className="text-yellow-500"/>,
       name: 'Event organizer'    
    },
    {
       icon: <BsStars size="20px" className="text-yellow-500"/>,
       name: 'Specialist and retail trade'    
    },
]

export { homeData }