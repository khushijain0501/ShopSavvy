import Image from 'next/image'
import React from 'react'

interface Props{
    title: string,
    value:string,
    iconSrc:string
}

const PriceInfoCard = ({title,value,iconSrc}:Props) => {
  return (
    <div className='price-info_card'>
      <p className='text-base text-black-100'>{title}</p>
      <div className='flex gap-1'>
        <Image src={iconSrc} alt="icon" width={24} height={24}/>
        <p className='font-bold text-2xl text-secondary'>{value}</p>
      </div>
    </div>
  )
}

export default PriceInfoCard
