import { useEffect, useState } from "react";
import LapTopHeader from './Header-components/LapTopHeader.jsx';
import MobileHeader from './Header-components/MobileHeader.jsx';

function Header() {

    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY) {
                // نازل لتحت
                setShowHeader(false);
            } else {
                // طالع لفوق
                setShowHeader(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);

    }, [lastScrollY]);

    return (
        <div
            className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 
            ${showHeader ? "translate-y-0" : "-translate-y-full"}`}
        >
            <div className="max-[912px]:block hidden">
                <MobileHeader />
            </div>

            <div className="min-[913px]:block hidden">
                <LapTopHeader />
            </div>
        </div>
    );
}

export default Header;
