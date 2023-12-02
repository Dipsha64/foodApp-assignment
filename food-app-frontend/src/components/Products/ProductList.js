import React,{Fragment,  useEffect, useState } from 'react';
import axios from 'axios';
import { selectedProducts } from "../../utils/APIRoutes";
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/20/solid';
import styled from "styled-components";
import { Link } from "react-router-dom"
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ThreeDots } from  'react-loader-spinner'
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';


const sortOptions = [
    { name: 'Best Rating', sort: 'rating',order: "desc", current: false },
    { name: 'Price: Low to High', sort: 'price', order: "asc", current: false },
    { name: 'Price: High to Low', sort: 'price',order: "desc", current: false },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

function ProductList() {
    const getParam = useParams();
    console.log("getParam,,,",getParam);
    const totalItems = 0;

    const filters = [
        {
          id: 'brand',
          name: 'Brands', 
          options: [],
        },
        {
          id: 'category',
          name: 'Category',
          options: [],
        },
      ]

    const [allMenuItems,setAllMenuItems] = useState([]);
    const [filter,setFilter] = useState({});
    const [sort,setSort] = useState({});
    const [page,setPage] = useState(1);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [isBusy, setBusy] = useState()

    const handleFilter = () =>{

    }

    const handleSort = () =>{

    }

    const handlePage = () =>{

    }

    const getMoreProduct = (e) =>{
        setPage(page + 12);
        const pageNum = page +12;
        axios.post(selectedProducts,{title:getParam.id,page:pageNum})
        .then((response)=> {
            setAllMenuItems(response.data.data.products);
            // setBusy(false);
        })
    }


    useEffect(()=>{
        setBusy(true);
        const pageNum = 12;
        setPage(pageNum);
        axios.post(selectedProducts,{title:getParam.id,page:pageNum})
        .then((response)=> {
            setAllMenuItems(response.data.data.products);
            setBusy(false);
        })
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
                    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Products</h1>

                        <div className="flex items-center">
                        <Menu as="div" className="relative inline-block text-left">
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
                        </Menu>

                        <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                            <span className="sr-only">View grid</span>
                            <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                        </button>
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
                            <ProductGrid products={allMenuItems}/> )}
                            <button onClick={(e)=>getMoreProduct(e)} type="button" className="loadMoreData text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">View More</button>
                        </div>               
                        </div>
                    </section>

                        <Pagination page={page} setPage={setPage} handlePage={handlePage} totalItems={totalItems}/>
                    </main>
                </div>
            </div>
            </FormContainer>
        </>
    );
}

function Pagination({page,setPage,handlePage,totalItems ,ITEM_PERPAGE = 10}) {
    const totalPages = Math.ceil(totalItems / ITEM_PERPAGE);
    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <div className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={(e)=>handlePage(page > 1 ? page-1 : page)} >
              Previous
            </div>
            <div className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={(e)=> handlePage(page < totalPages ? page+1 : page)}>
              Next
            </div>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(page-1)*ITEM_PERPAGE+1}</span> to <span className="font-medium">{page*ITEM_PERPAGE}</span> of{' '}
                <span className="font-medium">{totalItems}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <div onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                
                {Array.from({ length: totalPages }).map((el, index) => (
                  <div key={index} onClick={(e)=>handlePage(index+1)}
                    aria-current="page"
                    className={`relative cursor-pointer z-10 inline-flex items-center ${index+1 === page ? 'bg-indigo-600 text-white' : 'text-gray-400' } px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2
                            focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
                    {index + 1}
                  </div>
                ))
                }
                <div onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </div>
              </nav>
            </div>
          </div>
        </div>
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
  
  function ProductGrid(allMenuItems) {
    console.log("allMenuItems...",allMenuItems);
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            { allMenuItems && allMenuItems.products.length > 0 && allMenuItems.products.map((product,index) => (
                <Link to={`/product-detail/${product.id}`}>
                <div key={index} className="group relative border-solid border-2 p-2">
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
                    <p className="mt-1 text-sm text-gray-500">
                      <StarIcon className="w-6 h-6 inline"></StarIcon>
                      <span className="align-bottom">{product.rating}</span></p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">${Math.round(product.price*(1-product.discountPercentage/100))}</p>
                      <p className="text-sm font-medium line-through text-gray-900">${product.price}</p>
                    </div>
                </div>
                </div>
                </Link>
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