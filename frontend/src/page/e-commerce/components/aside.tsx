import React, { useState } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SlidersHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Slider from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import clsx from "clsx";
import { Check } from "lucide-react";

const colors = [
    { color: "bg-red-800", checkedColor: "bg-red-900", textColor: "text-white" },
    { color: "bg-green-800", checkedColor: "bg-green-900", textColor: "text-white" },
    { color: "bg-yellow-400", checkedColor: "bg-yellow-500", textColor: "text-black" },
    { color: "bg-yellow-800", checkedColor: "bg-yellow-900", textColor: "text-white" },
    { color: "bg-cyan-400", checkedColor: "bg-cyan-500", textColor: "text-black" },
    { color: "bg-blue-800", checkedColor: "bg-blue-900", textColor: "text-white" },
    { color: "bg-purple-800", checkedColor: "bg-purple-900", textColor: "text-white" },
    { color: "bg-pink-800", checkedColor: "bg-pink-900", textColor: "text-white" },
    { color: "bg-white", checkedColor: "bg-gray-200", textColor: "text-black" },
    { color: "bg-black", checkedColor: "bg-zinc-900", textColor: "text-white" },
];

interface FilterCheckboxProps {
    id: string;
    label: string;
}

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({ id, label }) => (
    <div className="items-center flex gap-2">
        <Checkbox className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" id={id} />
        <label htmlFor={id} className="cursor-pointer text-sm">{label}</label>
    </div>
);

export default function Aside() {
    const [priceRange, setPriceRange] = useState<number[]>([20, 80]);
    const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);

    const sizes = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large"];

    const handleSliderChange = (_event: Event, newValue: number | number[]) => {
        setPriceRange(newValue as number[]);
        setTooltipOpen(true);
    };

    const toggleSize = (size: string) => {
        setSelectedSizes((prevSizes) =>
            prevSizes.includes(size)
                ? prevSizes.filter((s) => s !== size)
                : [...prevSizes, size]
        );
    };

    const toggleColor = (color: string) => {
        setSelectedColors((prevColors) =>
            prevColors.includes(color)
                ? prevColors.filter((c) => c !== color)
                : [...prevColors, color]
        );
    };

    return (
        <div className="bg-background flex flex-col items-center w-[390px] pt-36 h-full fixed">
            <ScrollArea>
                <div>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/shop">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Casual</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="w-[295px] mt-7 space-y-6 border rounded-xl px-6 py-5">
                        <div className="flex justify-between items-center">
                            <h1 className="font-semibold">Filters</h1>
                            <SlidersHorizontal className="w-4 h-4 opacity-40" />
                        </div>
                        <Separator />
                        <div className="flex flex-col gap-2">
                            <FilterCheckbox id="shirts" label="T-shirts" />
                            <FilterCheckbox id="shorts" label="Shorts" />
                            <FilterCheckbox id="shirts2" label="Shirts" />
                            <FilterCheckbox id="hoodie" label="Hoodie" />
                            <FilterCheckbox id="jeans" label="Jeans" />
                        </div>
                        <Separator />
                        <div>
                            <Accordion type="single" collapsible>
                                <AccordionItem value="price">
                                    <AccordionTrigger className="font-semibold">Price</AccordionTrigger>
                                    <AccordionContent>
                                        <Tooltip
                                            open={tooltipOpen}
                                            onClose={() => setTooltipOpen(false)}
                                            onOpen={() => setTooltipOpen(true)}
                                            title={`$${priceRange[0]} - $${priceRange[1]}`}
                                            placement="top"
                                        >
                                            <Slider
                                                value={priceRange}
                                                onChange={handleSliderChange}
                                                valueLabelDisplay="auto"
                                                min={0}
                                                max={200}
                                                sx={{
                                                    color: "hsl(var(--primary))",
                                                    "& .MuiSlider-thumb": {
                                                        backgroundColor: "hsl(var(--secondary))",
                                                    },
                                                    "& .MuiSlider-track": {
                                                        backgroundColor: "hsl(var(--primary-light))",
                                                    },
                                                }}
                                            />
                                        </Tooltip>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                        <div>
                            <Accordion type="single" collapsible>
                                <AccordionItem value="colors">
                                    <AccordionTrigger className="font-semibold">Colors</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="grid grid-cols-5 gap-2">
                                            {colors.map((color, index) => (
                                                <div
                                                    key={index}
                                                    className={clsx(
                                                        "rounded-full w-8 h-8 border-2 cursor-pointer flex items-center justify-center",
                                                        selectedColors.includes(color.color)
                                                            ? `${color.checkedColor} ${color.textColor}`
                                                            : color.color
                                                    )}
                                                    onClick={() => toggleColor(color.color)}
                                                >
                                                    {selectedColors.includes(color.color) && (
                                                        <Check className="w-4 h-4" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                        <div>
                            <Accordion type="single" collapsible>
                                <AccordionItem value="sizes">
                                    <AccordionTrigger className="font-semibold">Size</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="grid grid-cols-2 gap-2">
                                            {sizes.map((size) => (
                                                <Button
                                                    key={size}
                                                    onClick={() => toggleSize(size)}
                                                    className={`rounded-full ${selectedSizes.includes(size)
                                                        ? "bg-primary text-background"
                                                        : "bg-zinc-400 text-black"
                                                        }`}
                                                >
                                                    {size}
                                                </Button>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                        <div>
                            <Accordion type="single" collapsible>
                                <AccordionItem value="category">
                                    <AccordionTrigger className="font-semibold">Dress Style</AccordionTrigger>
                                    <AccordionContent className="flex flex-col gap-2">
                                        <FilterCheckbox id="casual" label="Casual" />
                                        <FilterCheckbox id="formal" label="Formal" />
                                        <FilterCheckbox id="party" label="Party" />
                                        <FilterCheckbox id="gym" label="Gym" />
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                        <div>
                            <Button className="w-full h-10 rounded-lg font-[600]" onClick={() =>
                                toast("Filter applied successfully", {
                                    description: "All items in the store are filtered according to your wishes.",
                                    action: {
                                        label: "Undo",
                                        onClick: () => console.log("Undo"),
                                    },
                                })
                            }>Apply Filter</Button>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}