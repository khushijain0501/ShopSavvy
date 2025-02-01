"use client"


import { scrapeAndStoreProduct } from "@/lib/actions"
import { FormEvent, useState } from "react"

const Searchbar = () => {
  const [searchPrompt,setSearchPrompt]=useState("")
  const [isLoading,setIsLoading]=useState(false)
    
  const isValidAmazonProductUrl=(url:string)=>{
      // console.log(url)
      try{
        const parsedURL=new URL(url)
        // console.log(parsedURL)
        const hostname=parsedURL.hostname

        if(hostname.includes('amazon.com') 
          || hostname.endsWith('amazon') || 
        hostname.includes('amazon.'))
        return true;
      }catch(error){
        return false
      }
      return false;
    }
    const handleSubmit=async (event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    // console.log(searchPrompt)
    const isValidLink=isValidAmazonProductUrl(searchPrompt)
    if(!isValidLink)
    return alert("Please provide a valid Amazon link");
  try {
    setIsLoading(true);
    //scrape a product
    console.log(isLoading)
    const product=await scrapeAndStoreProduct(searchPrompt)
    console.log(product)
  } catch (error) {
    console.log(error)
  }
  finally{
    setIsLoading(false);
  }
    }
  return (
    <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
      <input type="text" 
      value={searchPrompt}
      onChange={(e)=>setSearchPrompt(e.target.value)}
      placeholder="Enter product link"
      className="searchbar-input"/>
      <button 
      type="submit" 
      disabled={searchPrompt === ''}
      className="searchbar-btn">{isLoading?"Searching...":"Search"}</button>
    </form>
  )
}

export default Searchbar
