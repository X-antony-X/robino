import GradientText from '../../react bits/GradientText.jsx';
import OrderBtn from './OrderBtn.jsx';
import Menu from './Menu.jsx';

function LapTopHeader() {
    return (
        <header className="w-full flex justify-between items-center bg-white shadow-md p-4 border-b-2 border-[#121212]">
            <div>
                <GradientText colors={["#121212", "#4A4A4A", "#a4a4a4ff", "#4A4A4A", "#121212"]} animationSpeed={3} showBorder={false} className="custom-class font-[font-serrat] font-bold text-3xl md:text-4xl lg:text-5xl">ROBINO</GradientText>
            </div>
            <div>
                <Menu />
            </div>
            <div>
                <OrderBtn />
            </div>
        </header>
    )
}

export default LapTopHeader;