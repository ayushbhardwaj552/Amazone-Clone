"use client";

import React, { useMemo, useState } from "react";
import Ratings from "./Ratings";
import {
  addProductReview,
  getAverageRating,
  getReviewsForProduct,
  ProductReview,
} from "@/lib/productReviews";
import { FaStar } from "react-icons/fa";

type ProductReviewsProps = {
  productId: number;
  productTitle: string;
  baseRating?: { rate: number; count: number };
};

const ProductReviews = ({
  productId,
  productTitle,
  baseRating,
}: ProductReviewsProps) => {
  const [reviews, setReviews] = useState<ProductReview[]>(() =>
    getReviewsForProduct(productId),
  );
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const avgRating = useMemo(() => getAverageRating(reviews), [reviews]);
  const displayRating = useMemo(
    () => ({
      rate: avgRating || baseRating?.rate || 4.2,
      count: reviews.length + (baseRating?.count || 0),
    }),
    [avgRating, baseRating, reviews.length],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !title.trim() || !body.trim()) return;

    const newReview = addProductReview({
      productId,
      author: author.trim(),
      title: title.trim(),
      body: body.trim(),
      rating,
    });

    setReviews((prev) => [newReview, ...prev]);
    setAuthor("");
    setTitle("");
    setBody("");
    setRating(5);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => Math.round(r.rating) === star).length;
    const pct = reviews.length ? (count / reviews.length) * 100 : 0;
    return { star, pct };
  });

  const inputClass =
    "w-full rounded-[3px] border border-[#888C8C] bg-white px-3 py-[7px] text-sm text-[#0F1111] outline-none placeholder:text-[#6F7373] focus:border-[#e77600] focus:shadow-[0_0_0_3px_rgba(228,121,17,0.5)] transition-shadow";

  return (
    <section className="mt-6 rounded-[4px] border border-[#D5D9D9] bg-white shadow-[0_2px_5px_rgba(15,17,17,.15)]">
      {/* Header */}
      <div className="border-b border-[#D5D9D9] px-6 py-4">
        <h2 className="text-[18px] font-bold text-[#0F1111]">Customer reviews</h2>
        <p className="mt-0.5 text-[13px] text-[#565959] line-clamp-1">{productTitle}</p>
      </div>

      <div className="p-6">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left — Summary */}
          <div className="lg:w-[260px] shrink-0">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[42px] font-medium text-[#0F1111] leading-none">
                {displayRating.rate.toFixed(1)}
              </span>
              <div>
                <Ratings rating={{ rate: displayRating.rate, count: 0 }} />
                <p className="mt-1 text-[13px] text-[#007185] hover:text-[#C7511F] cursor-pointer hover:underline">
                  {displayRating.count.toLocaleString("en-IN")} global ratings
                </p>
              </div>
            </div>

            <div className="space-y-[5px]">
              {ratingBreakdown.map(({ star, pct }) => (
                <div key={star} className="flex items-center gap-2 text-[13px] group cursor-pointer">
                  <span className="w-10 text-[#007185] group-hover:text-[#C7511F] group-hover:underline whitespace-nowrap">
                    {star} star
                  </span>
                  <div className="h-[18px] flex-1 overflow-hidden rounded-[2px] bg-[#E7E7E7]">
                    <div
                      className="h-full bg-[#de7921] rounded-[2px] transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-[#007185] group-hover:text-[#C7511F]">
                    {Math.round(pct)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px bg-[#D5D9D9] self-stretch" />

          {/* Right — Write a review */}
          <div className="flex-1 min-w-0">
            <h3 className="text-[16px] font-bold text-[#0F1111] mb-1">
              Review this product
            </h3>
            <p className="text-[13px] text-[#565959] mb-4">
              Share your thoughts with other customers
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Star picker */}
              <div>
                <label className="block text-[13px] font-medium text-[#0F1111] mb-1.5">
                  Overall rating
                </label>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-[22px] transition-transform hover:scale-110 focus:outline-none"
                    >
                      <FaStar
                        className={
                          star <= (hoverRating || rating)
                            ? "text-[#de7921]"
                            : "text-[#D5D9D9]"
                        }
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-[13px] text-[#565959]">
                    {hoverRating || rating} out of 5
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#0F1111] mb-1">
                  Your name
                </label>
                <input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Ravi K."
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#0F1111] mb-1">
                  Review headline
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What's most important to know?"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#0F1111] mb-1">
                  Written review
                </label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="What did you like or dislike? What did you use this product for?"
                  rows={4}
                  className={inputClass + " resize-none leading-relaxed"}
                  required
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-[20px] border border-[#D5D9D9] bg-gradient-to-b from-[#FFE814] to-[#F0C14B] px-5 py-[7px] text-[13px] font-normal text-[#0F1111] shadow-[0_1px_0_rgba(255,255,255,.4)_inset,0_-1px_0_rgba(0,0,0,.1)_inset] hover:bg-gradient-to-b hover:from-[#F7D000] hover:to-[#e8b900] active:shadow-inner transition-all"
              >
                Submit review
              </button>

              {submitted && (
                <div className="flex items-center gap-2 rounded-[4px] border border-[#007600] bg-[#EAF5E9] px-3 py-2 text-[13px] text-[#007600]">
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 1a7 7 0 110 14A7 7 0 018 1zm3.354 4.646a.5.5 0 00-.708 0L7 9.293 5.354 7.646a.5.5 0 10-.708.708l2 2a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" />
                  </svg>
                  Thank you! Your review has been posted.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Reviews list */}
        {reviews.length > 0 && (
          <div className="mt-8 border-t border-[#D5D9D9] divide-y divide-[#E7E7E7]">
            {reviews.map((review) => (
              <article key={review.id} className="py-5">
                {/* Reviewer name */}
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-8 w-8 rounded-full bg-[#E7E7E7] flex items-center justify-center text-[13px] font-bold text-[#565959] uppercase shrink-0">
                    {review.author.charAt(0)}
                  </div>
                  <span className="text-[13px] font-bold text-[#0F1111]">{review.author}</span>
                </div>

                <div className="ml-10">
                  <div className="flex items-center gap-2 mb-0.5">
                    <Ratings rating={{ rate: review.rating, count: 0 }} />
                    <span className="text-[14px] font-bold text-[#0F1111] leading-snug">
                      {review.title}
                    </span>
                  </div>

                  <p className="text-[12px] text-[#565959] mb-2">
                    Reviewed on{" "}
                    {new Date(review.createdAt).toLocaleDateString("en-IN", {
                      dateStyle: "medium",
                    })}
                    {review.verified && (
                      <span className="ml-2 text-[#C45500] font-medium">
                        ✓ Verified Purchase
                      </span>
                    )}
                  </p>

                  <p className="text-[14px] leading-[1.6] text-[#0F1111]">
                    {review.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductReviews;
