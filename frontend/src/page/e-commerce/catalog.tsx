import { Rating } from "@mui/material";
import Aside from "./components/aside";
import Header from "./components/header";
import Blusa from "./img/blusa.png"
import { Badge } from "@/components/ui/badge";

const cardsData = [
    {
        id: 1,
        imgSrc: Blusa,
        title: "T-shirt with Tape Details",
        rating: 4.5,
        price: "$120",
        originalPrice: "$260",
        discount: 60,
    },
    {
        id: 2,
        imgSrc: Blusa,
        title: "Casual Shirt",
        rating: 4,
        price: "$90",
        discount: 0,
    },
    {
        id: 3,
        imgSrc: Blusa,
        title: "T-shirt with Tape Details",
        rating: 4.5,
        price: "$120",
        originalPrice: "$260",
        discount: 20,
    },
    {
        id: 4,
        imgSrc: Blusa,
        title: "Casual Shirt",
        rating: 4,
        price: "$90",
        discount: 0,
    },
    {
        id: 5,
        imgSrc: Blusa,
        title: "Casual Shirt",
        rating: 4,
        price: "$90",
        discount: 0,
    },
    {
        id: 6,
        imgSrc: Blusa,
        title: "Casual Shirt",
        rating: 4,
        price: "$90",
        discount: 0,
    },
    {
        id: 7,
        imgSrc: Blusa,
        title: "Casual Shirt",
        rating: 4,
        price: "$90",
        discount: 0,
    },
    {
        id: 8,
        imgSrc: Blusa,
        title: "Casual Shirt",
        rating: 4,
        price: "$90",
        discount: 0,
    },
    {
        id: 9,
        imgSrc: Blusa,
        title: "Casual Shirt",
        rating: 4,
        price: "$90",
        discount: 0,
    },
];

export default function Catalog() {
    return (
        <div className="w-full h-full">
            <Header />
            <Aside />
            <div className="pt-36 pl-[390px] w-full h-full bg-background">
                <div>
                    <h1 className="text-3xl font-semibold">Casual</h1>
                </div>
                <div className="mt-14 grid grid-cols-4 gap-10">
                    {cardsData.map((card) => (
                        <div key={card.id} className="cursor-pointer">
                            <div className="bg-[#F2F0F1] flex rounded-xl justify-center items-center w-[295px] h-[298px]">
                                <img src={card.imgSrc} alt={card.title} />
                            </div>
                            <div className="mt-4 space-y-1">
                                <h2 className="text-lg font-bold">{card.title}</h2>
                                <div className="flex items-center">
                                    <Rating name="half-rating-read" defaultValue={card.rating} precision={0.5} readOnly />
                                    <h5 className="text-sm font-medium">{card.rating}/5</h5>
                                </div>
                                <div className="flex items-center">
                                    <h1 className="text-2xl font-bold">{card.price}</h1>
                                    {card.discount > 0 && (
                                        <div className="flex items-center">
                                            <h2 className="ml-2 line-through">{card.originalPrice}</h2>
                                            <Badge className="rounded-full ml-2 bg-[#ff33331f] text-[#FF3333] hover:bg-[#ff33331f]">-{card.discount}%</Badge>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}