import {menuItems} from "../../app/APIMenuList"
import { Link } from "react-router-dom"
import styled from "styled-components";
import bgimg from "../../images/hero-bg.jpg";
import fsection1 from "../../images/f1.png";

function HomeMenu() {
    // const handleSelectedItem =  async(e,proItem) =>{
    //     console.log("proItem,,,",proItem.title);
    //     const response = await axios.post(selectedProducts,{title:proItem.title});
    //     console.log("API RES",response);
    // }
    return ( 
        <>
        <FormContainer>
            <div>
            <img src={bgimg}/>
            <section className="bg-white py-24 px-4 lg:px-16"> 
                <div className="container mx-auto px-[12px] md:px-24 xl:px-12 max-w-[1300px] nanum2">
                    <div class="bg-box carousel-item active">
                        
                        <div class="container ">
                        <div class="row">
                            <div class="col-md-7 col-lg-6 ">
                            <div class="detail-box">
                                <h1>
                                Fast Food Restaurant
                                </h1>
                                <p>
                                Doloremque, itaque aperiam facilis rerum, commodi, temporibus sapiente ad mollitia laborum quam quisquam esse error unde. Tempora ex doloremque, labore, sunt repellat dolore, iste magni quos nihil ducimus libero ipsam.
                                </p>
                                <div class="btn-box">
                                <a href="" class="btn1">
                                    Order Now
                                </a>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        
                    </div>

                    <h1 className="text-center text-5xl pb-12">Our Menu</h1>
                    <div className="main-grid-section grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-y-28 lg:gap-y-16">

                    {/* {menuItems.map((product,index) => (
                        <Link to={`/product/${product.title}`}>
                            <div key={index} className="relative group h-48 flex   flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                                <div className="h-28">
                                    <div
                                        className="absolute -top-20 lg:top-[-10%] left-[5%] z-40  group-hover:top-[-40%] group-hover:opacity-[0.9]   duration-300 w-[90%] h-48 rounded-xl justify-items-center align-middle">
                                        <img src={product.image}
                                            className="w-36 h-36  mt-6 m-auto" alt="Automotive" title="Automotive" loading="lazy"
                                            width="200" height="200"/>
                                    </div>
                                </div>
                                <div className="p-6 z-10 w-full">
                                    <p
                                        className="mb-2 inline-block text-tg text-center w-full  text-xl  font-sans  font-semibold leading-snug tracking-normal   antialiased">
                                        {product.title}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))} */}

                    {menuItems.map((product,index) => (
                    <Link to={`/product/${product.title}`}>
                    <div class="col-sm-6 col-lg-4 all-pizza-section">
                        <div class="box">
                        <div>
                            <div class="img-box">
                                <img className="img-section" src={product.image} alt=""/>
                            </div>
                            <div class="detail-box">
                            <h2>{product.title.charAt(0).toUpperCase() + product.title.slice(1)}
                            </h2>
                            <p>
                                Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit, magnam voluptatem repellendus sed eaque
                            </p>
                            <div class="options">
                                <h3>View More </h3>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </Link>
                    ))}

                    </div>
                </div>
            </section>
            </div>
        </FormContainer>
        </>
     );
}
const FormContainer = styled.div`
    .bg-box {
        background-image: url("../../images/hero-bg.jpg");
    }
    .row .detail-box {
        z-index: 100;
        position: absolute;
        color: white;
        font-size: 24px;
        font-weight: bold;
        left: 150px;
        top: 350px;
    }
    .box {
        position: relative;
        margin-top: 25px;
        background-color: #ffffff;
        border-radius: 10px;
        color: #ffffff;
        border-radius: 15px;
        overflow: hidden;
        height: 482px;
        width: 436px;
        background: linear-gradient(to bottom, #f1f2f3 25px, #222831 25px);
        column-gap: 10%;
    }
    .box .img-box {
        background: #f1f2f3;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
       
        border-radius: 0 0 0 45px;
        margin: -1px;
        padding: 25px;
    }
    .img-section {
        height: 189px;
    }
    .box .detail-box {
        padding: 25px;
    }
    .box .detail-box p {
        font-size: 18px;
    }
    .box .detail-box h2{
        font-size: 28px;
        font-weight: 800;
        padding-top: 5px;
    }
    .box .options {
        display: flex;
        justify-content: space-between;
        padding-top: 23px;
        font-size: 22px;
    }
    .main-grid-section {
        column-gap: 240px;
    }
    // .all-pizza-section {
    //     position: absolute; left: 0px; top: 0px;
    // }
`
export default HomeMenu;