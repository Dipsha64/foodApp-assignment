import React,{ useEffect, useState } from 'react';
import axios from 'axios';
import { selectedProducts, searchProduct } from "../../utils/APIRoutes";
import { FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { StarIcon } from '@heroicons/react/20/solid';
import styled from "styled-components";
import { Link } from "react-router-dom"
import { Disclosure } from '@headlessui/react'
import { ThreeDots } from  'react-loader-spinner'
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import {menuItems} from "../../app/APIMenuList";


function ProductList() {
    const getParam = useParams();
    const totalItems = 0;
    const [menuCategory,setMenuCategory] = useState([]);
    
    const filters = [
        {
          id: 'brand',
          name: 'Brands', 
          options: [],
        },
        {
          id: 'category',
          name: 'Category',
          options: menuCategory,
        },
      ]

    const [allMenuItems,setAllMenuItems] = useState([]);
    const [page,setPage] = useState(1);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [isBusy, setBusy] = useState();
    const [filterValue,setFilterValue] = useState({});

    const handleFilter = (e, section, option) =>{
        console.log(e.target.checked, section, option);
        if(e.target.checked){
            setBusy(true);
            setFilterValue(option);
            const pageNum = 12;
            setPage(pageNum);
            getAPIData(option.value,pageNum);
        }
        else if(!e.target.checked){
            setBusy(true);
            const pageNum = 12;
            setPage(pageNum);
            getAPIData(getParam.id,pageNum);
            setFilterValue({});
        }
    }
    const handleSearch = (e) =>{
        console.log("SEARCH....",e.target.value);
        if(e.target.value !== ""){
            setBusy(true);
            const pageNum = 12;
            setPage(pageNum);
            axios.post(searchProduct,{value:e.target.value,page:pageNum})
            .then((response)=> {
                setAllMenuItems(response.data.data.results);
                console.log("RESPONSE....",response);
                setBusy(false);
            })
        }
    }

    const getAPIData = (param,pageNum) =>{
        axios.post(selectedProducts,{title:param,page:pageNum})
        .then((response)=> {
            setAllMenuItems(response.data.data.results);
            setBusy(false);
        })
    }

    const getMoreProduct = (e) =>{
        console.log("filterValue...",filterValue);
        if(filterValue && Object.keys(filterValue).length > 0){
            setPage(page + 12);
            const pageNum = page +12;
            getAPIData(filterValue.value,pageNum);
        }
        else{
            setPage(page + 12);
            const pageNum = page +12;
            getAPIData(getParam.id,pageNum);
        }
    }
    const addToWishlist = (product) =>{
        console.log(product, "product LIST");
    }

    // const handleFavourite = (e,product) =>{
    //     console.log("handleFavourite" , e,product);
    // }

    useEffect(()=>{
        setBusy(true);
        const pageNum = 12;
        setPage(pageNum);
        getAPIData(getParam.id,pageNum);

        if(menuItems && menuItems.length > 0){
            const menuCategory = [];
            for(let i=0;i<menuItems.length;i++){
                menuCategory.push({"value" : menuItems[i].title,"label":menuItems[i].title.charAt(0).toUpperCase() + menuItems[i].title.slice(1),"checked" : false});
            }
            setMenuCategory(menuCategory);
        }
    },[])

    return ( 
        // <>
        // <FormContainer>
        // <div>
        //     <section className="bg-white dark:bg-gray-900">
        //         <div className="container px-6 py-10 mx-auto">
        //             <h1 className="w-48 h-2 mx-auto bg-gray-200 rounded-lg dark:bg-gray-700"></h1>

        //             <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
        //             <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg sm:w-80 dark:bg-gray-700"></p>

        //             <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
        //             {allMenuItems.map((product,index) => (
        //                 <div key={index} className="w-full ">
        //                     <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600 box-image">
        //                         <img src={product.image} />
        //                     </div>
        //                         <h1>{product.title}</h1>
        //                     <p></p>
        //                 </div>
        //                 ))}
        //             </div>
        //         </div>
        //     </section>
        // </div>
        // </FormContainer>
        // </>
        <>
            <FormContainer>
            <Navbar></Navbar>
            <div className="bg-white">
                <div>
                    {/* <MobileFilter /> */}
                    <main className="mx-auto max-w-9xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Products</h1>

                        <div className="flex items-center">
                        <div class='max-w-md mx-auto'>
                            <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                                <div class="grid place-items-center h-full w-12 text-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>

                                <input onKeyUp={(e)=>handleSearch(e)} class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                                type="text"  id="search" placeholder="Search something.." /> 
                            </div>
                        </div>
                        {/* <Menu as="div" className="relative inline-block text-left">
                            <div>
                            <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                Sort
                                <ChevronDownIcon
                                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                                />
                            </Menu.Button>
                            </div>

                            <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                            >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                {sortOptions.map((option) => (
                                    <Menu.Item key={option.name}>
                                    {({ active }) => (
                                        <p
                                        onClick={e=>handleSort(e,option)}
                                        className={classNames(
                                            option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                            active ? 'bg-gray-100' : '',
                                            'block px-4 py-2 text-sm'
                                        )}
                                        >
                                        {option.name}
                                        </p>
                                    )}
                                    </Menu.Item>
                                ))}
                                </div>
                            </Menu.Items>
                            </Transition>
                        </Menu> */}

                        {/* <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                            <span className="sr-only">View grid</span>
                            <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                        </button> */}
                        <button
                            type="button"
                            className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                            onClick={() => setMobileFiltersOpen(true)}
                        >
                            <span className="sr-only">Filters</span>
                            <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                        {/* Filters */}
                        <DesktopFilter handleFilter={handleFilter} filters={filters}/>
                        {/* Product grid */}
                        <div className="lg:col-span-3">
                        
                        {isBusy ? ( <ThreeDots  height="80" width="80" radius="9" olor="#4fa94d" ariaLabel="three-dots-loading"
                            wrapperStyle={{}} wrapperClassName="" visible={true}/>) : ( 
                            // <ProductGrid products={allMenuItems} addToWishlist={addToWishlist}/> )}

                            <div className="bg-white">
                                <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
                                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                    { allMenuItems && allMenuItems.products.length > 0 && allMenuItems.products.map((product,index) => (
                                        <div>
                                        <div key={index} className="group relative border-solid border-2 p-2">
                                            <Link to={`/product-detail/${product.id}`}>
                                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                                                <img
                                                src={product.image}
                                                alt={product.title}
                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                                />
                                            </div>
                                            <div className="mt-4 flex justify-between">
                                                <div>
                                                <h3 className="text-sm text-gray-700">
                                                    <div href={product.image}>
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {product.title}
                                                    </div>
                                                </h3>
                                                </div>
                                            </div>
                                            </Link>
                                        </div>
                                        <div>
                                        <button type="button" class="root">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg>
                                        </button>
                                            {/* <span onClick={(e)=>addToWishlist(e,product)}><StarIcon className="w-6 h-6 inline"></StarIcon></span> */}
                                            </div>
                                        </div>

                                    ))}
                                    </div>
                                </div>
                                <button onClick={(e)=>getMoreProduct(e)} type="button" className="loadMoreData text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">View More</button>
                            </div>
                            )}
                        </div>               
                        </div>
                    </section>
                    </main>
                </div>
            </div>
            </FormContainer>
        </>
    );
}
  
  function DesktopFilter({handleFilter , filters}) {
    return ( 
    <form className="hidden lg:block">
      {filters.map((section) => (
      <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
          {({ open }) => (
          <>
              <h3 className="-my-3 flow-root">
              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">{section.name}</span>
                  <span className="ml-6 flex items-center">
                  {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                  </span>
              </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
              <div className="space-y-4">
                  {section.options && section.options.map((option, optionIdx) => (
                  <div key={option.value} className="flex items-center">
                      <input
                      id={`filter-${section.id}-${optionIdx}`}
                      name={`${section.id}[]`}
                      defaultValue={option.value}
                      type="checkbox"
                      defaultChecked={option.checked}
                      onClick={e=>handleFilter(e,section,option)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                      htmlFor={`filter-${section.id}-${optionIdx}`}
                      className="ml-3 text-sm text-gray-600"
                      >
                      {option.label}
                      </label>
                  </div>
                  ))}
              </div>
              </Disclosure.Panel>
          </>
          )}
      </Disclosure>
    ))}
  </form> );
  }
  
  function ProductGrid(allMenuItems,addToWishlist) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            { allMenuItems && allMenuItems.products.length > 0 && allMenuItems.products.map((product,index) => (
                <div>
                <div key={index} className="group relative border-solid border-2 p-2">
                    <Link to={`/product-detail/${product.id}`}>
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                        <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                        />
                    </div>
                    <div className="mt-4 flex justify-between">
                        <div>
                        <h3 className="text-sm text-gray-700">
                            <div href={product.image}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.title}
                            </div>
                        </h3>
                        </div>
                    </div>
                    </Link>
                </div>
                <div>
                <button type="button" class="root">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                </button>
                    {/* <span onClick={(e)=>addToWishlist(e,product)}><StarIcon className="w-6 h-6 inline"></StarIcon></span> */}
                    </div>
                </div>

            ))}
            </div>
        </div>
      </div>
    );
  }

const FormContainer = styled.div`
    .box-image img {
        height: 260px;
        width: 350px;
    }
    .loadMoreData {
        margin-top: 100px;
        margin-left: 243px;
    }
`


export default ProductList;