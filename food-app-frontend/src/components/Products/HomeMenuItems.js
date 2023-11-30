import {menuItems} from "../../app/APIMenuList"
import { Link } from "react-router-dom"

function HomeMenu() {
    // const handleSelectedItem =  async(e,proItem) =>{
    //     console.log("proItem,,,",proItem.title);
    //     const response = await axios.post(selectedProducts,{title:proItem.title});
    //     console.log("API RES",response);
    // }
    return ( 
        <div>
            <section className="bg-white  py-24 px-4 lg:px-16"> 
                <div className="container mx-auto px-[12px] md:px-24 xl:px-12 max-w-[1300px] nanum2">
                    <h1 className="text-center text-5xl pb-12">Industries we serve</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-28 lg:gap-y-16">

                    {menuItems.map((product,index) => (
                        <Link to={{pathname: '/product',search: `?title=${product.title}`}}>
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
                    ))}
                    </div>
                </div>
            </section>
        </div>
     );
}

export default HomeMenu;