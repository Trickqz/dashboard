import Header from "./components/header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Blusa from "./img/blusa.png";
import Blusa2 from "./img/short.png";
import { Rating } from "@mui/material";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import RatingReviews from "./tabs/ratingReviews";
import Footer from "./components/footer";
import Faqs from "./tabs/faqs";

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
];

export default function Product() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string>(Blusa);
  const [quantity, setQuantity] = useState<number>(1);

  const colors = ["black", "white", "red", "green"];
  const sizes = ["Small", "Medium", "Large", "X-Large"];
  const images = [Blusa, Blusa2, Blusa];
  const classTabs = "text-xl w-full border-b data-[state=active]:border-b-black data-[state=active]:dark:border-b-white rounded-none data-[state=active]:bg-transparent shadow-none data-[state=active]:shadow-none";

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    switch (color) {
      case "red":
        setMainImage(Blusa2);
        break;
      case "green":
        setMainImage(Blusa);
        break;
      default:
        setMainImage(Blusa);
        break;
    }
  };

  const handleImageClick = (img: string) => {
    setMainImage(img);
  };

  const handleQuantityChange = (increment: boolean) => {
    setQuantity((prevQuantity) => {
      const newQuantity = increment ? prevQuantity + 1 : prevQuantity - 1;
      return newQuantity < 1 ? 1 : newQuantity;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      title: "One Life Graphic T-shirt",
      price: 260,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
    };

    console.log("Form Data:", formData);
  };

  return (
    <>
      <Header />
      <div className="pt-32 pl-[100px] pr-[100px] w-full h-full bg-background">
        <div>
          <div>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/men">Men</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbPage>T-shirts</BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="mt-9 flex flex-row">
            <div className="space-y-5">
              {images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => handleImageClick(img)}
                  className="w-[155px] h-[170px] rounded-xl flex justify-center items-center bg-[#F2F0F1] cursor-pointer"
                >
                  <img className="h-[130px]" src={img} alt={`blusa ${index + 1}`} />
                </div>
              ))}
            </div>
            <div className="w-[444px] min-h-[550px] flex justify-center items-center ml-4 rounded-xl bg-[#F2F0F1]">
              <img className="h-[400px]" src={mainImage} alt="Main product" />
            </div>
            <div className="ml-10 w-[740px]">
              <h1 className="font-extrabold text-5xl uppercase">One Life Graphic T-shirt</h1>
              <div className="flex flex-row items-center mt-4">
                <Rating name="half-rating-read" defaultValue={4.0} precision={0.5} readOnly />
                <h1 className="ml-1">4/5</h1>
              </div>
              <div className="mt-4 flex items-center space-x-3">
                <h1 className="font-bold tracking-wide text-3xl">$260</h1>
                <h1 className="font-bold tracking-wide text-2xl opacity-30 line-through">$300</h1>
                <Badge className="rounded-full text-sm ml-2 bg-[#ff33331f] text-[#FF3333] hover:bg-[#ff33331f]">
                  -20%
                </Badge>
              </div>
              <div className="mt-5">
                <p className="text-base opacity-60">
                  This graphic t-shirt which is perfect for any occasion. Crafted from a soft and
                  breathable fabric, it offers superior comfort and style.
                </p>
              </div>
              <Separator className="mt-6 mb-6" />
              <form onSubmit={handleSubmit}>
                <h1 className="opacity-60">Select Colors</h1>
                <div className="flex gap-3 mt-4">
                  {colors.map((color) => (
                    <div
                      key={color}
                      onClick={() => handleColorClick(color)}
                      className={`w-8 h-8 rounded-full cursor-pointer border ${selectedColor === color
                        ? "border-black scale-110"
                        : "border-gray-300"
                        } flex items-center justify-center`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <Separator className="mt-6 mb-6" />
                <h1 className="opacity-60">Choose Size</h1>
                <div className="mt-4 flex gap-3">
                  {sizes.map((size) => (
                    <div
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`p-2 px-5 rounded-full cursor-pointer text-base transition ${selectedSize === size
                        ? "bg-primary text-white dark:text-black"
                        : "bg-[#F0F0F0] dark:bg-zinc-950 dark:border dark:text-white text-black"
                        }`}
                    >
                      {size}
                    </div>
                  ))}
                </div>
                <Separator className="mt-6 mb-6" />
                <div className="flex flex-row items-center gap-2">
                  <div className="flex justify-center rounded-full relative items-center">
                    <Input
                      className="w-32 h-12 pl-6 text-center rounded-full bg-[#F0F0F0] dark:bg-zinc-950"
                      type="number"
                      value={quantity}
                      readOnly
                    />
                    <Minus
                      width={17}
                      height={17}
                      onClick={() => handleQuantityChange(false)}
                      className="left-3 absolute cursor-pointer"
                    />
                    <Plus
                      width={17}
                      height={17}
                      onClick={() => handleQuantityChange(true)}
                      className="absolute right-3 cursor-pointer"
                    />
                  </div>
                  <Button
                    className="w-full h-12 rounded-full"
                    disabled={!selectedColor || !selectedSize}
                    type="submit"
                  >
                    Add To Cart
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Tabs defaultValue="rating" className="mt-20">
          <TabsList className="w-full bg-transparent">
            <TabsTrigger className={classTabs} value="rating">Rating & Reviews</TabsTrigger>
            <TabsTrigger className={classTabs} value="faqs">FAQs</TabsTrigger>
          </TabsList>
          <TabsContent className="flex justify-center" value="rating">
            <RatingReviews />
          </TabsContent>
          <TabsContent value="faqs">
            <Faqs />
          </TabsContent>
        </Tabs>
        <h1 className="font-extrabold text-5xl uppercase mt-16">You might also like</h1>
        <div className="mt-14 grid grid-cols-5">
          {cardsData.map((card) => (
            <div key={card.id} className="cursor-pointer">
              <div className="bg-[#F2F0F1] flex rounded-xl justify-center items-center w-[315px] h-[300px]">
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
      <div className="mt-40">
        <Footer />
      </div>
    </>
  );
}