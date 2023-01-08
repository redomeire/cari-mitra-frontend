import Navbar from "../Navbar/Navbar";
import React from 'react';
import Footer from "../Footer/Footer";
import { Button } from "react-daisyui";
import { BsChevronUp } from "react-icons/bs";

interface Props {
    children: React.ReactNode
}

const AppLayout = (
    {
        children
    }: Props
) => {
    const [visible, setVisible] = React.useState(false);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 800)
            setVisible(true);

        else setVisible(false);
    })

    return (
        <div className="font-sora relative">
            <Navbar />
            <div className="pt-[90px] min-h-screen">{children}</div>
            {window.location.pathname !== '/partnerships/explore/search' && <Footer />}
            {
                visible &&
                <Button className="fixed bottom-10 right-10 rounded-full" href="#">
                    <BsChevronUp size={15} />
                </Button>
            }
        </div>
    );
}

export default AppLayout;