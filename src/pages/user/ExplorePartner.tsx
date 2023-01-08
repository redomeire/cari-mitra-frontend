import axios from "axios";
import React from "react";
import { Button } from "react-daisyui";
import { BsArrowRight, BsCheckLg } from "react-icons/bs";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import Input from "../../components/Input/Input";
import AppLayout from "../../components/layout/AppLayout";
import Typography from "../../components/Typography/Typography";

const ExplorePartner = () => {
    const [searchValue, setSearchValue] = React.useState('');

    const handleSearch = (e: { preventDefault: () => void }) => {
        let Storage = window.localStorage.getItem('Authorization')

        let user = Storage !== null ? JSON.parse(Storage || "") : ''

        e.preventDefault();

        axios.get(`http://localhost:3333/api/partner/search?q=${searchValue}`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <AppLayout>
            <section className="bg-no-repeat jumbotron w-full min-h-[500px] pt-5 px-20 pb-0 flex items-center justify-between bg-cover bg-top bg-blend-darken rounded-tr-full rounded-br-full" style={{ backgroundImage: "linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url('https://images.unsplash.com/photo-1537511446984-935f663eb1f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')" }}>
                <form className="text-white md:w-[45%]" onSubmit={handleSearch}>
                    <Typography className="font-[15px] mb-3 text-purple-300">Search your partner</Typography>
                    <Typography className="md:text-[45px] leading-[60px] font-semibold">Make partnership with ease and no worry!</Typography>
                    <Input onChange={e => setSearchValue(e.target.value)} placeholder="search partner..." className="text-black" />
                    <Typography variant="body2" className="mt-5">People seeks partnership, just like you. Hence, we provide service that must be satisfy you</Typography>
                    <Button className="mt-5 mx-auto rounded-none bg-purple-600 hover:bg-purple-500 border-none" endIcon={<BsArrowRight />}>
                        <Typography variant="body2" className="normal-case">Search partner</Typography>
                    </Button>
                </form>
                {/* <img src="/images/home/agreement.png" alt="hero" className="md:w-[45%]" /> */}
            </section>
            <div className="flex items-center justify-between px-20 bg-white flex-wrap mt-10">
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
            <main className="p-10 mt-20">
                <div className="flex justify-between items-center">
                    <img className="md:w-[35%]" src="https://www.arshakir.com/templates/igrow/images/feature-iamge-p-800.png" alt="people"/>
                    <div className="md:w-[50%]">
                        <Typography className="mb-7 text-[40px] font-semibold">My little garret repair  to desire he esteem</Typography>
                        <Typography className="text-[20px] mb-7">Just like we said before, we have tons of features that will helps you to manage you wallet. From income, outcome, montly usage, and etc.</Typography>
                        <Button endIcon={<BsArrowRight size="20px"/>} className="rounded-full">Try for free</Button>
                    </div>
                </div>
            </main>
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

export default ExplorePartner;