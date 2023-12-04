import Navbar from "../components/Navbar";
import HomeMenu from "../components/Products/HomeMenuItems";
import About from "./About";
import FooterPage from "../components/Footer";

function Home() {
    return ( 
        // <Navbar>
        //     <HomeMenu></HomeMenu>
        // </Navbar>
        <>
            <Navbar></Navbar>
            <HomeMenu></HomeMenu>
            <About></About>
            <FooterPage></FooterPage>
        </>
     );
}

export default Home;