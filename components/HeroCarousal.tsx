"use client"

import React from 'react'
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import Image from 'next/image';

const HeroCarousal = () => {
    const images=[{src:"/assets/images/hero-1.svg",alt:"hero1"},{src:"/assets/images/hero-2.svg",alt:"hero2"},{src:"/assets/images/hero-3.svg",alt:"hero3"},{src:"/assets/images/hero-4.svg",alt:"hero4"},{src:"/assets/images/hero-5.svg",alt:"hero5"}]
  return (
    <div className='hero-carousel mt-10'>
      <Carousel
        showThumbs={false}
        // autoPlay
        infiniteLoop
        // interval={2000}
        showArrows={false}
        showStatus={false}
        >
        {images.map((img,i)=>(
         <Image src={img.src} alt={img.alt} width={480} height={484} className='object-contain' key={img.alt}/>
        )
        )
        }
      </Carousel>
      <Image 
      src="/assets/icons/hand-drawn-arrow.svg" 
      alt="hand-drawn-arrow" 
      width={175} 
      height={175}
      className='max-lg:hidden absolute -left-[15%] bottom-0 z-0'/>
    </div>
  )
}

export default HeroCarousal
