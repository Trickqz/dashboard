import Header from "@/components/header";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function InventoryAdd() {
    return (
        <>
            <Header />
            <div>
                <div className="p-7 border flex gap-16 flex-row">
                    <div className="space-y-6">
                        <Input placeholder="Product Name" />
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Product Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Fruits</SelectLabel>
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
                            <SelectTrigger>
                                <SelectValue placeholder="Order Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Fruits</SelectLabel>
                                    <SelectItem value="phone">phone ex</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <div className="flex flex-row justify-between">
                            <h1>Discount</h1>
                            <div className="flex items-center justify-center">
                                <label htmlFor="discount">Add Discount</label>
                                <Checkbox id="discount" />
                            </div>
                        </div>
                        <div className="flex flex-row justify-between">
                            <h1>Expiry Date</h1>
                            <div className="flex items-center justify-center">
                                <Label htmlFor="expiry-date">Add Expiry Date</Label>
                                <Checkbox id="expiry-date" />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6 w-[375px]">
                        <Textarea className="min-h-[163px] max-h-[163px]" placeholder="Short Description" />
                        <div>
                            <Label className="text-sm opacity-90" htmlFor="description">Product Long Description</Label>
                            <Textarea className="min-h-[163px] mt-2 rounded-lg max-h-[163px]" id="description" placeholder="Short Description" />
                            <p className="mt-1 text-sm text-muted-foreground">Add a long description for your product</p>
                        </div>
                        <div className="flex flex-row justify-between">
                            <h1 className="text-base font-semibold">Return Policy</h1>
                            <div className="flex items-center justify-center">
                                <Label htmlFor="return-policy">Add Discount</Label>
                                <Checkbox id="return-policy" />
                            </div>
                        </div>
                        <div>
                            <h1>Date Addred</h1>
                            <div className="flex gap-2">
                                <Input type="date" />
                                <Input type="time" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}