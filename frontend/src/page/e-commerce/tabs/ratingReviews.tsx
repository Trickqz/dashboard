import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Rating from "@mui/material/Rating";

const reviews = [
    {
        id: 1,
        name: "Samantha D.",
        rating: 4,
        date: "August 14, 2024",
        text: "This graphic t-shirt is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style."
    },
    {
        id: 2,
        name: "John S.",
        rating: 5,
        date: "July 20, 2024",
        text: "Great quality t-shirt, fits perfectly! Will definitely buy again."
    },
    {
        id: 3,
        name: "Anna K.",
        rating: 4,
        date: "June 15, 2024",
        text: "Comfortable and stylish, great for casual wear. Love the fabric!"
    },
    {
        id: 4,
        name: "Michael B.",
        rating: 3,
        date: "May 10, 2024",
        text: "Decent shirt but the size was slightly off for me. Fabric quality is good."
    },
    {
        id: 5,
        name: "Emily R.",
        rating: 5,
        date: "April 5, 2024",
        text: "Absolutely love this shirt! It's soft, fits well, and looks amazing."
    },
    {
        id: 6,
        name: "David G.",
        rating: 4,
        date: "March 22, 2024",
        text: "Nice shirt, but the color faded slightly after washing. Still happy with it."
    },
    {
        id: 7,
        name: "Jessica M.",
        rating: 5,
        date: "February 18, 2024",
        text: "One of the best t-shirts I’ve owned. Perfect fit and feels great on the skin."
    },
    {
        id: 8,
        name: "Chris T.",
        rating: 3,
        date: "January 30, 2024",
        text: "Shirt is good, but it shrunk a bit after the first wash. Would recommend sizing up."
    },
    {
        id: 9,
        name: "Sophia L.",
        rating: 4,
        date: "December 25, 2023",
        text: "Good quality fabric and a comfortable fit. Happy with the purchase."
    },
    {
        id: 10,
        name: "Alex P.",
        rating: 5,
        date: "November 12, 2023",
        text: "Great shirt, true to size, and very comfortable. The material feels premium."
    }
];

export default function RatingReviews() {
    const [visibleReviews, setVisibleReviews] = useState(6);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleShowMore = () => {
        setVisibleReviews((prev) => prev + 4);
    };

    return (
        <div className="mt-6">
            <div className="flex flex-row items-center">
                <h1 className="text-2xl font-bold">All Reviews</h1>
                <p className="text-base opacity-55 ml-2">({reviews.length})</p>
            </div>
            <div className="grid grid-cols-2 mt-6 gap-5">
                {loading
                    ? [...Array(6)].map((_, index) => (
                        <Skeleton key={index} className="w-[796px] h-[237px] rounded-lg" />
                    ))
                    : reviews.slice(0, visibleReviews).map((review) => (
                        <div key={review.id} className="px-8 py-7 border rounded-xl">
                            <Rating value={review.rating} readOnly />
                            <h1 className="text-xl font-bold mt-3">{review.name}</h1>
                            <p className="w-[730px] text-base opacity-60 mt-3">{review.text}</p>
                            <p className="mt-6 text-base opacity-60 font-semibold">Posted on {review.date}</p>
                        </div>
                    ))}
            </div>
            {visibleReviews < reviews.length && !loading && (
                <div className="flex justify-center mt-8">
                    <Button className="rounded-full w-[230px] h-[52px]" variant="outline" onClick={handleShowMore}>
                        Load More Reviews
                    </Button>
                </div>
            )}
        </div>
    );
}