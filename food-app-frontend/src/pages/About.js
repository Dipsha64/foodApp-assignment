import styled from "styled-components";
import bgimg from "../images/about-img.png";

function About() {
    return ( 
        <>
        <FormContainer>
            {/* <div className="main-about-section">
            <img src={bgimg}/>
            <section class="bg-white py-24 px-4 lg:px-16 grid grid-cols-2 gap-4">
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
                    </div>
            </section> */}
            <div class="grid grid-cols-2 gap-3 main-about-section">
                <div className="image-box"><img src={bgimg}/></div>
                <div className="detail-box">
                    <h1 className="heading-section">
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
            {/* </div> */}
        </FormContainer>
        </>
     );
}

const FormContainer = styled.div`
    .main-about-section {
        background-color: black;
    }
    .main-about-section .image-box {
        display: flex;
        justify-content: center;
        padding-top: 63px;
        padding-bottom: 60px;
    }
    .main-about-section .detail-box {
        color: white;
        justify-content: center;
        display: inline;
        padding-top: 406px;
        font-family: "Open Sans", sans-serif;
    }
    .main-about-section .detail-box .heading-section {
        flex-direction: column;
        -webkit-box-align: start;
        font-size: 61px;
        font-weight: bold;
    }
    .main-about-section .detail-box p{
        font-size: 20px;
    }
`
export default About;