import axios from "axios";
import * as cheerio from "cheerio"
import { extractCurrency, extractDescription, extractPrice } from "./utils";

export async function scrapeAmazonProduct(url:string){
    if(!url)
        return;

    //curl -i --proxy brd.superproxy.io:33335 --proxy-user brd-customer-hl_36b51c9c-zone-web_unlocker1:dud5nfk7u7pk -k "https://geo.brdtest.com/welcome.txt?product=unlocker&method=native"

    const username= String(process.env.BRIGHT_DATA_USERNAME)
    const password= String(process.env.BRIGHT_DATA_PASSWORD)
    const port= 33335;
    const session_id=(1000000 * Math.random()) | 0;
    
    const options={
        auth:{
            username:`${username}-session-${session_id}`,
            password,
        },
        host:'brd.superproxy.io',
        port,
        rejectUnauthorized:false
    }

    try {
        //fetch product page
        const response=await axios.get(url,options);
        const $=cheerio.load(response.data)
        const title=$('#productTitle').text().trim();

        const description=extractDescription($)
        const currentPrice=extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('a.size.base.a-color-price'),
            $('.a-button-selected .a-color-base')
        );
        const originalPrice=extractPrice(
            $('.basisPrice span.a-price span.a-offscreen' ),
            $('#priceblock_ourprice'),
            $('.a-price.a-text-price span.a-offscreen'),
            $('span.a-offscreen'),
            $('#listPrice'),
            $('#priceblock_dealprice'),
            $('.a-size-base.a-color-price')
        )
        const outOfStock= $('#availability span').text().trim().toLowerCase() === 'currently unavailable';

        const images=$('#imgBlkFront').attr('data-a-dynamic-image')||
        $('#landingImage').attr('data-a-dynamic-image')||
        '{}'

        const imageUrls=Object.keys(JSON.parse(images));

        const currency=extractCurrency($('.a-price-symbol'))

        const discountRate=$('.savingsPercentage').text().replace(/[-%]/g,'');

        const reviewText = $(
            '#acrCustomerReviewText'
        ).first().text().trim(); // Selects the first matching element
        
        const reviewCount = reviewText.replace(/\D+/g, ''); // Extract only numbers

        const stars=$('span.a-size-base','.a-popover-trigger').first().text().trim()

        console.log(stars)

        const positiveReviewsText=$('.brand-snapshot-flex-row p').text();
        const positiveReviews=positiveReviewsText.match(/(\d+)%/)
        const positiveReview=positiveReviews?positiveReviews[1]:null

        const category=$('#wayfinding-breadcrumbs_feature_div a.a-link-normal ').text().trim().split('\n')[0].trim()
        // console.log(positiveReviews)
        // console.log(reviewCount);

        //.replace(/\D+/g,'') console.log({title,currentPrice,originalPrice,outOfStock,imageUrls,currency,discountRate})
        
        //constrcu data boject with scraped information
        const scrapedData={
            url,
            currency:currency || '$',
            image:imageUrls[0],
            title,
            description,
            currentPrice:Number(currentPrice) || Number(originalPrice),
            originalPrice:Number(originalPrice) || Number(currentPrice),
            priceHistory:[],
            discountRate:Number(discountRate),
            category:category,
            reviewCount:Number(reviewCount),
            stars:isNaN(Number(stars))?0:Number(stars),
            positiveReview:Number(positiveReview),
            isOutOfStock:outOfStock,
            lowestPrice:Number(currentPrice) || Number(originalPrice),
            highestPrice:Number(originalPrice) || Number(currentPrice),
            averagePrice:Number(currentPrice) || Number(originalPrice)
        }
        console.log(scrapedData)
        return scrapedData
    } catch (error:any) {
        throw new Error(`Failed to scrape product: ${error.message}`)
    }
}