import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { CalendarIcon, CloudUpload, Plus, Save } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


export default function InventoryAdd() {
    const [date, setDate] = React.useState<Date>();
    const [isDiscountActive, setIsDiscountActive] = React.useState(false);
    const [isExpiryDateActive, setIsExpiryDateActive] = React.useState(false);
    const [isSizeActive, setisSizeActive] = React.useState(false);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const sizes = ["Small", "Medium", "Large", "X-Large", "2X-Large", "3X-Large"];
    const [color, setColor] = useColor("rgb(86, 30, 203)");
    const [colors, setColors] = React.useState<string[]>([]);
    const [isColorSelected, setIsColorSelected] = React.useState(false);
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);
    const [image1, setImage1] = useState<string | ArrayBuffer | null>(null);
    const [image2, setImage2] = useState<string | ArrayBuffer | null>(null);
    const [image3, setImage3] = useState<string | ArrayBuffer | null>(null);
    const [image4, setImage4] = useState<string | ArrayBuffer | null>(null);


    const handleAddColor = () => {
        setColors((prevColors) => [...prevColors, color.hex]);
        setIsColorSelected(true);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, setImageFunc: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageFunc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSizeSelect = (size: string) => {
        if (selectedSizes.includes(size)) {
            setSelectedSizes((prev) => prev.filter((s) => s !== size));
        } else {
            setSelectedSizes((prev) => [...prev, size]);
        }
    };


    return (
        <>
            <div className="h-[100vh] items-center flex justify-center">
                <div className="h-[870px] flex gap-10">
                    <div className="p-7 w-[881px] h-full rounded-lg border flex gap-16 flex-row">
                        <div className="space-y-6 w-[375px]">
                            <Input className="mt-2" placeholder="Product Name" />
                            <Select>
                                <SelectTrigger className="h-10 text-muted-foreground">
                                    <SelectValue placeholder="Select Product Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="phone">phone ex</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <div className="flex gap-2 flex-row">
                                <Input type="number" placeholder="Selling Price" />
                                <Input type="number" placeholder="Cost Price" />
                            </div>
                            <Input type="number" placeholder="Quantity in Stock" />
                            <Select>
                                <SelectTrigger className="h-10 text-muted-foreground">
                                    <SelectValue placeholder="Order Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="phone">phone ex</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <div className="flex flex-row justify-between">
                                <h1 className="text-base text-muted-foreground">Discount</h1>
                                <div className="flex items-center justify-center">
                                    <Label className="mr-4 cursor-pointer" htmlFor="discount">Add Discount</Label>
                                    <Switch
                                        id="discount"
                                        checked={isDiscountActive}
                                        onCheckedChange={setIsDiscountActive}
                                    />
                                </div>
                            </div>
                            {isDiscountActive && (
                                <div className="flex flex-row gap-2">
                                    <Select>
                                        <SelectTrigger className="h-10 text-muted-foreground">
                                            <SelectValue placeholder="Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="phone">phone ex</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <Input type="number" placeholder="Value" />
                                </div>
                            )}
                            <div className="flex flex-row justify-between">
                                <h1 className="text-base text-muted-foreground">Expiry Date</h1>
                                <div className="flex items-center justify-center">
                                    <Label className="mr-4 cursor-pointer" htmlFor="expiry-date">Add Expiry Date</Label>
                                    <Switch
                                        id="expiry-date"
                                        checked={isExpiryDateActive}
                                        onCheckedChange={setIsExpiryDateActive}
                                    />
                                </div>
                            </div>
                            {isExpiryDateActive && (
                                <div>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full h-10 justify-start text-left font-normal",
                                                    !date && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            )}
                            <div>
                                <h1 className="text-muted-foreground">Color Item</h1>
                                <div className="mt-5">
                                    <Dialog>
                                        <DialogTrigger className="w-full">
                                            <Button variant="ghost" className="w-full">
                                                <Plus width={17} height={17} className="mr-2" />
                                                Add Color
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Set item color</DialogTitle>
                                            </DialogHeader>
                                            <ColorPicker color={color} onChange={setColor} />
                                            <DialogClose asChild>
                                                <Button onClick={handleAddColor} type="submit">
                                                    <Plus width={17} height={17} className="mr-2" />
                                                    Add Color
                                                </Button>
                                            </DialogClose>
                                        </DialogContent>
                                    </Dialog>
                                    <div className="grid grid-cols-9 flex-row gap-2 mt-2">
                                        {colors.map((addedColor, index) => (
                                            <div key={index} className="w-8 h-8 rounded-full border" style={{ backgroundColor: addedColor }}></div>
                                        ))}
                                        {!isColorSelected && (
                                            <div className="w-8 h-8 rounded-full border hidden"></div>
                                        )}
                                    </div>
                                    <div className="mt-5">
                                        <div className="flex flex-row justify-between">
                                            <h1 className="text-muted-foreground">Size</h1>
                                            <div className="items-center flex justify-center">
                                                <Label className="mr-4 cursor-pointer" htmlFor="size">Add Size</Label>
                                                <Switch
                                                    checked={isSizeActive}
                                                    onCheckedChange={setisSizeActive}
                                                    id="size" />
                                            </div>
                                        </div>
                                        {isSizeActive && (
                                            <div className="mt-4 grid grid-cols-4 gap-3">
                                                {sizes.map((size) => (
                                                    <Button
                                                        key={size}
                                                        onClick={() => handleSizeSelect(size)}
                                                        className={`rounded-full text-sm transition ${selectedSizes.includes(size)
                                                            ? "bg-primary text-white dark:text-black"
                                                            : "bg-[#F0F0F0] dark:bg-zinc-950 dark:border dark:text-white text-black"
                                                            }`}
                                                    >
                                                        {size}
                                                    </Button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6 w-[375px]">
                            <Textarea className="min-h-[163px] max-h-[163px]" placeholder="Short Description" />
                            <div>
                                <Label className="text-sm opacity-90" htmlFor="description">Product Long Description</Label>
                                <Textarea className="min-h-[163px] mt-2 rounded-lg max-h-[163px]" id="description" placeholder="Your text goes here" />
                                <p className="mt-1 text-sm text-muted-foreground">Add a long description for your product</p>
                            </div>
                            <div>
                                <h1 className="text-xs mb-2">Date Added</h1>
                                <div className="flex gap-2">
                                    <Input type="date" />
                                    <Input type="time" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-5 w-[450px] h-full rounded-lg border flex flex-col gap-3">
                        <div className="w-full border relative rounded-lg h-[320px] bg-accent dark:bg-zinc-900 flex flex-col justify-center items-center ">
                            {image && (
                                <img
                                    src={image as string}
                                    alt="Uploaded"
                                    className="w-full h-full bg-cover bg-center"
                                />
                            )}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <Input
                                    type="file"
                                    accept="image/jpeg, image/png"
                                    onChange={(e) => handleImageChange(e, setImage)}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <Label htmlFor="image-upload" className="cursor-pointer flex flex-row justify-center items-center">
                                    <CloudUpload color="#3b82f6" size={20} className="mr-2" />
                                    <h1 className="text-blue-500">Upload Image</h1>
                                </Label>
                            </div>
                        </div>
                        <h1>Additional Images</h1>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="border relative w-full h-44 rounded-lg flex justify-center items-center dark:bg-muted-foreground/10 bg-accent flex-col">
                                {image1 && (
                                    <img
                                        src={image1 as string}
                                        alt="Uploaded"
                                        className="w-full h-full bg-cover bg-center"
                                    />
                                )}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <Input
                                        type="file"
                                        accept="image/jpeg, image/png"
                                        onChange={(e) => handleImageChange(e, setImage1)}
                                        className="hidden"
                                        id="image2-upload"
                                    />
                                    <Label htmlFor="image2-upload" className="cursor-pointer flex flex-row justify-center items-center">
                                        <CloudUpload color="#3b82f6" size={20} className="mr-2" />
                                        <h1 className="text-blue-500">Upload Image</h1>
                                    </Label>
                                </div>
                            </div>
                            <div className="border relative w-full h-44 rounded-lg flex justify-center items-center dark:bg-muted-foreground/10 bg-accent flex-col">
                                {image2 && (
                                    <img
                                        src={image2 as string}
                                        alt="Uploaded"
                                        className="w-full h-full bg-cover bg-center"
                                    />
                                )}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <Input
                                        type="file"
                                        accept="image/jpeg, image/png"
                                        onChange={(e) => handleImageChange(e, setImage2)}
                                        className="hidden"
                                        id="image22-upload"
                                    />
                                    <Label htmlFor="image22-upload" className="cursor-pointer flex flex-row justify-center items-center">
                                        <CloudUpload color="#3b82f6" size={20} className="mr-2" />
                                        <h1 className="text-blue-500">Upload Image</h1>
                                    </Label>
                                </div>
                            </div>
                            <div className="border relative w-full h-44 rounded-lg flex justify-center items-center dark:bg-muted-foreground/10 bg-accent flex-col">
                                {image3 && (
                                    <img
                                        src={image3 as string}
                                        alt="Uploaded"
                                        className="w-full h-full bg-cover bg-center"
                                    />
                                )}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <Input
                                        type="file"
                                        accept="image/jpeg, image/png"
                                        onChange={(e) => handleImageChange(e, setImage3)}
                                        className="hidden"
                                        id="image3-upload"
                                    />
                                    <Label htmlFor="image3-upload" className="cursor-pointer flex flex-row justify-center items-center">
                                        <CloudUpload color="#3b82f6" size={20} className="mr-2" />
                                        <h1 className="text-blue-500">Upload Image</h1>
                                    </Label>
                                </div>
                            </div>
                            <div className="border relative w-full h-44 rounded-lg flex justify-center items-center dark:bg-muted-foreground/10 bg-accent flex-col">
                                {image4 && (
                                    <img
                                        src={image4 as string}
                                        alt="Uploaded"
                                        className="w-full h-full bg-cover bg-center"
                                    />
                                )}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <Input
                                        type="file"
                                        accept="image/jpeg, image/png"
                                        onChange={(e) => handleImageChange(e, setImage4)}
                                        className="hidden"
                                        id="image4-upload"
                                    />
                                    <Label htmlFor="image4-upload" className="cursor-pointer flex flex-row justify-center items-center">
                                        <CloudUpload color="#3b82f6" size={20} className="mr-2" />
                                        <h1 className="text-blue-500">Upload Image</h1>
                                    </Label>
                                </div>
                            </div>
                        </div>
                        <Button className="mt-9"><Save width={17} height={17} className="mr-2" /> Save & Publish</Button>
                    </div>
                </div>
            </div>
        </>
    );
}