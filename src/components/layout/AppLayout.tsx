import Navbar from "../Navbar/Navbar";
import React from 'react';
import Footer from "../Footer/Footer";
import { Button } from "react-daisyui";
import { BsChevronUp } from "react-icons/bs";
import { motion, useScroll, useSpring } from "framer-motion";

interface Props {
    children: React.ReactNode
}

const AppLayout = (
    {
        children
    }: Props
) => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });
    const [visible, setVisible] = React.useState(false);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500)
            setVisible(true);

        else setVisible(false);
    })

    return (
        <div className="font-sora relative">
            <motion.div className="progress-bar z-50 fixed top-0 left-0 right-0 h-[5px] origin-left bg-purple-400" style={{ scaleX }}/>
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