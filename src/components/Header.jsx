// import GradientText from '../react bits/GradientText.jsx';
// import OrderBtn from './Header-components/OrderBtn.jsx';
// import Menu from './Header-components/Menu.jsx';
// import StyledMenu from './Header-components/StyledMenu.jsx';
// import { Card } from '@mui/material';
// import CardNav from './CardNav'
// import logo from './logo.svg';
import LapTopHeader from './Header-components/LapTopHeader.jsx';
import MobileHeader from './Header-components/MobileHeader.jsx';


function Header(){
    return(
        <>  
            <div className="max-[912px]:block hidden">
                <MobileHeader />
            </div>
            <div className="min-[913px]:block hidden">
                <LapTopHeader />
            </div>
        </>
    )
}

export default Header
