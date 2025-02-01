import HeroCarousal from '@/components/HeroCarousal'
import ProductCard from '@/components/ProductCard'
import Searchbar from '@/components/Searchbar'
import { getAllProducts } from '@/lib/actions'
import Image from 'next/image'
import React from 'react'

const Home = async () => {
  const allProducts=await getAllProducts();
  return (
    <>
      <section className='px-6 md:px-20 py-24 lg:flex lg:gap-14'>  
        <div className='flex max-xl:flex-col justify-center'>
        <div className="flex flex-col justify-center"> 
          <p className='small-text'>
            Smart shopping starts here: 
            <Image src="assets/icons/arrow-right.svg" width={15} height={15} alt="right-arrow"/>
          </p>
          <h1 className='head-text'>
            Unleash the Power of <br/>
            <span className='text-primary'>ShopSavvy</span>
          </h1>
          <p className='mt-6'>
          Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.
          </p>
          <Searchbar/>
        </div>
        <HeroCarousal/>
        </div>
      </section>
      <section className='trending-section'>
        <h2 className='section-text'>
          Trending
        </h2>
        <div className='flex flex-wrap gap-x-8 gap-y-16'>
          {allProducts?.map
          ((product) => (
            (
              <ProductCard key={product._id} product={product}/>
            )
          ))}
        </div>
      </section>
    </>
  )
}

export default Home
