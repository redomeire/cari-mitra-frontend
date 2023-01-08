import { Button } from "react-daisyui";
import Typography from "../Typography/Typography";
import { BsArrowRight } from "react-icons/bs";

const Footer = () => {
    return ( 
        <footer className="mt-10 bg-gray-700 text-white p-5 px-10 py-10 flex flex-col">
            <div className="flex items-center justify-between w-full border-b border-b-gray-400 pb-10">
                <div className="flex items-center">
                    <img src="/images/logo_white.svg" className="h-10 w-10" alt="logo"/>
                    <Typography variant="title" className="ml-3 font-semibold">CariMitra</Typography>
                </div>
                <div className="flex items-center">
                    <Typography className="mr-5">Ready to get started?</Typography>
                    <Button className="bg-purple-600 rounded-none normal-case font-normal" endIcon={<BsArrowRight/>}>Get Started</Button>
                </div>
            </div>
            <div className="mt-5 flex items-start justify-between">
                <Typography variant="subtitle2" className="font-normal">Subscribe to our newsletter</Typography>
                <div className="flex items-start">
                    <div className="text-left mx-20">
                        <Typography className="text-yellow-500 font-semibold" variant="body1">Solution</Typography>
                        <Typography className="cursor-pointer mt-5 my-2 hover:text-gray-400 transition duration-200" variant="body2">Start shop</Typography>
                        <Typography className="cursor-pointer my-2 hover:text-gray-400 transition duration-200" variant="body2">Pricing</Typography>
                        <Typography className="cursor-pointer my-2 hover:text-gray-400 transition duration-200" variant="body2">web</Typography>
                        <Typography className="cursor-pointer my-2 hover:text-gray-400 transition duration-200" variant="body2">Deals</Typography>
                    </div>
                    <div className="text-left mx-20">
                        <Typography className="text-yellow-500 font-semibold" variant="body1">Solution</Typography>
                        <Typography className="cursor-pointer mt-5 my-2 hover:text-gray-400 transition duration-200" variant="body2">Start shop</Typography>
                        <Typography className="cursor-pointer my-2 hover:text-gray-400 transition duration-200" variant="body2">Pricing</Typography>
                        <Typography className="cursor-pointer my-2 hover:text-gray-400 transition duration-200" variant="body2">web</Typography>
                        <Typography className="cursor-pointer my-2 hover:text-gray-400 transition duration-200" variant="body2">Deals</Typography>
                    </div>
                    <div className="text-left mx-20">
                        <Typography className="text-yellow-500 font-semibold" variant="body1">Solution</Typography>
                        <Typography className="cursor-pointer mt-5 my-2 hover:text-gray-400 transition duration-200" variant="body2">Start shop</Typography>
                        <Typography className="cursor-pointer my-2 hover:text-gray-400 transition duration-200" variant="body2">Pricing</Typography>
                        <Typography className="cursor-pointer my-2 hover:text-gray-400 transition duration-200" variant="body2">web</Typography>
                        <Typography className="cursor-pointer my-2 hover:text-gray-400 transition duration-200" variant="body2">Deals</Typography>
                    </div>
                </div>
            </div>
        </footer>
     );
}
 
export default Footer;