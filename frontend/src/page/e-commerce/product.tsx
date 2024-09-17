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

export default function Product() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string>(Blusa);
  const [quantity, setQuantity] = useState<number>(1);

  const colors = ["black", "white", "red", "green"];
  const sizes = ["Small", "Medium", "Large", "X-Large"];
  const images = [Blusa, Blusa2, Blusa];

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
      return newQuantity < 1 ? 1 : newQuantity; // Impede número negativo
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
    // Aqui você pode enviar os dados para a API ou fazer outra ação
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
                        : "bg-[#F0F0F0] dark:bg-[#f0f0f0a2] text-black"
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
                      className="w-32 h-12 pl-6 text-center rounded-full bg-[#F0F0F0]"
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
        <div>
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">Make changes to your account here.</TabsContent>
            <TabsContent value="password">Change your password here.</TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}