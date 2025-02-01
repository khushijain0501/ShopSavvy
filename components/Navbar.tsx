import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    const navIcons=[
        {src:'/assets/icons/search.svg',alt:'search'},
        {src:'/assets/icons/black-heart.svg',alt:'black-heart'},
        {src:'/assets/icons/user.svg',alt:'user'},
    ]
  return (
    <header className='w-full '>
        <nav className='nav '>
            <Link href="/" className='flex items-center gap-1'>
                <Image 
                src="/assets/icons/logo.svg" 
                width={27}
                height={27}
                alt="logo"
                />
            </Link>
            <p className='nav-logo'>
                    Shop<span className='text-primary'>Savvy</span>
                </p>
                <div className='flex justify-end items-center w-full gap-5'>
                    {navIcons.map((icon)=>{
                        // console.log(icon.src)
                        return(
                            <Image key={icon.src} src={icon.src} alt={icon.alt} width={27} height={27} className='object-contain'/>
                        )
                    })}
                </div>
        </nav>
    </header>
  )
}

export default Navbar
