import Modal from "@/components/Modal";
import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
import { getProductById, getSimilarProducts } from "@/lib/actions";
import { formatNumber } from "@/lib/scraper/utils";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

// type Props = {
//   params: {
//     id: string;
//   };
// };
async function ProductDetail({params}: {params:{id:string}}){
  const {id}=params
  console.log(id)
  const product: Product = await getProductById(id);

  if (!product){ redirect("/"); 
    return;}

  const similarProducts = await getSimilarProducts(id);
  // console.log(product.description)
  return (
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image">
          <Image
            alt={product.title}
            src={product.image}
            width={580}
            height={400}
            className="mx-auto"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-secondary font-semibold">
                {product.title}
              </p>

              <Link
                href={product.url}
                target="_blank"
                className="text-base text-black opacity-50"
              >
                Visit Product
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="product-hearts">
                <Image
                  src="/assets/icons/red-heart.svg"
                  alt="red-heart"
                  width={20}
                  height={20}
                />
                <p className="text-base font-semibold text-[#D46F77]">
                  {product.reviewCount}
                </p>
              </div>
              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  src="/assets/icons/bookmark.svg"
                  alt="bookmark"
                  width={20}
                  height={20}
                />
              </div>
              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  src="/assets/icons/share.svg"
                  alt="share"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
          <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="text-[34px] text-secondary font-bold">
                {product.currency} {formatNumber(product.currentPrice)}
              </p>
              <p className="text-[21px] text-black opacity-50 line-through font-bold">
                {product.currency} {formatNumber(product.originalPrice)}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3 ">
                <div className="product-stars">
                  <Image
                    src="/assets/icons/star.svg"
                    alt="star"
                    width={20}
                    height={20}
                  />
                  <p className="text-sm text-primary-orange font-semibold">
                    {product.stars || "4"}
                  </p>
                </div>
                <div className="product-reviews">
                  <Image
                    src="/assets/icons/comment.svg"
                    alt="comment"
                    width={16}
                    height={16}
                  />
                  <p className="text-sm text-secondary font-semibold">
                    {product.reviewCount} Reviews
                  </p>
                </div>
              </div>
              {(product.positiveReview) && <p className="text-sm text-black opacity-50">
                <span className="text-primary-green font-semibold">
                  {product.positiveReview}%{" "}
                </span>
                of buyers have recommended this
              </p>}
            </div>
          </div>
          <div className="my-7 flex flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              <PriceInfoCard
                title="Current Price"
                value={`${product.currency} ${formatNumber(
                  product.currentPrice
                )}`}
                iconSrc="/assets/icons/price-tag.svg"
              />
              <PriceInfoCard
                title="Average Price"
                value={`${product.currency} ${formatNumber(
                  product.averagePrice
                )}`}
                iconSrc="/assets/icons/chart.svg"
              />
            </div>
            <div className="flex gap-5 flex-wrap">
              <PriceInfoCard
                title="Highest Price"
                value={`${product.currency} ${formatNumber(
                  product.highestPrice
                )}`}
                iconSrc="/assets/icons/arrow-up.svg"
              />
              <PriceInfoCard
                title="Lowest Price"
                value={`${product.currency} ${formatNumber(
                  product.lowestPrice
                )}`}
                iconSrc="/assets/icons/arrow-down.svg"
              />
            </div>
          </div>
          <Modal productId={id}/>
        </div>
      </div>

      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl tetx-secondary font-semibold">
            Product Description
          </h3>

          <div className="flex flex-col gap-4">
            {product?.description?.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>

        <button className="btn w-fit mx-auto flex items-center justify-center gap-3 min-w-[200px]">
          <Image src="/assets/icons/bag.svg" alt="bag" width={24} height={24} />
          <p>Buy Now</p>
        </button>
      </div>
      {similarProducts && similarProducts?.length > 0 && (
        <div className="py-14 flex flex-col gap-2 w-full">
          <p className="section-text">Similar Products</p>
          <div className="flex flex-wrap gap-10 mt-7 w-full">
            {similarProducts.map((product, i) => {
              return <ProductCard key={product._id} product={product} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
