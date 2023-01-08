import { Button } from "react-daisyui";
import AppLayout from "../components/layout/AppLayout";
import Typography from "../components/Typography/Typography";
import { BsArrowRight, BsCheckLg, BsGraphUp, BsStars } from "react-icons/bs";
import { FaApple, FaGooglePlay, FaHandshake } from "react-icons/fa";
import { TbDiscount2 } from "react-icons/tb";
import { homeData } from "../utils/dummy";

const Home = () => {
    return (
        <AppLayout>
            <section className="jumbotron w-full min-h-[400px] bg-purple-400 pt-5 px-20 pb-0 flex items-center justify-between">
                <div className="text-white md:w-[45%]">
                    <Typography variant="title" className="text-[50px] leading-[60px] font-semibold">Make partnership with ease and no worry!</Typography>
                    <Typography variant="body2" className="mt-5">People seeks partnership, just like you. Hence, we provide service that must be satisfy you</Typography>
                    <Button className="mt-10 rounded-none" endIcon={<BsArrowRight />}>Start Now</Button>
                </div>
                <img src="/images/home/agreement.png" alt="hero" className="md:w-[45%]" />
            </section>
            <div className="flex items-center justify-between px-20 bg-gray-100 flex-wrap">
                <div className="flex items-center py-5 md:w-[24%]">
                    <Button className="">
                        <BsCheckLg size='15px' />
                    </Button>
                    <Typography variant="body2" className="ml-3">Complete order and payment processing</Typography>
                </div>
                <div className="flex items-center py-5 md:w-[24%]">
                    <Button className="">
                        <BsCheckLg size='15px' />
                    </Button>
                    <Typography variant="body2" className="ml-3">More turnover and better customer loyalty</Typography>
                </div>
                <div className="flex items-center py-5 md:w-[24%]">
                    <Button className="">
                        <BsCheckLg size='15px' />
                    </Button>
                    <Typography variant="body2" className="ml-3">Convenient voucher and ticket management</Typography>
                </div>
                <div className="flex items-center py-5 md:w-[24%]">
                    <Button className="">
                        <BsCheckLg size='15px' />
                    </Button>
                    <Typography variant="body2" className="ml-3">Your own voucher and ticket shop</Typography>
                </div>
            </div>
            <main className="px-10 w-full mt-32 flex flex-col justify-center">
                <hr className="h-[3px] w-[100px] mx-auto bg-purple-400 mb-5" />
                <div className="w-[60%] mx-auto text-center">
                    <Typography variant="title" className="mb-10 text-4xl">People wanna make partnerships. Just like you</Typography>
                    <Typography className="text-gray-600 leading-7" variant="body2">Whether as a gift or as a benefit voucher. With CariMitra we give you the perfect sales and marketing tool to make a successful online business with your services 24/7 sales and new customers on autopilot</Typography>
                </div>
                <div className="flex items-stretch mt-20">
                    <div className="md:w-[25%] bg-yellow-100 p-5 mx-2">
                        <FaHandshake size="30px" className="text-orange-500 mb-4" />
                        <Typography variant="body1" className="font-bold mb-4">Selling vouchers</Typography>
                        <Typography variant="body2" className="leading-7">Sell vouchers of value and in kind online</Typography>
                    </div>
                    <div className="md:w-[25%] bg-yellow-100 p-5 mx-2">
                        <BsGraphUp size="30px" className="text-orange-500 mb-4" />
                        <Typography variant="body1" className="font-bold mb-4">Marketing Strategy</Typography>
                        <Typography variant="body2" className="leading-7">Marketing your tickets for your own event</Typography>
                    </div>
                    <div className="md:w-[25%] bg-yellow-100 p-5 mx-2">
                        <TbDiscount2 size="30px" className="text-orange-500 mb-4" />
                        <Typography variant="body1" className="font-bold mb-4">Promo and discount</Typography>
                        <Typography variant="body2" className="leading-7">Use promo and discount vouchers to attract and retain customers</Typography>
                    </div>
                    <div className="md:w-[25%] bg-yellow-100 p-5 mx-2">
                        <BsStars size="30px" className="text-orange-500 mb-4" />
                        <Typography variant="body1" className="font-bold mb-4">Go Campaigns</Typography>
                        <Typography variant="body2" className="leading-7">Launch effective campaigns with vouchers and tickets</Typography>
                    </div>
                </div>
                <Button className="mt-10 mx-auto rounded-none bg-purple-600 hover:bg-purple-500 border-none" endIcon={<BsArrowRight />}>
                    <Typography variant="body2" className="normal-case">Learn more about our solution</Typography>
                </Button>
            </main>
            <section className="p-20 bg-gray-100 mt-20">
                <div className="w-full flex justify-between items-center">
                    <div className="md:w-[45%]">
                        <hr className="h-[3px] w-[100px] bg-purple-400 mb-5" />
                        <Typography variant="subtitle1" className="leading-snug">Who is CariMitra made<sup>&#9415;</sup> and intended for </Typography>
                    </div>
                    <Typography className="md:w-[35%] leading-7">CariMitra is suitable for anyone who offers a service or wants to use vouchers and tickets as a highly effective marketing tool</Typography>
                </div>
                <div className="w-full mt-20">
                    {
                        homeData.map((item, index) => {
                            return (
                                <Card key={index} icons={item.icon} name={item.name} />
                            )
                        })
                    }
                </div>
            </section>
            <section className="px-10 w-full mt-32 flex flex-col justify-center mb-20">
                {/* <hr className="h-[3px] w-[100px] mx-auto bg-purple-400 mb-5" /> */}
                <Typography variant="body2" className="text-center mb-5 text-purple-600">Partnership app</Typography>
                <div className="w-[60%] mx-auto text-center">
                    <Typography variant="title" className="mb-10 text-4xl">Download our app and start your free trail to get started today!</Typography>
                    <Typography className="text-gray-600 leading-7 mb-4" variant="body1">End-to-end payments and financial management in single solution</Typography>
                    <Button className="mr-3 rounded-full" startIcon={<FaGooglePlay size="20px"/>}>Google Play</Button>
                    <Button className="rounded-full" startIcon={<FaApple size="20px"/>}>App Store</Button>
                </div>
            </section>
        </AppLayout>
    );
}

interface Props {
    icons: React.ReactNode,
    name: string
}

const Card = ({ icons, name }: Props) => {
    return (
        <Button className="m-2 bg-white hover:bg-white border-none rounded-none" startIcon={icons}>
            <Typography variant="body2" className="normal-case text-black">{name}</Typography>
        </Button>
    )
}

export default Home;