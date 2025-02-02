"use server"

// import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { Revalidate } from "next/dist/server/lib/revalidate";
import { scrapeAmazonProduct } from "../scraper";
import {  PriceHistoryItem,User} from "@/types";
import Product from "../models/product.model";
import { revalidatePath } from "next/cache";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../scraper/utils";
import { generateEmailBody, sendEmail } from "../nodemailer";

// export const maxDuration=60;

export async function scrapeAndStoreProduct(productUrl:string){
    if(!productUrl)
        return;
    try {
        await connectToDB();
        const scrapedProduct=await scrapeAmazonProduct(productUrl);

        if(!scrapedProduct)
            return;
        let product=scrapedProduct

        const existingProduct=await Product.findOne({url:scrapedProduct.url})
        if(existingProduct){
            const updatedPriceHistory:any=[
                ...existingProduct.priceHistory,
                {price:scrapedProduct.currentPrice}
            ]
        
        product={
            ...scrapedProduct,
            priceHistory:updatedPriceHistory,
            lowestPrice:getLowestPrice(updatedPriceHistory),
            highestPrice:getHighestPrice(updatedPriceHistory),
            averagePrice:getAveragePrice(updatedPriceHistory)
        }
    }
    const newProduct=await Product.findOneAndUpdate({
        url:scrapedProduct.url},
        product,
        {upsert:true, new:true}
    )
    revalidatePath(`/products/${newProduct._id}`);
    } catch (error:any) {
        throw new Error(`Failed to create/update product: ${error.message}`)
    }
}

export async function getProductById(productId:string){
    try{
        connectToDB();
        const product=await Product.findOne({ _id:productId});
        if(!product) return null;

        return product
    }
    catch(Error){
        console.log('Error fetching product')
    }
}

export async function getAllProducts() {
    try {
        connectToDB();
        const products = await Product.find();
        // console.log(products)
        return products;
    } catch (error) {
        console.log(error);
    }
}

export async function getSimilarProducts(productId:string) {
    try {
        connectToDB();
        const currentProduct = await Product.findById(productId);
        if(!currentProduct) return null;

        const similarProducts=await Product.find({_id:{$ne:productId}}).limit(3);
        // console.log(products)
        return similarProducts;
    } catch (error) {
        console.log(error);
    }
}

export async function addUserEmailToProduct(productId:string,userEmail:string) {
    try {
        const product=await Product.findById(productId);
        if(!product) return;

        const userExists=product.users.some((user:User)=>user.email === userEmail);
        console.log(userExists)
        if(!userExists){
            product.users.push({email:userEmail});
            await product.save();

            const emailContent=await generateEmailBody(product,"WELCOME");
            console.log(emailContent)
            await sendEmail(emailContent,[userEmail])
        }
    } catch (error) {
        console.log(error)
    }
}
