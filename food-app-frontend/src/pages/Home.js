import Navbar from "../components/Navbar";
import HomeMenu from "../components/Products/HomeMenuItems";
import About from "./About";

function Home() {
    return ( 
        // <Navbar>
        //     <HomeMenu></HomeMenu>
        // </Navbar>
        <>
            <Navbar></Navbar>
            <HomeMenu></HomeMenu>
            <About></About>
        </>
     );
}

export default Home;